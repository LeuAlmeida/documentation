import { DocumentNode } from './ast/DocumentNode';
import { IStringificationParams } from './ast/IStringificationParams';
import { SyntaxRuleSet } from './parser/SyntaxRuleSet';
import { Parser } from './parser/Parser';
export declare abstract class Compiler {
    /**
     * Parses an XML string and returns the parser object that parsed it.
     */
    static parseXml(xmlString: string, ruleSet?: SyntaxRuleSet | typeof SyntaxRuleSet): Promise<Parser>;
    /**
     * Parses an XML string and returns the a syntax tree.
     */
    static parseXmlToAst(xmlString: string, ruleSet?: SyntaxRuleSet | typeof SyntaxRuleSet): Promise<DocumentNode>;
    /**
     * Parses an XML string to a syntax tree, then serializes it to formatted XML.
     */
    static formatXmlString(xmlString: string, formattingOptions?: IStringificationParams, ruleSet?: SyntaxRuleSet | typeof SyntaxRuleSet): Promise<string>;
}
