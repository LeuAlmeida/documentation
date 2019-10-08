import {DocumentNode} from './ast/DocumentNode';
import {IStringificationParams} from './ast/IStringificationParams';
import {SyntaxRuleSet} from './parser/SyntaxRuleSet';
import {Parser} from './parser/Parser';

export abstract class Compiler {
	/**
	 * Parses an XML string and returns the parser object that parsed it.
	 */
	public static async parseXml(xmlString: string, ruleSet?: SyntaxRuleSet | typeof SyntaxRuleSet): Promise<Parser> {
		return Parser.parseString(xmlString, ruleSet);
	}
	
	
	/**
	 * Parses an XML string and returns the a syntax tree.
	 */
	public static async parseXmlToAst(xmlString: string, ruleSet?: SyntaxRuleSet | typeof SyntaxRuleSet): Promise<DocumentNode> {
		return Parser.parseStringToAst(xmlString, ruleSet);
	}
	
	
	/**
	 * Parses an XML string to a syntax tree, then serializes it to formatted XML.
	 */
	public static async formatXmlString(xmlString: string, formattingOptions?: IStringificationParams, ruleSet?: SyntaxRuleSet | typeof SyntaxRuleSet): Promise<string> {
		return (await Parser.parseStringToAst(xmlString, ruleSet)).toFormattedString(formattingOptions);
	}
}