// Reads a file, formats it and prints the result to the stdout.
// Usage:
//    node fileFormatter.js path/to/file

/// <reference path="../typings/node/node" />
import * as fs from 'fs';
import * as xml from '../src/index';

function getSyntaxRuleSet(pathToFile: string): typeof xml.parser.SyntaxRuleSet {
	const fileNameSuffix = pathToFile.split(/\.([a-z]+)$/i)[1].toLowerCase();
	switch (fileNameSuffix) {
		default:
			return undefined;
		case 'html':
			return xml.parser.ruleSet.Html5.Loose;
	}
}


process.on('unhandledRejection', (reason: any) => {
	console.error('Could not format: ', reason.stack || reason);
});


(async () => {
	const PATH_TO_FILE = process.argv[2],
		  sourceXml = fs.readFileSync(PATH_TO_FILE) + '',
		  formattingOptions = {
			indentChar: '  ',
			newlineChar: '\n',
			attrParen: '"'
		 };
	process.stdout.write(await xml.Compiler.formatXmlString(sourceXml, formattingOptions, getSyntaxRuleSet(PATH_TO_FILE)));
})();