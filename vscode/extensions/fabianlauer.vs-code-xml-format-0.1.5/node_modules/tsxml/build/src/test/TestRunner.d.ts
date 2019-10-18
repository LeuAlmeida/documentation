import { UnitTest } from './UnitTest';
import { Event } from './Event';
export declare class TestRunner extends UnitTest {
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
    static runs(...tests: Array<typeof UnitTest | UnitTest>): typeof TestRunner;
    onChildStart: Event<(child: UnitTest) => void>;
    onChildFinish: Event<(child: UnitTest) => void>;
    onChildReset: Event<(child: UnitTest) => void>;
    timesOutAfter: number;
    readonly tests: UnitTest[];
    add(...tests: UnitTest[]): void;
    getAllTestsAndChildTests(): UnitTest[];
    /**
     * @override
     */
    reset(): void;
    /**
     * @override
     */
    protected performTest(): Promise<void>;
    /**
     * A method that is called after a unit test was run.
     * @param test The test that has just finished.
     */
    protected afterAssert(test: UnitTest): Promise<void>;
    private _tests;
}
