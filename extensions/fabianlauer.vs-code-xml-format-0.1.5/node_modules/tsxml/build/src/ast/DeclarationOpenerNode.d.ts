import { Node } from './Node';
import { IAttribute } from './IAttribute';
import { IStringificationParams } from './IStringificationParams';
export declare class DeclarationOpenerNode extends Node {
    getNumberOfSystemLiterals(): number;
    getIndexOfSystemLiteral(literal: string): number;
    getSystemLiteralAtIndex(literalIndex: number): string;
    getAllSystemLiterals(): string[];
    hasSystemLiteral(literal: string): boolean;
    /**
     * @chainable
     */
    insertIntoSystemLiteralList(literal: string, index: number): this;
    /**
     * @chainable
     */
    prependToSystemLiteralList(literal: string): this;
    /**
     * @chainable
     */
    appendToSystemLiteralList(literal: string): this;
    /**
     * @chainable
     */
    removeSystemLiteralAtIndex(index: number): this;
    /**
     * @chainable
     */
    removeSystemLiteral(literal: string): this;
    /**
     * @chainable
     * @override
     */
    setAttribute<TValue>(attrName: string, value: IAttribute<TValue>, namespaceName?: string): this;
    /**
     * @chainable
     * @override
     */
    removeAttribute(attrName: string, namespaceName?: string): this;
    isSystemLiteralListIdenticalTo(otherNode: DeclarationOpenerNode): boolean;
    /**
     * Checks whether a node is identical to another node by comparing tag names, attribute names and values and content.
     * @override
     */
    isIdenticalTo(otherNode: DeclarationOpenerNode): boolean;
    /**
     * @override
     */
    protected stringify(params: IStringificationParams, nodeIndentDepth?: number): string;
    protected stringifyAttributesAndSystemLiterals(params: IStringificationParams, nodeIndentDepth?: number): string;
    private appendSystemLiteralIndexToOrderList(literalIndex);
    private removeSystemLiteralIndexFromOrderList(literalIndex);
    private appendAttributeToOrderList(attrNameWithNamespace);
    private removeAttributeFromOrderList(attrNameWithNamespace);
    private systemLiterals;
    private literalAndAttrOrder;
}
