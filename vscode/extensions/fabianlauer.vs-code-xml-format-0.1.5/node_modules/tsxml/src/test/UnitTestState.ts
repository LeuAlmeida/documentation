export enum UnitTestState {
	/**
	 * The test is neither scheduled nor running or finished.
	 */
	Idle = 0,
		
		
	/**
	 * The test is scheduled but is not yet running or finished.
	 */
	Scheduled,
		
		
	/**
	 * The test is currently running.
	 */
	Running,
		
		
	/**
	 * The test has finished successfully.
	 */
	Successful,
		
		
	/**
	 * The test has finished, but the result indicated a failure.
	 */
	Fail,
		
		
	/**
	 * The test has finished, but no assertions were made.
	 */
	Indeterminate,
		
		
	/**
	 * The test didn't finish and was cancelled due to a timeout. This can be used as an indicator
	 * for missing callback calls.
	 */
	Timeout,
		
		
	/**
	 * The test failed due to an uncaught exception and probably didn't finish.
	 */
	Error
}