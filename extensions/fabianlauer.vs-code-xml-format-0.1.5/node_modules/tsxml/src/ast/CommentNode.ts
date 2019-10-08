import {TextNode} from './TextNode';
import {IStringificationParams} from './IStringificationParams';

export class CommentNode extends TextNode {
	/**
	 * @override
	 */
	protected stringify(params: IStringificationParams, nodeIndentDepth?: number): string {
		return `${CommentNode.generateIndentString(params.indentChar, nodeIndentDepth)}<!--${this.stringifyContent(params, nodeIndentDepth)}-->${params.newlineChar}`;
	}
	
	
	/**
	 * @override
	 */
	protected stringifyMultiLineContent(params: IStringificationParams, nodeIndentDepth?: number): string {
		if (/\n/.test(params.newlineChar)) {
			return '\n' + super.stringifyMultiLineContent(params, nodeIndentDepth) + CommentNode.generateIndentString(params.indentChar, nodeIndentDepth);
		} else {
			return ' ' + super.stringifyMultiLineContent(params, nodeIndentDepth) + ' ';
		}
	}
	
	
	/**
	 * @override
	 */
	protected stringifySingleLineContent(params: IStringificationParams, nodeIndentDepth?: number): string {
		return ' ' + (this.content || '').trim().replace(/(\r?\n(\t*))+/g, ' ').trim() + ' ';
	}
}