import {Node} from './Node';
import {ContainerNode} from './ContainerNode';
import {IAttribute} from './IAttribute';
import {IStringificationParams} from './IStringificationParams';

export class DocumentNode extends ContainerNode<Node> {
	/**
	 * @override
	 */
	protected stringify(params: IStringificationParams, nodeIndentDepth?: number): string {
		nodeIndentDepth = Math.max(nodeIndentDepth || 0, 0);
		return this.stringifyAllChildNodes(params, nodeIndentDepth);
	}
	
	
	protected stringifyAllChildNodes(params: IStringificationParams, nodeIndentDepth?: number): string {
		var xml = '';
		this.forEachChildNode(childNode => {
			xml += this.stringifyChildNode(childNode, params, nodeIndentDepth);
		});
		return xml;
	}
}