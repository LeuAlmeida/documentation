import {TagCloseMode} from '../TagCloseMode';
import {TagSyntaxRule} from '../TagSyntaxRule';
import {SyntaxRuleSet} from '../SyntaxRuleSet';

export class Html5 extends SyntaxRuleSet {
	public static get Loose() {
		return <typeof Html5>class Html5Loose extends Html5 {
			constructor() {
				super(true);
			}
		}
	}
	
	
	public static get Strict() {
		return <typeof Html5>class Html5Strict extends Html5 {
			constructor() {
				super(false);
			}
		}
	}
	
	
	constructor(allowVoidElementsToSelfClose?: boolean) {
		super();
		if (typeof allowVoidElementsToSelfClose === 'undefined') {
			allowVoidElementsToSelfClose = true;
		}
		// see https://www.w3.org/TR/html-markup/syntax.html#syntax-elements
		const voidTagSyntaxRule = TagSyntaxRule.createForTagNames(
			'area', 'base', 'br', 'col', 'command', 'embed', 'hr', 'img', 'input', 'keygen', 'link', 'meta', 'param', 'source', 'track', 'wbr'
		);
		if (allowVoidElementsToSelfClose) {
			voidTagSyntaxRule.setCloseMode(TagCloseMode.Void | TagCloseMode.SelfClose);
		} else {
			voidTagSyntaxRule.setCloseMode(TagCloseMode.Void);
		}
		this.addTagSyntaxRule(voidTagSyntaxRule);
	}
}