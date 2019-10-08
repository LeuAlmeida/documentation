import {AssertionResult} from './AssertionResult';
import {UnitTestState} from './UnitTestState';
import {UnitTest} from './UnitTest';
import {TestRunner} from './TestRunner';

const FG_DEFAULT = '\x1b[39m',
	FG_GREEN = '\x1b[32m',
	FG_RED = '\x1b[31m',
	FG_YELLOW = '\x1b[33m',
	WEIGHT_NORMAL = '\x1b[0m',
	WEIGHT_BOLD = '\x1b[1m',
	INDENT = '\t';


function colorize(literals: string[], placeholders: string[], color: string): string {
	var result = color;
	placeholders.forEach((placeholder, index) => {
		result += literals[index] + placeholder;
	});
	result += literals[literals.length - 1];
	return result + FG_DEFAULT;
}


function red(literals: TemplateStringsArray, ...placeholders: string[]): string {
	return colorize(literals.concat([]), placeholders, FG_RED);
}


function green(literals: string[], ...placeholders: string[]): string {
	return colorize(literals, placeholders, FG_RED);
}


function yellow(literals: TemplateStringsArray, ...placeholders: string[]): string {
	return colorize(literals.concat([]), placeholders, FG_YELLOW);
}


/**
 * Command line rendering for unit tests and unit test runners.
 */
export class CliRenderer {
	/**
	 * Creates a command line renderer for a unit test or test runner. Immediately starts listening to unit test events.
	 * @param topLevelTest An instance of `UnitTest` or `TestRunner`.
	 */
	constructor(private test: UnitTest) {
		this.initDeepRenderers();
		this.bindEventListeners();
	}
	
	
	private initDeepRenderers(): void {
		if (this.test instanceof UnitTest) {
			this.test.tests.forEach((test: UnitTest) => this.createChildRenderer(test));
		}
	}
	
	
	private createChildRenderer(test: UnitTest): void {
		const renderer = new CliRenderer(test);
		renderer.depthLevel = this.depthLevel + 1;
	}
	
	
	private bindEventListeners(): void {
		this.test.onFinish.bind(() => this.renderTestFinished());
		if (this.test instanceof TestRunner) {
			this.test.onStart.bind(() => this.renderTestRunnerStarting());
		}
	}
	
	
	private getIndentString(): string {
		var str = '';
		for (let i = 0; i < this.depthLevel; i++) {
			str += INDENT;
		}
		return str;
	}
	
	
	private static formatTestName(testName: string): string {
		return `${WEIGHT_BOLD}${testName}${WEIGHT_NORMAL}`;
	}
	
	
	private getFormattedTestName(): string {
		return CliRenderer.formatTestName(this.test.name);
	}
	
	
	private write(...message: string[]): void {
		console.log(this.getIndentString(), ...message)
	}
	
	
	private renderTestRunnerStarting(): void {
		const line = '---------------';
		this.write(`${line} Running ${this.getFormattedTestName()} ${line}`);
	}
	
	
	private static getStateSymbol(state: UnitTestState): string {
		switch (state) {
			default:
				return '?';
			
			case UnitTestState.Successful:
				return '✓';
			
			case UnitTestState.Fail:
				return '✗';
			
			case UnitTestState.Error:
				return '!';
			
			case UnitTestState.Timeout:
				return '⌬';
		}
	}
	
	
	private static getStateColor(state: UnitTestState): string {
		switch (state) {
			default:
				return FG_DEFAULT;
			
			case UnitTestState.Successful:
				return FG_GREEN;
			
			case UnitTestState.Fail:
			case UnitTestState.Error:
			case UnitTestState.Timeout:
				return FG_RED;
		}
	}
	
	
	private getStateSymbol(): string {
		return CliRenderer.getStateSymbol(this.test.state);
	}
	
	
	private getStateColor(): string {
		return CliRenderer.getStateColor(this.test.state);
	}
	
	
	private getFormattedStateSymbol(): string {
		return `${this.getStateColor()}${WEIGHT_BOLD}${CliRenderer.getStateSymbol(this.test.state)}${WEIGHT_NORMAL}${FG_DEFAULT} `;
	}
	
	
	private getTestRunnerStatistics(): string {
		const byState: { [state: number]: number } = {},
			NEWLINE = `\n${this.getIndentString()}${INDENT}`;
		var str = '';
		
		(<TestRunner>this.test).getAllTestsAndChildTests().forEach(test => {
			byState[test.state] = byState[test.state] || 0;
			byState[test.state] += 1;
		});
		
		for (let state in byState) {
			str += `${NEWLINE}${UnitTestState[state]}: ${byState[state]}`;
		}
		
		return `${str}${NEWLINE}Time: ${this.test.execTime / 1000}s`;
	}
	
	
	private renderTestFinished(): void {
		const NEWLINE = `\n${this.getIndentString()}${INDENT}`,
			line = '---------------';
		var additionalMessage = '',
			assertionMessage = '';
		
		switch (this.test.state) {
			case UnitTestState.Error:
				additionalMessage += red `${NEWLINE}Error: ${this.test.exception}`;
				if (this.test.exception.stack) {
					additionalMessage += yellow `${NEWLINE}${this.test.exception.stack}`;
				}
				break;
			
			case UnitTestState.Timeout:
				additionalMessage += red `${NEWLINE}Timeout after ${<any>(this.test.timesOutAfter / 1000)}s`;
				break;
		}
		
		if (this.test instanceof TestRunner) {
			additionalMessage = this.getTestRunnerStatistics();
		} else if (this.test.state !== UnitTestState.Successful) {
			this.test.assertionResults.forEach(result => {
				const state = result.successful ? UnitTestState.Successful : UnitTestState.Fail,
					  color = CliRenderer.getStateColor(state),
					  symbol = CliRenderer.getStateSymbol(state);
				assertionMessage += `${NEWLINE}${color}${symbol}${FG_DEFAULT} ${result.description || '???'}`;
			});
		}

		this.write(this.getFormattedStateSymbol(), this.getFormattedTestName(), `(${this.test.execTime}ms)`, assertionMessage, additionalMessage);
	}
	
	
	private depthLevel = 0;
}