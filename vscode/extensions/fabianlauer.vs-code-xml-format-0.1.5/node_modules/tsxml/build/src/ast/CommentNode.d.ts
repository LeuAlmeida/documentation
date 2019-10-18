import { TextNode } from './TextNode';
import { IStringificationParams } from './IStringificationParams';
export declare class CommentNode extends TextNode {
    /**
     * @override
     */
    protected stringify(params: IStringificationParams, nodeIndentDepth?: number): string;
    /**
     * @override
     */
    protected stringifyMultiLineContent(params: IStringificationParams, nodeIndentDepth?: number): string;
    /**
     * @override
     */
    protected stringifySingleLineContent(params: IStringificationParams, nodeIndentDepth?: number): string;
}
