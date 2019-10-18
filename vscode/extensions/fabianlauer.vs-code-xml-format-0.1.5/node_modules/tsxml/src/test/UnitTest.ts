import {AssertionResult} from './AssertionResult';
import {UnitTestState} from './UnitTestState';
import {Event} from './Event';

/**
 * Abstract base class for unit tests.
 */
export abstract class UnitTest {
	public static testName(name: string) {
		return (target: typeof UnitTest) => {
			target._testName = name;
		};
	}
	
	public static describe(...description: string[]) {
		return (target: typeof UnitTest) => {
			target.description = description.join('');
		};
	}
	
	public static timeout(milliseconds: number) {
		return (target: typeof UnitTest) => {
			target.defaultTimeout = milliseconds;
		};
	}
	
	public static tests(...objects: any[]) {
		return (target: typeof UnitTest) => {
			
		};
	}
	
	
	/**
	 * @final
	 */
	public get ID(): number {
		return this.id;
	}


	public get name(): string {
		return (<typeof UnitTest><any>this.constructor)._testName || (<typeof UnitTest><any>this.constructor).name || '???';
	}


	public get description(): string {
		return (<typeof UnitTest><any>this.constructor).description || "unit test " + this.name;
	}
	
	
	/**
	 * What features, functions, classes, methods, etc are tested by a unit test.
	 */
	public get tests(): any[] {
		return [];
	}


	public state = UnitTestState.Idle;


	public timesOutAfter = (<typeof UnitTest>this.constructor).defaultTimeout;


	public assertionResults: AssertionResult[] = [];


	public startTime: Date;


	public stopTime: Date;


	public execTime: number;
	
	
	public exception: any;
	
	
	public onStart = new Event<() => void>();
	
	
	public onFinish = new Event<() => void>();


	public onReset = new Event<() => void>();


	public reset(): void {
		this.state = UnitTestState.Scheduled;
		this.assertionResults.splice(0, this.assertionResults.length);
		this.startTime = null;
		this.stopTime = null;
		this.execTime = null;
		this.exception = null;
		this.onReset.trigger();
	}


	public async run(): Promise<void> {
		return new Promise<void>(async(resolve: () => void) => {
			var timedOut = false;

			this.onStart.trigger();

			this.state = UnitTestState.Running;

			this.startTimer();

			setTimeout(() => {
				if (this.state === UnitTestState.Running) {
					timedOut = true;
					this.stopTimer();
					this.interpretResultsWithTimeout();
					this.onFinish.trigger();
					resolve();
				}
			}, this.timesOutAfter);

			this.performTest().then(() => {
				this.stopTimer();

				if (timedOut)
					return;

				this.interpretResults();
				this.onFinish.trigger();
				return resolve();
			}).catch((err: any) => {
				this.stopTimer();

				if (timedOut)
					return;

				// the test failed, so update the status and store the exception
				this.interpretResultsWithUncaughtException(err);
				this.onFinish.trigger();
				return resolve();
			});
		});
	}
	
	
	/**
	 * @final
	 */
	protected static __isUnitTestClass(object: any): boolean {
		return (
			typeof object === 'function' &&
			(<typeof UnitTest>object).__unitTestBrand__ === UnitTest.__unitTestBrand__
		);
	}


	/**
	 * Assert whether a certain condition is true. The condition can be a simple boolean value, a promise that resolves a boolean value or another `UnitTest` class or instance. When a unit test is provided, the unit test's `run()` method will be called and awaited. The unit test's state after running will be evaluated.
	 * @param test A boolean value, promise with boolean result, child class of `UnitTest` or instance of `UnitTest` to be evaluated. Boolean values and promise results are treated as successful when they evaluate `true`, unit tests are treated as successful when their state after running is `UnitTestState.Successful`.
	 * @param description An optional description of the assertion being made.
	 */
	protected async assert(test: boolean, ...description: string[]): Promise<boolean>;
	protected async assert(test: Promise<boolean>, ...description: string[]): Promise<boolean>;
	protected async assert(test: UnitTest, ...description: string[]): Promise<boolean>;
	protected async assert(test: typeof UnitTest, ...description: string[]): Promise<boolean>;
	protected async assert(test: any, ...description: string[]): Promise<boolean> {
		return new Promise<boolean>(async(done: (actualResult: boolean) => void) => {
			var actualResult: boolean;

			if (this.state === UnitTestState.Timeout)
				return;


			switch (true) {
				default:
					throw new Error(`UnitTest.prototype.Assert(...): Invalid assertion test type ${test ? test.constructor.name : typeof test}.`);

				case typeof test === "boolean":
					actualResult = !!test;
					this.interpretActualAssertionResult(actualResult, description);
					done(actualResult);
					break;


				case test instanceof Promise:
					(<Promise<boolean>>test).then((result: boolean) => {
						actualResult = !!result;
						this.interpretActualAssertionResult(actualResult, description);
						done(actualResult);
					});
					break;


				case test instanceof (<any>UnitTest):
					(async() => {
						await (<UnitTest>test).run();
						actualResult = (<UnitTest>test).state === UnitTestState.Successful;
						this.interpretActualAssertionResult(actualResult, description);
						done(actualResult);
					})();
					break;


				case UnitTest.__isUnitTestClass(test):
					const testInstance = <UnitTest>(new test());
					(async() => {
						await testInstance.runInContext(this);
						actualResult = testInstance.state === UnitTestState.Successful;
						this.interpretActualAssertionResult(actualResult, description);
						done(actualResult);
					})();
					break;
			}
		});
	}


	protected abstract async performTest(): Promise<void>;
	
	
	private async runInContext(test: UnitTest): Promise<void> {
		this.resultTarget = test;
		await this.run();
		this.resultTarget = this;
	}


	private interpretResultsWithUncaughtException(err: any): void {
		if (this.state === UnitTestState.Timeout)
			return;

		this.state = UnitTestState.Error;
		this.exception = err;
	}


	private interpretResultsWithTimeout(): void {
		this.state = UnitTestState.Timeout;
	}


	private interpretResults(): void {
		if (this.state === UnitTestState.Timeout)
			return;

		if (this.assertionResults && this.assertionResults.length > 0) {
			let failedAssertions = this.assertionResults.filter((result: AssertionResult) => !result.successful).length;

			if (failedAssertions > 0)
				this.state = UnitTestState.Fail;
			else
				this.state = UnitTestState.Successful;
		} else {
			this.state = UnitTestState.Indeterminate;
		}
	}


	private interpretActualAssertionResult(result: boolean, description: string[]): void {
		if (this.state === UnitTestState.Running) {
			this.resultTarget.assertionResults = this.resultTarget.assertionResults || [];
			this.resultTarget.assertionResults.push(new AssertionResult(this.id, result, description.join(" ")));
		}
	}


	private startTimer(): void {
		if (this.startTime instanceof Date)
			return;

		this.startTime = new Date();
	}


	private stopTimer(): void {
		if (this.stopTime instanceof Date)
			return;

		this.stopTime = new Date();

		if (this.startTime instanceof Date)
			this.execTime = this.stopTime.getTime() - this.startTime.getTime();
	}


	private get stateAsString(): string {
		return UnitTestState[this.state];
	}
	
	
	private static __unitTestBrand__ = Math.random();


	private static instanceCounter = 0;
	
	
	private static _testName: string;


	private static description: string;
	
	
	private static defaultTimeout = 200;
	
	
	private id = ++UnitTest.instanceCounter;
	
	
	private resultTarget: UnitTest = this;
}