import { IAttribute } from './IAttribute';
import { IStringificationParams } from './IStringificationParams';
import { ContainerNode } from './ContainerNode';
import { NodeFlags } from '../parser/NodeFlags';
/**
 * Base class for all nodes.
 */
export declare abstract class Node {
    constructor();
    /**
     * The default formatting options for stringification.
     */
    static readonly defaultStringificationParams: IStringificationParams;
    parserFlags: NodeFlags;
    namespacePrefix: string;
    tagName: string;
    readonly parentNode: ContainerNode<any>;
    getAllAttributeNames(): string[];
    getNumberOfAttributes(): number;
    hasAttribute(attrName: string): boolean;
    getAttribute<TValue>(attrName: string, namespaceName?: string): IAttribute<TValue>;
    /**
     * @chainable
     */
    setAttribute<TValue>(attrName: string, value: IAttribute<TValue>, namespaceName?: string): this;
    /**
     * @chainable
     */
    removeAttribute(attrName: string, namespaceName?: string): this;
    toFormattedString(stringificationParams?: IStringificationParams): string;
    toString(): string;
    isTagNameAndNamespaceIdenticalTo(otherNode: Node): boolean;
    isAttributeListIdenticalTo(otherNode: Node): boolean;
    /**
     * Checks whether a node is identical to another node by comparing tag names, attribute names and values.
     */
    isIdenticalTo(otherNode: Node): boolean;
    /**
     * Decorator.
     */
    static attributePropertyBinding(attributeName: string): (target: Node, propertyName: string) => void;
    getBoundAttributeNameForProperty(propertyName: string): string;
    getBoundPropertyNamesForAttribute(attributeName: string): string[];
    protected static joinAttributeNameWithNamespacePrefix(attrName: string, namespaceName: string): string;
    protected static changeParentNode(childNode: Node, newParentNode: ContainerNode<any>): void;
    protected static removeParentNode(childNode: Node): void;
    protected static generateIndentString(indentChar: string, indentDepth: number): string;
    protected stringify(params: IStringificationParams, nodeIndentDepth?: number): string;
    protected stringifyAttributes(nodeIndentDepth: number): string;
    protected stringifyAttribute(attrName: string, attrValue: any): string;
    private static mergeObjects<TObject>(baseObject, overlayObject);
    private addAttributeProxyProperty(propertyName, attrName);
    private applyAttributePropertyBindings();
    private applyAttributePropertyBinding(propertyName, attributeName);
    private attrPropertyBindings;
    private _parentNode;
    private attrList;
}
