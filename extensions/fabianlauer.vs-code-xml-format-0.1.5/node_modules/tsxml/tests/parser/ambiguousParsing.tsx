/// Contains test cases for ambiguous (or, generally 'tricky' to parse) XML strings.

import * as test from '../../src/test';
import * as xml from '../../src/index';
import '../../src/test/jsx';


class OpenAngleBracketAsOnlyTextNodeContent extends test.UnitTest {
	protected async performTest() {
		const textContent = '<',
			  ast = await xml.Parser.parseStringToAst(`<a>${textContent}</a>`);
		const wrapperNode = ast.getChildAtIndex(0) as xml.ast.ContainerNode<xml.ast.TextNode>;
		await this.assert(wrapperNode instanceof xml.ast.ContainerNode, 'correct outer ast node type');
		await this.assert(wrapperNode.tagName === 'a', 'outer ast node has correct tag name');
		const textNode = wrapperNode.getChildAtIndex(0);
		await this.assert(textNode instanceof xml.ast.Node, 'text node exists');
		await this.assert(textNode instanceof xml.ast.TextNode, 'text node has correct ast node type');
		await this.assert(textNode.content === textContent, `text node has correct content, got (type ${typeof textNode.content}) '${textNode.content}'`);
	}
}


class OpenAngleBracketInTextNodeContent extends test.UnitTest {
	protected async performTest() {
		const textContent = '123<456',
			  ast = await xml.Parser.parseStringToAst(`<a>${textContent}</a>`);
		const wrapperNode = ast.getChildAtIndex(0) as xml.ast.ContainerNode<xml.ast.TextNode>;
		await this.assert(wrapperNode instanceof xml.ast.ContainerNode, 'correct outer ast node type');
		await this.assert(wrapperNode.tagName === 'a', 'outer ast node has correct tag name');
		const textNode = wrapperNode.getChildAtIndex(0);
		await this.assert(textNode instanceof xml.ast.Node, 'text node exists');
		await this.assert(textNode instanceof xml.ast.TextNode, 'text node has correct ast node type');
		await this.assert(textNode.content === textContent, `text node has correct content, got (type ${typeof textNode.content}) '${textNode.content}'`);
	}
}


class OpenAngleBracketInTextNodeContentInNestedNode extends test.UnitTest {
	protected async performTest() {
		const textContent = '123<456',
			  ast = await xml.Parser.parseStringToAst(`<a><b>${textContent}</b></a>`);
		const outerNode = ast.getChildAtIndex(0) as xml.ast.ContainerNode<xml.ast.ContainerNode<xml.ast.TextNode>>;
		await this.assert(outerNode instanceof xml.ast.ContainerNode, 'correct outer ast node type');
		await this.assert(outerNode.tagName === 'a', 'outer ast node has correct tag name');
		const wrapperNode = outerNode.getChildAtIndex(0);
		await this.assert(wrapperNode instanceof xml.ast.ContainerNode, 'correct wrapper ast node type');
		await this.assert(wrapperNode.tagName === 'b', 'wrapper ast node has correct tag name');
		const textNode = wrapperNode.getChildAtIndex(0);
		await this.assert(textNode instanceof xml.ast.Node, 'text node exists');
		await this.assert(textNode instanceof xml.ast.TextNode, 'text node has correct ast node type');
		await this.assert(textNode.content === textContent, `text node has correct content, got (type ${typeof textNode.content}) '${textNode.content}'`);
	}
}


class OpenAngleBracketInCommentNodeContent extends test.UnitTest {
	protected async performTest() {
		const textContent = '123<456',
			  ast = await xml.Parser.parseStringToAst(`<a><!--${textContent}--></a>`);
		const wrapperNode = ast.getChildAtIndex(0) as xml.ast.ContainerNode<xml.ast.CommentNode>;
		await this.assert(wrapperNode instanceof xml.ast.ContainerNode, 'correct outer ast node type');
		await this.assert(wrapperNode.tagName === 'a', 'outer ast node has correct tag name');
		const commentNode = wrapperNode.getChildAtIndex(0);
		await this.assert(commentNode instanceof xml.ast.Node, 'comment node exists');
		await this.assert(commentNode instanceof xml.ast.CommentNode, 'comment node has correct ast node type');
		await this.assert(commentNode.content === textContent, 'comment node has correct content');
	}
}


