/// Contains cases producing syntax errors.

import * as test from '../../src/test';
import * as xml from '../../src/index';
import '../../src/test/jsx';


abstract class SyntaxErrorTest extends test.UnitTest {
	protected get parsedDocument() { return this._parsedDocument; }
	
	
	protected get syntaxError() { return this._syntaxErrror; }
	
	
	protected async parse(stringToParse: string): Promise<void> {
		try {
			this._parsedDocument = await xml.Parser.parseStringToAst(stringToParse);
		} catch(err) {
			this._syntaxErrror = err;
		}
	}
	
	
	private _parsedDocument: xml.ast.DocumentNode;
	
	
	private _syntaxErrror: xml.SyntaxError;
}


class TagNameStartingWithPeriod extends SyntaxErrorTest {
	protected async performTest() {
		await this.parse('<.a />');
		await this.assert(this.syntaxError instanceof xml.SyntaxError, 'exception is a SyntaxError object');
		await this.assert(this.syntaxError.getErrorCode() === xml.SyntaxErrorCode.InvalidTagName, 'exception has correct code');
	}
}


abstract class ExcessCloseTagTest extends SyntaxErrorTest {
	protected abstract getStringToParse(): string;
	
	
	protected async performTest() {
		await this.parse(this.getStringToParse());
		await this.assert(this.syntaxError instanceof xml.SyntaxError, 'exception is a SyntaxError object');
		await this.assert(this.syntaxError.getErrorCode() === xml.SyntaxErrorCode.ExcessCloseTag, 'exception has correct code');
	}
}


class ExcessCloseTagInRoot extends ExcessCloseTagTest {
	protected getStringToParse(): string {
		return '</alpha>';
	}
}


class ExcessCloseTagAfterSelfCloseInRoot extends ExcessCloseTagTest {
	protected getStringToParse(): string {
		return '<alpha /></alpha>';
	}
}


class NestedExcessCloseTag extends ExcessCloseTagTest {
	protected getStringToParse(): string {
		return `
			<alpha>
				<beta>
				</beta>
				</beta>
			</alpha>
		`;
	}
}


class NestedExcessCloseTagAfterSelfClose extends ExcessCloseTagTest {
	protected getStringToParse(): string {
		return `
			<alpha>
				<beta />
				</beta>
			</alpha>
		`;
	}
}


@TestRunner.testName('Syntax Errors')
export class TestRunner extends test.TestRunner {
	constructor() {
		super();
		this.add(
			new TagNameStartingWithPeriod(),
			new ExcessCloseTagInRoot(),
			new ExcessCloseTagAfterSelfCloseInRoot(),
			new NestedExcessCloseTag(),
			new NestedExcessCloseTagAfterSelfClose()
		);
	}
}