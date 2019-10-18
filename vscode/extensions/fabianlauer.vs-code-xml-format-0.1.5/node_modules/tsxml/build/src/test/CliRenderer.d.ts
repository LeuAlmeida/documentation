import { UnitTest } from './UnitTest';
/**
 * Command line rendering for unit tests and unit test runners.
 */
export declare class CliRenderer {
    private test;
    /**
     * Creates a command line renderer for a unit test or test runner. Immediately starts listening to unit test events.
     * @param topLevelTest An instance of `UnitTest` or `TestRunner`.
     */
    constructor(test: UnitTest);
    private initDeepRenderers();
    private createChildRenderer(test);
    private bindEventListeners();
    private getIndentString();
    private static formatTestName(testName);
    private getFormattedTestName();
    private write(...message);
    private renderTestRunnerStarting();
    private static getStateSymbol(state);
    private static getStateColor(state);
    private getStateSymbol();
    private getStateColor();
    private getFormattedStateSymbol();
    private getTestRunnerStatistics();
    private renderTestFinished();
    private depthLevel;
}
