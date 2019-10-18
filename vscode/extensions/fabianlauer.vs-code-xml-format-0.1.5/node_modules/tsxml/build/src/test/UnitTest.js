"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const AssertionResult_1 = require("./AssertionResult");
const UnitTestState_1 = require("./UnitTestState");
const Event_1 = require("./Event");
/**
 * Abstract base class for unit tests.
 */
class UnitTest {
    constructor() {
        this.state = UnitTestState_1.UnitTestState.Idle;
        this.timesOutAfter = this.constructor.defaultTimeout;
        this.assertionResults = [];
        this.onStart = new Event_1.Event();
        this.onFinish = new Event_1.Event();
        this.onReset = new Event_1.Event();
        this.id = ++UnitTest.instanceCounter;
        this.resultTarget = this;
    }
    static testName(name) {
        return (target) => {
            target._testName = name;
        };
    }
    static describe(...description) {
        return (target) => {
            target.description = description.join('');
        };
    }
    static timeout(milliseconds) {
        return (target) => {
            target.defaultTimeout = milliseconds;
        };
    }
    static tests(...objects) {
        return (target) => {
        };
    }
    /**
     * @final
     */
    get ID() {
        return this.id;
    }
    get name() {
        return this.constructor._testName || this.constructor.name || '???';
    }
    get description() {
        return this.constructor.description || "unit test " + this.name;
    }
    /**
     * What features, functions, classes, methods, etc are tested by a unit test.
     */
    get tests() {
        return [];
    }
    reset() {
        this.state = UnitTestState_1.UnitTestState.Scheduled;
        this.assertionResults.splice(0, this.assertionResults.length);
        this.startTime = null;
        this.stopTime = null;
        this.execTime = null;
        this.exception = null;
        this.onReset.trigger();
    }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                var timedOut = false;
                this.onStart.trigger();
                this.state = UnitTestState_1.UnitTestState.Running;
                this.startTimer();
                setTimeout(() => {
                    if (this.state === UnitTestState_1.UnitTestState.Running) {
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
                }).catch((err) => {
                    this.stopTimer();
                    if (timedOut)
                        return;
                    // the test failed, so update the status and store the exception
                    this.interpretResultsWithUncaughtException(err);
                    this.onFinish.trigger();
                    return resolve();
                });
            }));
        });
    }
    /**
     * @final
     */
    static __isUnitTestClass(object) {
        return (typeof object === 'function' &&
            object.__unitTestBrand__ === UnitTest.__unitTestBrand__);
    }
    assert(test, ...description) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((done) => __awaiter(this, void 0, void 0, function* () {
                var actualResult;
                if (this.state === UnitTestState_1.UnitTestState.Timeout)
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
                        test.then((result) => {
                            actualResult = !!result;
                            this.interpretActualAssertionResult(actualResult, description);
                            done(actualResult);
                        });
                        break;
                    case test instanceof UnitTest:
                        (() => __awaiter(this, void 0, void 0, function* () {
                            yield test.run();
                            actualResult = test.state === UnitTestState_1.UnitTestState.Successful;
                            this.interpretActualAssertionResult(actualResult, description);
                            done(actualResult);
                        }))();
                        break;
                    case UnitTest.__isUnitTestClass(test):
                        const testInstance = (new test());
                        (() => __awaiter(this, void 0, void 0, function* () {
                            yield testInstance.runInContext(this);
                            actualResult = testInstance.state === UnitTestState_1.UnitTestState.Successful;
                            this.interpretActualAssertionResult(actualResult, description);
                            done(actualResult);
                        }))();
                        break;
                }
            }));
        });
    }
    runInContext(test) {
        return __awaiter(this, void 0, void 0, function* () {
            this.resultTarget = test;
            yield this.run();
            this.resultTarget = this;
        });
    }
    interpretResultsWithUncaughtException(err) {
        if (this.state === UnitTestState_1.UnitTestState.Timeout)
            return;
        this.state = UnitTestState_1.UnitTestState.Error;
        this.exception = err;
    }
    interpretResultsWithTimeout() {
        this.state = UnitTestState_1.UnitTestState.Timeout;
    }
    interpretResults() {
        if (this.state === UnitTestState_1.UnitTestState.Timeout)
            return;
        if (this.assertionResults && this.assertionResults.length > 0) {
            let failedAssertions = this.assertionResults.filter((result) => !result.successful).length;
            if (failedAssertions > 0)
                this.state = UnitTestState_1.UnitTestState.Fail;
            else
                this.state = UnitTestState_1.UnitTestState.Successful;
        }
        else {
            this.state = UnitTestState_1.UnitTestState.Indeterminate;
        }
    }
    interpretActualAssertionResult(result, description) {
        if (this.state === UnitTestState_1.UnitTestState.Running) {
            this.resultTarget.assertionResults = this.resultTarget.assertionResults || [];
            this.resultTarget.assertionResults.push(new AssertionResult_1.AssertionResult(this.id, result, description.join(" ")));
        }
    }
    startTimer() {
        if (this.startTime instanceof Date)
            return;
        this.startTime = new Date();
    }
    stopTimer() {
        if (this.stopTime instanceof Date)
            return;
        this.stopTime = new Date();
        if (this.startTime instanceof Date)
            this.execTime = this.stopTime.getTime() - this.startTime.getTime();
    }
    get stateAsString() {
        return UnitTestState_1.UnitTestState[this.state];
    }
}
UnitTest.__unitTestBrand__ = Math.random();
UnitTest.instanceCounter = 0;
UnitTest.defaultTimeout = 200;
exports.UnitTest = UnitTest;
