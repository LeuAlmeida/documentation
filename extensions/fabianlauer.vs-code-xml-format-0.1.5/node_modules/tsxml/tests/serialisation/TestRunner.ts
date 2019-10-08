/// <reference path="../../typings/node/node" />
import * as fs from 'fs';
import * as test from '../../src/test';
import * as xml from '../../src/index';

abstract class FileTest extends test.UnitTest {
	protected abstract getFullPathToFile(): string;
	
	protected async performTest() {
		const documentNode = await xml.Parser.parseStringToAst(await this.getSourceAsString(), this.getSyntaxRuleSet());
		if (typeof (await this.getCompactExpectationAsString()) === 'string' && (await this.getCompactExpectationAsString()).length > 0) {
			const serializedXml = FileTest.makeComparableString(documentNode.toString());
			await this.assert(serializedXml === (await this.getCompactExpectationAsString()),
							  `compact serialized XML meets expectation, got: ${serializedXml}`);
		}
		if (typeof (await this.getDefaultExpectationAsString()) === 'string' && (await this.getDefaultExpectationAsString()).length > 0) {
			const serializedXml = FileTest.makeComparableString(documentNode.toFormattedString());
			await this.assert(serializedXml === (await this.getDefaultExpectationAsString()),
							  `default serialized XML meets expectation, got: ${serializedXml}`);
		}
		await this.assert(this.assertionResults.length > 0, 'test has at least one expectation to test against');
		this.cleanup();
	}
	
	
	private static makeComparableString(str: string): string {
		return str.trim().replace(/^\s+/, '').replace(/\s+$/, '').trim();
	}
	
	
	private async getFileContentAsString(): Promise<string>  {
		if (typeof this.fileContent === 'string') {
			return this.fileContent;
		}
		return new Promise<string>((resolve: (contentAsString: string) => void, reject: (reason: any) => void) => {
			fs.readFile(this.getFullPathToFile(), (err: any, content: Buffer) => {
				if (err) {
					reject(err);
				} else {
					this.fileContent = content + '';
					resolve(this.fileContent);
				}
			});
		});
	}
	
	
	private async getSourceAsString(): Promise<string> {
		return FileTest.makeComparableString(await this.getFileContentAsString()).split(FileTest.compactOrDefaultSplitRegex)[0];
	}
	
	
	private async getCompactExpectationAsString(): Promise<string> {
		var fileContent = await this.getFileContentAsString();
		fileContent = fileContent.split(FileTest.compactSplitRegex)[1] || '';
		fileContent = fileContent.replace(/@@(\s|.)*$/, '');
		return FileTest.makeComparableString(fileContent);
	}
	
	
	private async getDefaultExpectationAsString(): Promise<string> {
		var fileContent = await this.getFileContentAsString();
		fileContent = fileContent.split(FileTest.defaultSplitRegex)[1] || '';
		fileContent = fileContent.replace(/@@(\s|.)*$/, '');
		return FileTest.makeComparableString(fileContent);
	}
	
	
	private getSyntaxRuleSet(): typeof xml.parser.SyntaxRuleSet {
		const fileNameSuffix = this.getFullPathToFile().split(/\.([a-z]+)$/i)[1].toLowerCase();
		switch (fileNameSuffix) {
			default:
				return undefined;
			case 'html':
				return xml.parser.ruleSet.Html5;
		}
	}
	
	
	private cleanup(): void {
		this.fileContent = undefined;
	}
	
	
	private static compactOrDefaultSplitRegex = /\n@@ *(COMPACT|DEFAULT) *@@/i;
	
	
	private static compactSplitRegex = /\n@@ *COMPACT *@@/i;
	
	
	private static defaultSplitRegex = /\n@@ *DEFAULT *@@/i;
	
	
	private fileContent: string;
}


@TestRunner.testName('Serialisation w/o Formatting')
export class TestRunner extends test.TestRunner {
	constructor() {
		super();
		this.prepareFileTestsForDirectory('xml/', FileTest);
	}
	
	
	private prepareFileTestsForDirectory(directoryPath: string, testBaseClass: typeof FileTest): void {
		const basePath = './tests/serialisation/';
		fs.readdirSync(basePath + directoryPath).forEach(path => {
			const fullPathToFile = basePath + directoryPath + path;
			if (!fs.statSync(fullPathToFile).isFile()) {
				return;
			}
			this.add(new (class extends testBaseClass {
				public get name() { return directoryPath + path; }
				protected getFullPathToFile() { return fullPathToFile; }
			}));
		});
	}
}