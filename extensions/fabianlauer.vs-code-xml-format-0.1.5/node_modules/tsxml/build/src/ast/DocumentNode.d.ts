import { Node } from './Node';
import { ContainerNode } from './ContainerNode';
import { IStringificationParams } from './IStringificationParams';
export declare class DocumentNode extends ContainerNode<Node> {
    /**
     * @override
     */
    protected stringify(params: IStringificationParams, nodeIndentDepth?: number): string;
    protected stringifyAllChildNodes(params: IStringificationParams, nodeIndentDepth?: number): string;
}
