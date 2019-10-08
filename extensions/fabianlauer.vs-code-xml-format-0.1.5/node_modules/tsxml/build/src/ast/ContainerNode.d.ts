import { Node } from './Node';
import { IStringificationParams } from './IStringificationParams';
/**
 * Base class for all nodes that may contain child elements.
 */
export declare class ContainerNode<TChildNode extends Node> extends Node {
    childNodes: TChildNode[];
    getNumberOfChildren(): number;
    getChildAtIndex(index: number): TChildNode;
    getIndexOfChild(child: TChildNode): number;
    hasChild(child: TChildNode): boolean;
    /**
     * @chainable
     */
    insertChildAt(child: TChildNode, index: number): this;
    /**
     * @chainable
     */
    removeChildAt(index: number): this;
    /**
     * @chainable
     */
    insertChildBefore(child: TChildNode, referenceChild: TChildNode): this;
    /**
     * @chainable
     */
    insertChildAfter(child: TChildNode, referenceChild: TChildNode): this;
    /**
     * @chainable
     */
    prependChild(child: TChildNode): this;
    /**
     * @chainable
     */
    appendChild(child: TChildNode): this;
    /**
     * @chainable
     */
    replaceChild(oldChild: TChildNode, newChild: TChildNode): this;
    forEachChildNode(fn: (childNode: TChildNode, index: number) => void): void;
    isSubtreeIdenticalTo(otherNode: ContainerNode<TChildNode>): boolean;
    /**
     * Checks whether a node is identical to another node by comparing tag names, attribute names and values and subtree.
     */
    isIdenticalTo(otherNode: ContainerNode<TChildNode>): boolean;
    /**
     * @override
     */
    protected stringify(params: IStringificationParams, nodeIndentDepth?: number): string;
    protected stringifyAllChildNodes(params: IStringificationParams, nodeIndentDepth?: number): string;
    protected stringifyChildNode(childNode: TChildNode, params: IStringificationParams, nodeIndentDepth?: number): string;
}
