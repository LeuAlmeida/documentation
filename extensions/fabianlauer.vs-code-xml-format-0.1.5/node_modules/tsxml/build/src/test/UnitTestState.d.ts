export declare enum UnitTestState {
    /**
     * The test is neither scheduled nor running or finished.
     */
    Idle = 0,
    /**
     * The test is scheduled but is not yet running or finished.
     */
    Scheduled = 1,
    /**
     * The test is currently running.
     */
    Running = 2,
    /**
     * The test has finished successfully.
     */
    Successful = 3,
    /**
     * The test has finished, but the result indicated a failure.
     */
    Fail = 4,
    /**
     * The test has finished, but no assertions were made.
     */
    Indeterminate = 5,
    /**
     * The test didn't finish and was cancelled due to a timeout. This can be used as an indicator
     * for missing callback calls.
     */
    Timeout = 6,
    /**
     * The test failed due to an uncaught exception and probably didn't finish.
     */
    Error = 7,
}
