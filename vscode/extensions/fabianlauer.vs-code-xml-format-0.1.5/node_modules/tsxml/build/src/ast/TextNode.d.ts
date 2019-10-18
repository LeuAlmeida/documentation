import { Node } from './Node';
import { IStringificationParams } from './IStringificationParams';
/**
 * Base class for all nodes that may contain child elements.
 */
export declare class TextNode extends Node {
    content: string;
    getContentLines(): string[];
    /**
     * Returns whether the text content contains line breaks.
     */
    isContentMultiLine(): boolean;
    isContentIdenticalTo(otherNode: TextNode): boolean;
    /**
     * Checks whether a node is identical to another node by comparing tag names, attribute names and values and content.
     */
    isIdenticalTo(otherNode: TextNode): boolean;
    protected static makeContentStringComparable(contentString: string): string;
    protected stringify(params: IStringificationParams, nodeIndentDepth?: number): string;
    protected stringifyContent(params: IStringificationParams, nodeIndentDepth?: number): string;
    protected stringifyMultiLineContent(params: IStringificationParams, nodeIndentDepth?: number): string;
    protected stringifySingleLineContent(params: IStringificationParams, nodeIndentDepth?: number): string;
}
