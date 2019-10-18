"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UnitTestState_1 = require("./UnitTestState");
const UnitTest_1 = require("./UnitTest");
const TestRunner_1 = require("./TestRunner");
const FG_DEFAULT = '\x1b[39m', FG_GREEN = '\x1b[32m', FG_RED = '\x1b[31m', FG_YELLOW = '\x1b[33m', WEIGHT_NORMAL = '\x1b[0m', WEIGHT_BOLD = '\x1b[1m', INDENT = '\t';
function colorize(literals, placeholders, color) {
    var result = color;
    placeholders.forEach((placeholder, index) => {
        result += literals[index] + placeholder;
    });
    result += literals[literals.length - 1];
    return result + FG_DEFAULT;
}
function red(literals, ...placeholders) {
    return colorize(literals.concat([]), placeholders, FG_RED);
}
function green(literals, ...placeholders) {
    return colorize(literals, placeholders, FG_RED);
}
function yellow(literals, ...placeholders) {
    return colorize(literals.concat([]), placeholders, FG_YELLOW);
}
/**
 * Command line rendering for unit tests and unit test runners.
 */
class CliRenderer {
    /**
     * Creates a command line renderer for a unit test or test runner. Immediately starts listening to unit test events.
     * @param topLevelTest An instance of `UnitTest` or `TestRunner`.
     */
    constructor(test) {
        this.test = test;
        this.depthLevel = 0;
        this.initDeepRenderers();
        this.bindEventListeners();
    }
    initDeepRenderers() {
        if (this.test instanceof UnitTest_1.UnitTest) {
            this.test.tests.forEach((test) => this.createChildRenderer(test));
        }
    }
    createChildRenderer(test) {
        const renderer = new CliRenderer(test);
        renderer.depthLevel = this.depthLevel + 1;
    }
    bindEventListeners() {
        this.test.onFinish.bind(() => this.renderTestFinished());
        if (this.test instanceof TestRunner_1.TestRunner) {
            this.test.onStart.bind(() => this.renderTestRunnerStarting());
        }
    }
    getIndentString() {
        var str = '';
        for (let i = 0; i < this.depthLevel; i++) {
            str += INDENT;
        }
        return str;
    }
    static formatTestName(testName) {
        return `${WEIGHT_BOLD}${testName}${WEIGHT_NORMAL}`;
    }
    getFormattedTestName() {
        return CliRenderer.formatTestName(this.test.name);
    }
    write(...message) {
        console.log(this.getIndentString(), ...message);
    }
    renderTestRunnerStarting() {
        const line = '---------------';
        this.write(`${line} Running ${this.getFormattedTestName()} ${line}`);
    }
    static getStateSymbol(state) {
        switch (state) {
            default:
                return '?';
            case UnitTestState_1.UnitTestState.Successful:
                return '✓';
            case UnitTestState_1.UnitTestState.Fail:
                return '✗';
            case UnitTestState_1.UnitTestState.Error:
                return '!';
            case UnitTestState_1.UnitTestState.Timeout:
                return '⌬';
        }
    }
    static getStateColor(state) {
        switch (state) {
            default:
                return FG_DEFAULT;
            case UnitTestState_1.UnitTestState.Successful:
                return FG_GREEN;
            case UnitTestState_1.UnitTestState.Fail:
            case UnitTestState_1.UnitTestState.Error:
            case UnitTestState_1.UnitTestState.Timeout:
                return FG_RED;
        }
    }
    getStateSymbol() {
        return CliRenderer.getStateSymbol(this.test.state);
    }
    getStateColor() {
        return CliRenderer.getStateColor(this.test.state);
    }
    getFormattedStateSymbol() {
        return `${this.getStateColor()}${WEIGHT_BOLD}${CliRenderer.getStateSymbol(this.test.state)}${WEIGHT_NORMAL}${FG_DEFAULT} `;
    }
    getTestRunnerStatistics() {
        const byState = {}, NEWLINE = `\n${this.getIndentString()}${INDENT}`;
        var str = '';
        this.test.getAllTestsAndChildTests().forEach(test => {
            byState[test.state] = byState[test.state] || 0;
            byState[test.state] += 1;
        });
        for (let state in byState) {
            str += `${NEWLINE}${UnitTestState_1.UnitTestState[state]}: ${byState[state]}`;
        }
        return `${str}${NEWLINE}Time: ${this.test.execTime / 1000}s`;
    }
    renderTestFinished() {
        const NEWLINE = `\n${this.getIndentString()}${INDENT}`, line = '---------------';
        var additionalMessage = '', assertionMessage = '';
        switch (this.test.state) {
            case UnitTestState_1.UnitTestState.Error:
                additionalMessage += red `${NEWLINE}Error: ${this.test.exception}`;
                if (this.test.exception.stack) {
                    additionalMessage += yellow `${NEWLINE}${this.test.exception.stack}`;
                }
                break;
            case UnitTestState_1.UnitTestState.Timeout:
                additionalMessage += red `${NEWLINE}Timeout after ${(this.test.timesOutAfter / 1000)}s`;
                break;
        }
        if (this.test instanceof TestRunner_1.TestRunner) {
            additionalMessage = this.getTestRunnerStatistics();
        }
        else if (this.test.state !== UnitTestState_1.UnitTestState.Successful) {
            this.test.assertionResults.forEach(result => {
                const state = result.successful ? UnitTestState_1.UnitTestState.Successful : UnitTestState_1.UnitTestState.Fail, color = CliRenderer.getStateColor(state), symbol = CliRenderer.getStateSymbol(state);
                assertionMessage += `${NEWLINE}${color}${symbol}${FG_DEFAULT} ${result.description || '???'}`;
            });
        }
        this.write(this.getFormattedStateSymbol(), this.getFormattedTestName(), `(${this.test.execTime}ms)`, assertionMessage, additionalMessage);
    }
}
exports.CliRenderer = CliRenderer;
