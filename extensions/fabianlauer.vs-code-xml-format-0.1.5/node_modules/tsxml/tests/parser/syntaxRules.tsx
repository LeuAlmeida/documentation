/// Contains cases to test syntax rules and their effect on the parser.

import * as test from '../../src/test';
import * as xml from '../../src/index';
import '../../src/test/jsx';


class SimpleNestedVoidNode extends test.UnitTest {
	protected async performTest() {
		const parser = xml.Parser.createForXmlString('<head><meta></head>');
		parser.addTagSyntaxRule(xml.parser.TagSyntaxRule.createForTagName('meta')
														.setCloseMode(xml.parser.TagCloseMode.Void))
			  .parseComplete();
		const ast = parser.getAst();
		const wrapperNode = ast.getChildAtIndex(0) as xml.ast.ContainerNode<xml.ast.SelfClosingNode>;
		await this.assert(wrapperNode instanceof xml.ast.ContainerNode, 'correct outer ast node type');
		await this.assert(wrapperNode.tagName === 'head', 'outer ast node has correct tag name');
		const innerNode = wrapperNode.getChildAtIndex(0);
		await this.assert(innerNode instanceof xml.ast.VoidNode, 'correct inner ast node type');
		await this.assert(innerNode.tagName === 'meta', 'inner ast node has correct tag name');
	}
}


class Html5SimpleNestedVoidNode extends test.UnitTest {
	protected async performTest() {
		const ast = await xml.Parser.parseStringToAst('<head><meta></head>', xml.parser.ruleSet.Html5);
		const wrapperNode = ast.getChildAtIndex(0) as xml.ast.ContainerNode<xml.ast.SelfClosingNode>;
		await this.assert(wrapperNode instanceof xml.ast.ContainerNode, 'correct outer ast node type');
		await this.assert(wrapperNode.tagName === 'head', 'outer ast node has correct tag name');
		const innerNode = wrapperNode.getChildAtIndex(0);
		await this.assert(innerNode instanceof xml.ast.VoidNode, 'correct inner ast node type, got ${}');
		await this.assert(innerNode.tagName === 'meta', 'inner ast node has correct tag name');
	}
}


@TestRunner.testName('Syntax Rules')
export class TestRunner extends test.TestRunner {
	constructor() {
		super();
		this.add(
			new SimpleNestedVoidNode(),
			new Html5SimpleNestedVoidNode()
		);
	}
}