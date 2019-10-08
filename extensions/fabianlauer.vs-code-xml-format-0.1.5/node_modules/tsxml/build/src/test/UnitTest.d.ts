import { AssertionResult } from './AssertionResult';
import { UnitTestState } from './UnitTestState';
import { Event } from './Event';
/**
 * Abstract base class for unit tests.
 */
export declare abstract class UnitTest {
    static testName(name: string): (target: typeof UnitTest) => void;
    static describe(...description: string[]): (target: typeof UnitTest) => void;
    static timeout(milliseconds: number): (target: typeof UnitTest) => void;
    static tests(...objects: any[]): (target: typeof UnitTest) => void;
    /**
     * @final
     */
    readonly ID: number;
    readonly name: string;
    readonly description: string;
    /**
     * What features, functions, classes, methods, etc are tested by a unit test.
     */
    readonly tests: any[];
    state: UnitTestState;
    timesOutAfter: number;
    assertionResults: AssertionResult[];
    startTime: Date;
    stopTime: Date;
    execTime: number;
    exception: any;
    onStart: Event<() => void>;
    onFinish: Event<() => void>;
    onReset: Event<() => void>;
    reset(): void;
    run(): Promise<void>;
    /**
     * @final
     */
    protected static __isUnitTestClass(object: any): boolean;
    /**
     * Assert whether a certain condition is true. The condition can be a simple boolean value, a promise that resolves a boolean value or another `UnitTest` class or instance. When a unit test is provided, the unit test's `run()` method will be called and awaited. The unit test's state after running will be evaluated.
     * @param test A boolean value, promise with boolean result, child class of `UnitTest` or instance of `UnitTest` to be evaluated. Boolean values and promise results are treated as successful when they evaluate `true`, unit tests are treated as successful when their state after running is `UnitTestState.Successful`.
     * @param description An optional description of the assertion being made.
     */
    protected assert(test: boolean, ...description: string[]): Promise<boolean>;
    protected assert(test: Promise<boolean>, ...description: string[]): Promise<boolean>;
    protected assert(test: UnitTest, ...description: string[]): Promise<boolean>;
    protected assert(test: typeof UnitTest, ...description: string[]): Promise<boolean>;
    protected abstract performTest(): Promise<void>;
    private runInContext(test);
    private interpretResultsWithUncaughtException(err);
    private interpretResultsWithTimeout();
    private interpretResults();
    private interpretActualAssertionResult(result, description);
    private startTimer();
    private stopTimer();
    private readonly stateAsString;
    private static __unitTestBrand__;
    private static instanceCounter;
    private static _testName;
    private static description;
    private static defaultTimeout;
    private id;
    private resultTarget;
}