class OpenAngleBracketInCDataSectionNodeContent extends test.UnitTest {
	protected async performTest() {
		const textContent = '123<456',
			  ast = await xml.Parser.parseStringToAst(`<a><![CDATA[${textContent}]]></a>`);
		const wrapperNode = ast.getChildAtIndex(0) as xml.ast.ContainerNode<xml.ast.CDataSectionNode>;
		await this.assert(wrapperNode instanceof xml.ast.ContainerNode, 'correct outer ast node type');
		await this.assert(wrapperNode.tagName === 'a', 'outer ast node has correct tag name');
		const cdataNode = wrapperNode.getChildAtIndex(0);
		await this.assert(cdataNode instanceof xml.ast.Node, 'cdata node exists');
		await this.assert(cdataNode instanceof xml.ast.CDataSectionNode, 'cdata node has correct ast node type');
		await this.assert(cdataNode.content === textContent, 'cdata node has correct content');
	}
}


class OpenAngleBracketAsOnlyAttributeValue extends test.UnitTest {
	protected async performTest() {
		const attrValue = '<',
			  ast = await xml.Parser.parseStringToAst(`<a attr="${attrValue}"></a>`);
		const wrapperNode = ast.getChildAtIndex(0) as xml.ast.ContainerNode<xml.ast.CDataSectionNode>;
		await this.assert(wrapperNode instanceof xml.ast.ContainerNode, 'correct outer ast node type');
		await this.assert(wrapperNode.tagName === 'a', 'outer ast node has correct tag name');
		await this.assert(wrapperNode.hasAttribute('attr'), 'outer ast node has desired attribute');
		await this.assert(wrapperNode.getAttribute('attr') === attrValue, 'attribute value is correct');
	}
}


class OpenAngleBracketsAsOnlyAttributeValue extends test.UnitTest {
	protected async performTest() {
		const attrValue = '<<',
			  ast = await xml.Parser.parseStringToAst(`<a attr="${attrValue}"></a>`);
		const wrapperNode = ast.getChildAtIndex(0) as xml.ast.ContainerNode<xml.ast.CDataSectionNode>;
		await this.assert(wrapperNode instanceof xml.ast.ContainerNode, 'correct outer ast node type');
		await this.assert(wrapperNode.tagName === 'a', 'outer ast node has correct tag name');
		await this.assert(wrapperNode.hasAttribute('attr'), 'outer ast node has desired attribute');
		await this.assert(wrapperNode.getAttribute('attr') === attrValue, 'attribute value is correct');
	}
}


class OpenAngleBracketInAttributeValue extends test.UnitTest {
	protected async performTest() {
		const attrValue = 'abc<def',
			  ast = await xml.Parser.parseStringToAst(`<a attr="${attrValue}"></a>`);
		const wrapperNode = ast.getChildAtIndex(0) as xml.ast.ContainerNode<xml.ast.CDataSectionNode>;
		await this.assert(wrapperNode instanceof xml.ast.ContainerNode, 'correct outer ast node type');
		await this.assert(wrapperNode.tagName === 'a', 'outer ast node has correct tag name');
		await this.assert(wrapperNode.hasAttribute('attr'), 'outer ast node has desired attribute');
		await this.assert(wrapperNode.getAttribute('attr') === attrValue, 'attribute value is correct');
	}
}


class OpenAngleBracketsInAttributeValue extends test.UnitTest {
	protected async performTest() {
		const attrValue = 'abc<<de<f<',
			  ast = await xml.Parser.parseStringToAst(`<a attr="${attrValue}"></a>`);
		const wrapperNode = ast.getChildAtIndex(0) as xml.ast.ContainerNode<xml.ast.CDataSectionNode>;
		await this.assert(wrapperNode instanceof xml.ast.ContainerNode, 'correct outer ast node type');
		await this.assert(wrapperNode.tagName === 'a', 'outer ast node has correct tag name');
		await this.assert(wrapperNode.hasAttribute('attr'), 'outer ast node has desired attribute');
		await this.assert(wrapperNode.getAttribute('attr') === attrValue, 'attribute value is correct');
	}
}


@TestRunner.testName('Ambiguous Parsing')
export class TestRunner extends test.TestRunner {
	constructor() {
		super();
		this.add(
			new OpenAngleBracketAsOnlyTextNodeContent(),
			new OpenAngleBracketInTextNodeContent(),
			new OpenAngleBracketInTextNodeContentInNestedNode(),
			new OpenAngleBracketInCommentNodeContent(),
			new OpenAngleBracketInCDataSectionNodeContent(),
			new OpenAngleBracketAsOnlyAttributeValue(),
			new OpenAngleBracketsAsOnlyAttributeValue(),
			new OpenAngleBracketInAttributeValue(),
			new OpenAngleBracketsInAttributeValue()
		);
	}
}