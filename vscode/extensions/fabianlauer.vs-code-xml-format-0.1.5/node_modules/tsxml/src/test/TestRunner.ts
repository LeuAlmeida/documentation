import {UnitTest} from './UnitTest';
import {UnitTestState} from './UnitTestState';
import {Event} from './Event';

export class TestRunner extends UnitTest {
	/**
	 * Returns a test runner child class that will run a list of unit tests.
	 * @param tests The unit test instances or test classes to run.
	 * @example
	 *     class SampleUnitTest extends UnitTest {
	 *         // ...
	 *     }
	 * 
	 *     class SampleTestRunner extends TestRunner.runs(SampleUnitTest, new SampleUnitTest()) { }
	 * 
	 *     var runner = new SampleTestRunner();
	 *     runner.run(); // will run `SampleUnitTest`
	 */
	public static runs(...tests: Array<typeof UnitTest | UnitTest>): typeof TestRunner {
		return class extends this {
			constructor() {
				super();
				this.add(...tests.map(testClass => {
					if (testClass instanceof UnitTest) {
						return testClass;
					} else {
						return new (<any>testClass)();
					}
				}));
			}
		};
	}
	
	
	public onChildStart = new Event<(child: UnitTest) => void>();
	
	
	public onChildFinish = new Event<(child: UnitTest) => void>();
	
	
	public onChildReset = new Event<(child: UnitTest) => void>();
	
	
	public get timesOutAfter(): number {
		var ms = 0;

		this._tests.forEach((test: UnitTest) => {
			ms += test.timesOutAfter;
		});

		return Math.max(ms, 1);
	}


	public set timesOutAfter(ms: number) {
		// don't do anything
	}


	public get tests(): UnitTest[] {
		return [].concat(this._tests);
	}


	public add(...tests: UnitTest[]): void {
		tests.forEach(test => {
			// only add listeners if the test was not added before (this avoids triggering child events multiple
			// times for the same unit test instance)
			if (this._tests.indexOf(test) === -1) {
				test.onStart.bind(() => this.onChildStart.trigger(test));
				test.onFinish.bind(() => this.onChildFinish.trigger(test));
				test.onReset.bind(() => this.onChildReset.trigger(test));
			}
			this._tests.push(test);
		});
	}


	public getAllTestsAndChildTests(): UnitTest[] {
		var tests: UnitTest[] = [];

		this._tests.forEach((test: UnitTest) => {
			tests.push(test);

			if (test instanceof (<any>TestRunner))
				tests = tests.concat((<TestRunner>test).tests);
		});

		return tests;
	}
	
	
	/**
	 * @override
	 */
	public reset(): void {
		this._tests.forEach((test: UnitTest) => test.reset());
		super.reset();
	}
	

	/**
	 * @override
	 */
	protected async performTest(): Promise<void> {
		for (let i = 0; i < this._tests.length; i++) {
			const test = this._tests[i];
			test.state = UnitTestState.Scheduled;
			await this.assert(test, "Test '" + test.name + "'");
			await this.afterAssert(test);
		}
	}
	
	
	/**
	 * A method that is called after a unit test was run.
	 * @param test The test that has just finished.
	 */
	protected async afterAssert(test: UnitTest): Promise<void> { }


	private _tests: UnitTest[] = [];
}
