import * as test from '../../src/test';
import * as decorators from './decorators';

@TestRunner.testName('AST Tests')
export class TestRunner extends test.TestRunner {
	constructor() {
		super();
		this.add(
			new decorators.TestRunner()
		);
	}
}