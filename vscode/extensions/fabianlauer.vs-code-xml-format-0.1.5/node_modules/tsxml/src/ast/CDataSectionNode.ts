import {TextNode} from './TextNode';
import {IStringificationParams} from './IStringificationParams';

export class CDataSectionNode extends TextNode {
	/**
	 * @override
	 */
	protected stringify(params: IStringificationParams, nodeIndentDepth?: number): string {
		return `${CDataSectionNode.generateIndentString(params.indentChar, nodeIndentDepth)}<![CDATA[${this.stringifyContent(params, nodeIndentDepth)}]]>${params.newlineChar}`;
	}
	
	
	/**
	 * @override
	 */
	protected stringifyMultiLineContent(params: IStringificationParams, nodeIndentDepth?: number): string {
		if (/\n/.test(params.newlineChar)) {
			return '\n' + super.stringifyMultiLineContent(params, nodeIndentDepth) + CDataSectionNode.generateIndentString(params.indentChar, nodeIndentDepth);
		} else {
			return super.stringifyMultiLineContent(params, nodeIndentDepth);
		}
	}
	
	
	/**
	 * @override
	 */
	protected stringifySingleLineContent(params: IStringificationParams, nodeIndentDepth?: number): string {
		return (this.content || '').replace(/(\r?\n(\t*))+/g, ' ');
	}
}