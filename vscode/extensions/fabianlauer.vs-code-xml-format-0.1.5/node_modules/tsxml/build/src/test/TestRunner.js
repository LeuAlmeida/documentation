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
const UnitTest_1 = require("./UnitTest");
const UnitTestState_1 = require("./UnitTestState");
const Event_1 = require("./Event");
class TestRunner extends UnitTest_1.UnitTest {
    constructor() {
        super(...arguments);
        this.onChildStart = new Event_1.Event();
        this.onChildFinish = new Event_1.Event();
        this.onChildReset = new Event_1.Event();
        this._tests = [];
    }
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
    static runs(...tests) {
        return class extends this {
            constructor() {
                super();
                this.add(...tests.map(testClass => {
                    if (testClass instanceof UnitTest_1.UnitTest) {
                        return testClass;
                    }
                    else {
                        return new testClass();
                    }
                }));
            }
        };
    }
    get timesOutAfter() {
        var ms = 0;
        this._tests.forEach((test) => {
            ms += test.timesOutAfter;
        });
        return Math.max(ms, 1);
    }
    set timesOutAfter(ms) {
        // don't do anything
    }
    get tests() {
        return [].concat(this._tests);
    }
    add(...tests) {
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
    getAllTestsAndChildTests() {
        var tests = [];
        this._tests.forEach((test) => {
            tests.push(test);
            if (test instanceof TestRunner)
                tests = tests.concat(test.tests);
        });
        return tests;
    }
    /**
     * @override
     */
    reset() {
        this._tests.forEach((test) => test.reset());
        super.reset();
    }
    /**
     * @override
     */
    performTest() {
        return __awaiter(this, void 0, void 0, function* () {
            for (let i = 0; i < this._tests.length; i++) {
                const test = this._tests[i];
                test.state = UnitTestState_1.UnitTestState.Scheduled;
                yield this.assert(test, "Test '" + test.name + "'");
                yield this.afterAssert(test);
            }
        });
    }
    /**
     * A method that is called after a unit test was run.
     * @param test The test that has just finished.
     */
    afterAssert(test) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
}
exports.TestRunner = TestRunner;
