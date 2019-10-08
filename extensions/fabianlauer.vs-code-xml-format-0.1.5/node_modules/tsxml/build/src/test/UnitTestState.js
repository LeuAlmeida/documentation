"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UnitTestState;
(function (UnitTestState) {
    /**
     * The test is neither scheduled nor running or finished.
     */
    UnitTestState[UnitTestState["Idle"] = 0] = "Idle";
    /**
     * The test is scheduled but is not yet running or finished.
     */
    UnitTestState[UnitTestState["Scheduled"] = 1] = "Scheduled";
    /**
     * The test is currently running.
     */
    UnitTestState[UnitTestState["Running"] = 2] = "Running";
    /**
     * The test has finished successfully.
     */
    UnitTestState[UnitTestState["Successful"] = 3] = "Successful";
    /**
     * The test has finished, but the result indicated a failure.
     */
    UnitTestState[UnitTestState["Fail"] = 4] = "Fail";
    /**
     * The test has finished, but no assertions were made.
     */
    UnitTestState[UnitTestState["Indeterminate"] = 5] = "Indeterminate";
    /**
     * The test didn't finish and was cancelled due to a timeout. This can be used as an indicator
     * for missing callback calls.
     */
    UnitTestState[UnitTestState["Timeout"] = 6] = "Timeout";
    /**
     * The test failed due to an uncaught exception and probably didn't finish.
     */
    UnitTestState[UnitTestState["Error"] = 7] = "Error";
})(UnitTestState = exports.UnitTestState || (exports.UnitTestState = {}));
