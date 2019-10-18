import { Node } from './Node';
import { IStringificationParams } from './IStringificationParams';
export declare class ProcessingInstructionNode extends Node {
    /**
     * @override
     */
    protected stringify(params: IStringificationParams, nodeIndentDepth?: number): string;
}
