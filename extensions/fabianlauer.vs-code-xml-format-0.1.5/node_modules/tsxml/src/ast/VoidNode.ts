import {Node} from './Node';
import {IStringificationParams} from './IStringificationParams';

export class VoidNode extends Node {
	/**
	 * @override
	 */
	protected stringify(params: IStringificationParams, nodeIndentDepth?: number): string {
		nodeIndentDepth = Math.max(nodeIndentDepth || 0, 0);
		return `${Node.generateIndentString(params.indentChar, nodeIndentDepth)}<${this.tagName}${this.stringifyAttributes(nodeIndentDepth)}>${params.newlineChar}`;
	}
}