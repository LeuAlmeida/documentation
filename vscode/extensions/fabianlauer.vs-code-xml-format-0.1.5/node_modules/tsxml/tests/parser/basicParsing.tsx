import * as test from '../../src/test';
import * as xml from '../../src/index';
import '../../src/test/jsx';


class EmptyParsing extends test.UnitTest {
	protected async performTest() {
		const ast = await xml.Parser.parseStringToAst('');
		await this.assert(ast instanceof xml.ast.DocumentNode, 'parser always generates a document ast node');
	}
}


class SimpleNode extends test.UnitTest {
	protected async performTest() {
		const ast = await xml.Parser.parseStringToAst(<alpha /> as any);
		await this.assert(ast.getChildAtIndex(0) instanceof xml.ast.Node, 'correct ast node type');
		await this.assert(ast.getChildAtIndex(0).tagName === 'alpha', 'ast node has correct tag name');
	}
}


class SimpleSelfClosingNodesInRoot extends test.UnitTest {
	protected async performTest() {
		const ast = await xml.Parser.parseStringToAst('<alpha /><beta />');
		await this.assert(ast.getChildAtIndex(0) instanceof xml.ast.SelfClosingNode, 'first ast node has correct ast node type');
		await this.assert(ast.getChildAtIndex(0).tagName === 'alpha', 'first ast node has correct tag name');
		await this.assert(ast.getChildAtIndex(1) instanceof xml.ast.SelfClosingNode, 'second ast node has correct ast node type');
		await this.assert(ast.getChildAtIndex(1).tagName === 'beta', 'second ast node has correct tag name');
	}
}


class SimpleNodeWithNumberInTagName extends test.UnitTest {
	protected async performTest() {
		const ast = await xml.Parser.parseStringToAst(<alpha123 /> as any);
		await this.assert(ast.getChildAtIndex(0) instanceof xml.ast.SelfClosingNode, 'correct ast node type');
		await this.assert(ast.getChildAtIndex(0).tagName === 'alpha123', 'ast node has correct tag name');
	}
}


class SimpleNodeWithNumericTagName extends test.UnitTest {
	protected async performTest() {
		const ast = await xml.Parser.parseStringToAst('<123 />');
		await this.assert(ast.getChildAtIndex(0) instanceof xml.ast.Node, 'correct ast node type');
		await this.assert(ast.getChildAtIndex(0).tagName === '123', 'ast node has correct tag name');
	}
}


class SimpleNodeTagNameStartingWithNumber extends test.UnitTest {
	protected async performTest() {
		const ast = await xml.Parser.parseStringToAst('<123alpha />');
		await this.assert(ast.getChildAtIndex(0) instanceof xml.ast.Node, 'correct ast node type');
		await this.assert(ast.getChildAtIndex(0).tagName === '123alpha', 'ast node has correct tag name');
	}
}


class SimpleNodeWithUnderscoreInTagName extends test.UnitTest {
	protected async performTest() {
		const ast = await xml.Parser.parseStringToAst(<alpha_beta /> as any);
		await this.assert(ast.getChildAtIndex(0) instanceof xml.ast.SelfClosingNode, 'correct ast node type');
		await this.assert(ast.getChildAtIndex(0).tagName === 'alpha_beta', 'ast node has correct tag name');
	}
}


class SimpleNodeWithOnlyUnderscoresInTagName extends test.UnitTest {
	protected async performTest() {
		const ast = await xml.Parser.parseStringToAst(<__ /> as any);
		await this.assert(ast.getChildAtIndex(0) instanceof xml.ast.SelfClosingNode, 'correct ast node type');
		await this.assert(ast.getChildAtIndex(0).tagName === '__', 'ast node has correct tag name');
	}
}


class SimpleNodeTagNameStartingWithUnderscore extends test.UnitTest {
	protected async performTest() {
		const ast = await xml.Parser.parseStringToAst(<_abc /> as any);
		await this.assert(ast.getChildAtIndex(0) instanceof xml.ast.SelfClosingNode, 'correct ast node type');
		await this.assert(ast.getChildAtIndex(0).tagName === '_abc', 'ast node has correct tag name');
	}
}


class SimpleNodeWithHyphenInTagName extends test.UnitTest {
	protected async performTest() {
		const ast = await xml.Parser.parseStringToAst(<alpha-beta /> as any);
		await this.assert(ast.getChildAtIndex(0) instanceof xml.ast.SelfClosingNode, 'correct ast node type');
		await this.assert(ast.getChildAtIndex(0).tagName === 'alpha-beta', 'ast node has correct tag name');
	}
}


class SimpleNodeWithOnlyHyphensInTagName extends test.UnitTest {
	protected async performTest() {
		const ast = await xml.Parser.parseStringToAst('<-- />');
		await this.assert(ast.getChildAtIndex(0) instanceof xml.ast.SelfClosingNode, 'correct ast node type');
		await this.assert(ast.getChildAtIndex(0).tagName === '--', 'ast node has correct tag name');
	}
}


class SimpleNodeTagNameStartingWithHyphen extends test.UnitTest {
	protected async performTest() {
		const ast = await xml.Parser.parseStringToAst('<-abc />');
		await this.assert(ast.getChildAtIndex(0) instanceof xml.ast.SelfClosingNode, 'correct ast node type');
		await this.assert(ast.getChildAtIndex(0).tagName === '-abc', 'ast node has correct tag name');
	}
}


class SimpleNodeWithPeriodInTagName extends test.UnitTest {
	protected async performTest() {
		const ast = await xml.Parser.parseStringToAst('<alpha.beta />');
		await this.assert(ast.getChildAtIndex(0) instanceof xml.ast.SelfClosingNode, 'correct ast node type');
		await this.assert(ast.getChildAtIndex(0).tagName === 'alpha.beta', 'ast node has correct tag name');
	}
}


class SimpleNodeWithPeriodAtEndOfTagName extends test.UnitTest {
	protected async performTest() {
		const ast = await xml.Parser.parseStringToAst('<alpha. />');
		await this.assert(ast.getChildAtIndex(0) instanceof xml.ast.SelfClosingNode, 'correct ast node type');
		await this.assert(ast.getChildAtIndex(0).tagName === 'alpha.', 'ast node has correct tag name');
	}
}


class SimpleNodeWithNamespacePrefix extends test.UnitTest {
	protected async performTest() {
		const ast = await xml.Parser.parseStringToAst('<test:alpha />');
		await this.assert(ast.getChildAtIndex(0) instanceof xml.ast.SelfClosingNode, 'correct ast node type');
		await this.assert(ast.getChildAtIndex(0).namespacePrefix === 'test', 'ast node has correct namespace prefix');
		await this.assert(ast.getChildAtIndex(0).tagName === 'alpha', `ast node has correct tag name, got ${ast.getChildAtIndex(0).tagName}`);
	}
}


class SimpleContainerNode extends test.UnitTest {
	protected async performTest() {
		const ast = await xml.Parser.parseStringToAst('<alpha></alpha>');
		await this.assert(ast.getChildAtIndex(0) instanceof xml.ast.ContainerNode, 'correct ast node type');
		await this.assert(ast.getChildAtIndex(0).tagName === 'alpha', `ast node has correct tag name, got ${ast.getChildAtIndex(0).tagName}`);
	}
}


class SimpleContainerNodeWithAttribute extends test.UnitTest {
	protected async performTest() {
		const ast = await xml.Parser.parseStringToAst('<alpha foo="bar"></alpha>');
		await this.assert(ast.getChildAtIndex(0) instanceof xml.ast.ContainerNode, 'correct ast node type');
		await this.assert(ast.getChildAtIndex(0).tagName === 'alpha', `ast node has correct tag name, got ${ast.getChildAtIndex(0).tagName}`);
		await this.assert(JSON.stringify(ast.getChildAtIndex(0).getAllAttributeNames()) === JSON.stringify([
			'foo'
		]), `are all attribute names parsed and are there no excess attributes? (got ${JSON.stringify(ast.getChildAtIndex(0).getAllAttributeNames())})`);
		await this.assert(ast.getChildAtIndex(0).getAttribute('foo') === 'bar', 'test first attribute value');
	}
}


class SimpleContainerNodeWithNamespacePrefix extends test.UnitTest {
	protected async performTest() {
		const ast = await xml.Parser.parseStringToAst('<test:alpha></test:alpha>');
		await this.assert(ast.getChildAtIndex(0) instanceof xml.ast.ContainerNode, 'correct ast node type');
		await this.assert(ast.getChildAtIndex(0).namespacePrefix === 'test', 'ast node has correct namespace prefix');
		await this.assert(ast.getChildAtIndex(0).tagName === 'alpha', `ast node has correct tag name, got ${ast.getChildAtIndex(0).tagName}`);
	}
}


class SimpleNodeWithIllegalDoubleNamespacePrefix extends test.UnitTest {
	protected async performTest() {
		var error: xml.SyntaxError;
		try {
			const ast = await xml.Parser.parseStringToAst('<test:alpha:beta />');
		} catch(err) {
			error = err;
		}
		await this.assert(typeof error !== undefined, 'syntax error was raised');
		await this.assert(error instanceof xml.SyntaxError, 'error is of type `SyntaxError`');
		await this.assert(error.getErrorCode() === xml.SyntaxErrorCode.IllegalNamespacePrefix, `error has correct code, got ${xml.SyntaxError.getSyntaxErrorCodeName(error.getErrorCode())}`);
	}
}


class SimpleNodeWithNamespacePrefixAndMissingTagName extends test.UnitTest {
	protected async performTest() {
		var error: xml.SyntaxError;
		try {
			const ast = await xml.Parser.parseStringToAst('<test: />');
		} catch(err) {
			error = err;
		}
		await this.assert(typeof error !== undefined, 'syntax error was raised');
		await this.assert(error instanceof xml.SyntaxError, 'error is of type `SyntaxError`');
		await this.assert(error.getErrorCode() === xml.SyntaxErrorCode.MissingTagNameAfterNamespacePrefix, `error has correct code, got ${xml.SyntaxError.getSyntaxErrorCodeName(error.getErrorCode())}`);
	}
}


class SimpleCommentNode extends test.UnitTest {
	protected async performTest() {
		const content = 'some comment content with 123 numbers and a\nline break',
			  ast = await xml.Parser.parseStringToAst(`<!--${content}-->`);
		await this.assert(ast.getChildAtIndex(0) instanceof xml.ast.CommentNode, 'correct ast node type');
		await this.assert((ast.getChildAtIndex(0) as xml.ast.CommentNode).content === content, 'ast node has correct text content');
	}
}


class SimpleTextNode extends test.UnitTest {
	protected async performTest() {
		const content = 'some text content with 123 numbers and a\ttab and a line\nbreak',
			  ast = await xml.Parser.parseStringToAst(`${content}`);
		await this.assert(ast.getChildAtIndex(0) instanceof xml.ast.TextNode, 'correct ast node type');
		await this.assert((ast.getChildAtIndex(0) as xml.ast.TextNode).content === content, 'ast node has correct text content');
	}
}


class SimpleCDataSection extends test.UnitTest {
	protected async performTest() {
		const content = '<greeting>Hello, world!</greeting>',
			  ast = await xml.Parser.parseStringToAst(`<![CDATA[${content}]]>`);
		await this.assert(ast.getChildAtIndex(0) instanceof xml.ast.CDataSectionNode, 'correct ast node type');
		await this.assert((ast.getChildAtIndex(0) as xml.ast.CDataSectionNode).content === content, 'correct content');
	}
}


class SimpleDeclarationOpenerNode extends test.UnitTest {
	protected async performTest() {
		const tagName = 'test',
			  ast = await xml.Parser.parseStringToAst(`<!${tagName}>`);
		await this.assert(ast.getChildAtIndex(0) instanceof xml.ast.DeclarationOpenerNode, 'correct ast node type');
		await this.assert(ast.getChildAtIndex(0).tagName === tagName, 'correct tag name');
	}
}


class SimpleDeclarationOpenerNode1 extends test.UnitTest {
	protected async performTest() {
		const tagName = 'DOCTYPE',
			  ast = await xml.Parser.parseStringToAst(`<!${tagName} html>`);
		await this.assert(ast.getChildAtIndex(0) instanceof xml.ast.DeclarationOpenerNode, 'correct ast node type');
		await this.assert(ast.getChildAtIndex(0).tagName === tagName, 'correct tag name');
	}
}


class SimpleDeclarationOpenerNodeWithSystemLiteral extends test.UnitTest {
	protected async performTest() {
		const tagName = 'DOCTYPE',
			  ast = await xml.Parser.parseStringToAst(`<!${tagName} "test.dtd">`);
		const mdoNode = ast.getChildAtIndex(0) as xml.ast.DeclarationOpenerNode;
		await this.assert(mdoNode instanceof xml.ast.DeclarationOpenerNode, 'correct ast node type');
		await this.assert(mdoNode.tagName === tagName, 'correct tag name');
		await this.assert(mdoNode.getNumberOfSystemLiterals() === 1, 'correct amount of system literals');
		await this.assert(mdoNode.getSystemLiteralAtIndex(0) === 'test.dtd', 'correct value of first system literal');
	}
}


class SimpleDeclarationOpenerNodeWithSystemLiterals extends test.UnitTest {
	protected async performTest() {
		const tagName = 'DOCTYPE',
			  ast = await xml.Parser.parseStringToAst(`<!${tagName} "literal one" "literal two">`);
		const mdoNode = ast.getChildAtIndex(0) as xml.ast.DeclarationOpenerNode;
		await this.assert(mdoNode instanceof xml.ast.DeclarationOpenerNode, 'correct ast node type');
		await this.assert(mdoNode.tagName === tagName, 'correct tag name');
		await this.assert(mdoNode.getNumberOfSystemLiterals() === 2, 'correct amount of system literals');
		await this.assert(mdoNode.getSystemLiteralAtIndex(0) === 'literal one', 'correct value of first system literal');
		await this.assert(mdoNode.getSystemLiteralAtIndex(1) === 'literal two', 'correct value of second system literal');
	}
}


class SimpleDeclarationOpenerNodeWithSystemLiteralAndAttributes extends test.UnitTest {
	protected async performTest() {
		const tagName = 'DOCTYPE',
			  ast = await xml.Parser.parseStringToAst(`<!${tagName} html="true" "test.dtd" foo="bar">`);
		const mdoNode = ast.getChildAtIndex(0) as xml.ast.DeclarationOpenerNode;
		await this.assert(mdoNode instanceof xml.ast.DeclarationOpenerNode, 'correct ast node type');
		await this.assert(mdoNode.tagName === tagName, 'correct tag name');
		await this.assert(JSON.stringify(ast.getChildAtIndex(0).getAllAttributeNames()) === JSON.stringify([
			'html', 'foo'
		]), `are all attribute names parsed and are there no excess attributes? (got ${JSON.stringify(ast.getChildAtIndex(0).getAllAttributeNames())})`);
		await this.assert(ast.getChildAtIndex(0).getAttribute('html') === 'true', 'test first attribute value');
		await this.assert(ast.getChildAtIndex(0).getAttribute('foo') === 'bar', 'test second attribute value');
		await this.assert(mdoNode.getNumberOfSystemLiterals() === 1, 'correct amount of system literals');
		await this.assert(mdoNode.getSystemLiteralAtIndex(0) === 'test.dtd', `correct value of first system literal, got: ${mdoNode.getSystemLiteralAtIndex(0)}`);
	}
}


class SimpleDeclarationOpenerNodeWithSystemLiteralAndEmptyAttributes extends test.UnitTest {
	protected async performTest() {
		const tagName = 'DOCTYPE',
			  ast = await xml.Parser.parseStringToAst(`<!${tagName} html "test.dtd" foo>`);
		const mdoNode = ast.getChildAtIndex(0) as xml.ast.DeclarationOpenerNode;
		await this.assert(mdoNode instanceof xml.ast.DeclarationOpenerNode, 'correct ast node type');
		await this.assert(mdoNode.tagName === tagName, 'correct tag name');
		await this.assert(JSON.stringify(ast.getChildAtIndex(0).getAllAttributeNames()) === JSON.stringify([
			'html', 'foo'
		]), `are all attribute names parsed and are there no excess attributes? (got ${JSON.stringify(ast.getChildAtIndex(0).getAllAttributeNames())})`);
		await this.assert(ast.getChildAtIndex(0).getAttribute('html') === undefined, 'test first attribute value');
		await this.assert(ast.getChildAtIndex(0).getAttribute('foo') === undefined, 'test second attribute value');
		await this.assert(mdoNode.getNumberOfSystemLiterals() === 1, 'correct amount of system literals');
		await this.assert(mdoNode.getSystemLiteralAtIndex(0) === 'test.dtd', 'correct value of first system literal');
	}
}


class SimpleDeclarationOpenerNodeWithSystemLiteralsAndEmptyAttributes extends test.UnitTest {
	protected async performTest() {
		const tagName = 'DOCTYPE',
			  ast = await xml.Parser.parseStringToAst(`<!${tagName} "literal1.dtd" html "literal2.dtd" foo>`);
		const mdoNode = ast.getChildAtIndex(0) as xml.ast.DeclarationOpenerNode;
		await this.assert(mdoNode instanceof xml.ast.DeclarationOpenerNode, 'correct ast node type');
		await this.assert(mdoNode.tagName === tagName, 'correct tag name');
		await this.assert(JSON.stringify(ast.getChildAtIndex(0).getAllAttributeNames()) === JSON.stringify([
			'html', 'foo'
		]), `are all attribute names parsed and are there no excess attributes? (got ${JSON.stringify(ast.getChildAtIndex(0).getAllAttributeNames())})`);
		await this.assert(ast.getChildAtIndex(0).getAttribute('html') === undefined, 'test first attribute value');
		await this.assert(ast.getChildAtIndex(0).getAttribute('foo') === undefined, 'test second attribute value');
		await this.assert(mdoNode.getNumberOfSystemLiterals() === 2, 'correct amount of system literals');
		await this.assert(mdoNode.getSystemLiteralAtIndex(0) === 'literal1.dtd', `correct value of first system literal, got ${mdoNode.getSystemLiteralAtIndex(0)}`);
		await this.assert(mdoNode.getSystemLiteralAtIndex(1) === 'literal2.dtd', `correct value of second system literal, got ${mdoNode.getSystemLiteralAtIndex(1)}`);
	}
}


class SimpleDeclarationOpenerNodeWithComplexSystemLiteralsAndEmptyAttributes extends test.UnitTest {
	protected async performTest() {
		const ast = await xml.Parser.parseStringToAst(`<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">`);
		const mdoNode = ast.getChildAtIndex(0) as xml.ast.DeclarationOpenerNode;
		await this.assert(mdoNode instanceof xml.ast.DeclarationOpenerNode, 'correct ast node type');
		await this.assert(mdoNode.tagName === 'DOCTYPE', 'correct tag name');
		await this.assert(JSON.stringify(ast.getChildAtIndex(0).getAllAttributeNames()) === JSON.stringify([
			'plist', 'PUBLIC'
		]), `are all attribute names parsed and are there no excess attributes? (got ${JSON.stringify(ast.getChildAtIndex(0).getAllAttributeNames())})`);
		await this.assert(ast.getChildAtIndex(0).getAttribute('plist') === undefined, 'test first attribute value');
		await this.assert(ast.getChildAtIndex(0).getAttribute('PUBLIC') === undefined, 'test second attribute value');
		await this.assert(mdoNode.getNumberOfSystemLiterals() === 2, 'correct amount of system literals');
		await this.assert(mdoNode.getSystemLiteralAtIndex(0) === '-//Apple//DTD PLIST 1.0//EN', `correct value of first system literal, got ${mdoNode.getSystemLiteralAtIndex(0)}`);
		await this.assert(mdoNode.getSystemLiteralAtIndex(1) === 'http://www.apple.com/DTDs/PropertyList-1.0.dtd', `correct value of second system literal, got ${mdoNode.getSystemLiteralAtIndex(1)}`);
	}
}


class SimpleProcessingInstructionNode extends test.UnitTest {
	protected async performTest() {
		const tagName = 'svg',
			  ast = await xml.Parser.parseStringToAst(`<?${tagName}?>`);
		await this.assert(ast.getChildAtIndex(0) instanceof xml.ast.ProcessingInstructionNode, 'correct ast node type');
		await this.assert(ast.getChildAtIndex(0).tagName === tagName, 'correct tag name');
	}
}


class SimpleProcessingInstructionNodeWithMissingQuestionMarkAtEnd extends test.UnitTest {
	protected async performTest() {
		const tagName = 'svg',
			  ast = await xml.Parser.parseStringToAst(`<?${tagName}>`);
		await this.assert(ast.getChildAtIndex(0) instanceof xml.ast.ProcessingInstructionNode, 'correct ast node type');
		await this.assert(ast.getChildAtIndex(0).tagName === tagName, 'correct tag name');
	}
}


class SimpleProcessingInstructionNodeWithAttribute extends test.UnitTest {
	protected async performTest() {
		const tagName = 'svg',
			  ast = await xml.Parser.parseStringToAst(`<?${tagName} alpha="beta" ?>`);
		await this.assert(ast.getChildAtIndex(0) instanceof xml.ast.ProcessingInstructionNode, 'correct ast node type');
		await this.assert(ast.getChildAtIndex(0).tagName === tagName, 'correct tag name');
		await this.assert(JSON.stringify(ast.getChildAtIndex(0).getAllAttributeNames()) === JSON.stringify([
			'alpha'
		]), `are all attribute names parsed and are there no excess attributes? (got ${JSON.stringify(ast.getChildAtIndex(0).getAllAttributeNames())})`);
		await this.assert(ast.getChildAtIndex(0).getAttribute('alpha') === 'beta', 'test attribute value');
	}
}


class SimpleProcessingInstructionNodeWithAttributeAndMissingQuestionMarkAtEnd extends test.UnitTest {
	protected async performTest() {
		const tagName = 'svg',
			  ast = await xml.Parser.parseStringToAst(`<?${tagName}>`);
		await this.assert(ast.getChildAtIndex(0) instanceof xml.ast.ProcessingInstructionNode, 'correct ast node type');
		await this.assert(ast.getChildAtIndex(0).tagName === tagName, 'correct tag name');
	}
}


class SimpleProcessingInstructionNodeWithAttributeAndNoSpaceAtEnd extends test.UnitTest {
	protected async performTest() {
		const tagName = 'svg',
			  ast = await xml.Parser.parseStringToAst(`<?${tagName} alpha="beta" ?>`);
		await this.assert(ast.getChildAtIndex(0) instanceof xml.ast.ProcessingInstructionNode, 'correct ast node type');
		await this.assert(ast.getChildAtIndex(0).tagName === tagName, 'correct tag name');
		await this.assert(JSON.stringify(ast.getChildAtIndex(0).getAllAttributeNames()) === JSON.stringify([
			'alpha'
		]), `are all attribute names parsed and are there no excess attributes? (got ${JSON.stringify(ast.getChildAtIndex(0).getAllAttributeNames())})`);
		await this.assert(ast.getChildAtIndex(0).getAttribute('alpha') === 'beta', 'test attribute value');
	}
}


class SimpleProcessingInstructionNodeWithEmptyAttribute extends test.UnitTest {
	protected async performTest() {
		const tagName = 'svg',
			  ast = await xml.Parser.parseStringToAst(`<?${tagName} alpha= ?>`);
		await this.assert(ast.getChildAtIndex(0) instanceof xml.ast.ProcessingInstructionNode, 'correct ast node type');
		await this.assert(ast.getChildAtIndex(0).tagName === tagName, 'correct tag name');
		await this.assert(JSON.stringify(ast.getChildAtIndex(0).getAllAttributeNames()) === JSON.stringify([
			'alpha'
		]), `are all attribute names parsed and are there no excess attributes? (got ${JSON.stringify(ast.getChildAtIndex(0).getAllAttributeNames())})`);
		await this.assert(ast.getChildAtIndex(0).getAttribute('alpha') === undefined, 'test attribute value');
	}
}


class SimpleNodeWithAttributes extends test.UnitTest {
	protected async performTest() {
		const ast = await xml.Parser.parseStringToAst(<alpha fibo="nacci" foo="bar" PI="3.14" /> as any);
		await this.assert(JSON.stringify(ast.getChildAtIndex(0).getAllAttributeNames()) === JSON.stringify([
			'fibo', 'foo', 'PI'
		]), `are all attribute names parsed and are there no excess attributes? (got ${JSON.stringify(ast.getChildAtIndex(0).getAllAttributeNames())})`);
		await this.assert(ast.getChildAtIndex(0).getAttribute('fibo') === 'nacci', 'test first attribute value');
		await this.assert(ast.getChildAtIndex(0).getAttribute('foo') === 'bar', 'test second attribute value');
		await this.assert(ast.getChildAtIndex(0).getAttribute('PI') === '3.14', 'test third attribute value');
	}
}


class SimpleVoidNodeWithAttributes extends test.UnitTest {
	protected async performTest() {
		const ast = await xml.Parser.parseStringToAst('<meta http-equiv="Content-Type" content="text/html; charset=utf-8">');
		await this.assert(JSON.stringify(ast.getChildAtIndex(0).getAllAttributeNames()) === JSON.stringify([
			'http-equiv', 'content'
		]), `are all attribute names parsed and are there no excess attributes? (got ${JSON.stringify(ast.getChildAtIndex(0).getAllAttributeNames())})`);
		await this.assert(ast.getChildAtIndex(0).getAttribute('http-equiv') === 'Content-Type', 'test value of attribute with hyphen');
		await this.assert(ast.getChildAtIndex(0).getAttribute('content') === 'text/html; charset=utf-8', 'test second attribute value');
	}
}


class SimpleNodeWithNamespacedAttributes extends test.UnitTest {
	protected async performTest() {
		const ast = await xml.Parser.parseStringToAst('<alpha a:fibo="nacci" b:foo="bar" math:PI="3.14" />');
		await this.assert(JSON.stringify(ast.getChildAtIndex(0).getAllAttributeNames()) === JSON.stringify([
			'a:fibo', 'b:foo', 'math:PI'
		]), `are all attribute names parsed and are there no excess attributes? (got ${JSON.stringify(ast.getChildAtIndex(0).getAllAttributeNames())})`);
		await this.assert(ast.getChildAtIndex(0).getAttribute('a:fibo') === 'nacci', 'test first attribute value');
		await this.assert(ast.getChildAtIndex(0).getAttribute('b:foo') === 'bar', 'test second attribute value');
		await this.assert(ast.getChildAtIndex(0).getAttribute('math:PI') === '3.14', 'test third attribute value');
	}
}


class SimpleNodeWithEmptyNamespacedAttribute extends test.UnitTest {
	protected async performTest() {
		const ast = await xml.Parser.parseStringToAst('<alpha a:fibo />');
		await this.assert(JSON.stringify(ast.getChildAtIndex(0).getAllAttributeNames()) === JSON.stringify([
			'a:fibo'
		]), `are all attribute names parsed and are there no excess attributes? (got ${JSON.stringify(ast.getChildAtIndex(0).getAllAttributeNames())})`);
		await this.assert(ast.getChildAtIndex(0).getAttribute('a:fibo') === undefined, 'test first attribute value');
	}
}


class SimpleNodeWithUnquotedNamespacedAttribute extends test.UnitTest {
	protected async performTest() {
		const ast = await xml.Parser.parseStringToAst('<alpha a:fibo=nacci />');
		await this.assert(JSON.stringify(ast.getChildAtIndex(0).getAllAttributeNames()) === JSON.stringify([
			'a:fibo'
		]), `are all attribute names parsed and are there no excess attributes? (got ${JSON.stringify(ast.getChildAtIndex(0).getAllAttributeNames())})`);
		await this.assert(ast.getChildAtIndex(0).getAttribute('a:fibo') === 'nacci', 'test first attribute value');
	}
}


class SimpleNodeWithEmptyAttribute extends test.UnitTest {
	protected async performTest() {
		const ast = await xml.Parser.parseStringToAst('<alpha fibo />');
		await this.assert(JSON.stringify(ast.getChildAtIndex(0).getAllAttributeNames()) === JSON.stringify([
			'fibo'
		]), `are all attribute names parsed and are there no excess attributes? (got ${JSON.stringify(ast.getChildAtIndex(0).getAllAttributeNames())})`);
		const attrValue = ast.getChildAtIndex(0).getAttribute('fibo');
		await this.assert(attrValue === undefined, `test enpty attribute value, got (type ${typeof attrValue}): ${attrValue}`);
	}
}


class SimpleNodeWithEmptyAndNonEmptyAttributes extends test.UnitTest {
	protected async performTest() {
		const ast = await xml.Parser.parseStringToAst('<alpha foo="bar" fibo delta="gamma" />');
		await this.assert(JSON.stringify(ast.getChildAtIndex(0).getAllAttributeNames()) === JSON.stringify([
			'foo', 'fibo', 'delta'
		]), `are all attribute names parsed and are there no excess attributes? (got ${JSON.stringify(ast.getChildAtIndex(0).getAllAttributeNames())})`);
		await this.assert(ast.getChildAtIndex(0).getAttribute('foo') === 'bar', 'test first non-empty attribute value');
		const attrValue = ast.getChildAtIndex(0).getAttribute('fibo');
		await this.assert(attrValue === undefined, `test enpty attribute value, got (type ${typeof attrValue}): ${attrValue}`);
		await this.assert(ast.getChildAtIndex(0).getAttribute('delta') === 'gamma', 'test second non-empty attribute value');
	}
}


class SimpleNodeWithUnquotedAlphabeticAttribute extends test.UnitTest {
	protected async performTest() {
		const ast = await xml.Parser.parseStringToAst('<alpha foo=bar />');
		await this.assert(JSON.stringify(ast.getChildAtIndex(0).getAllAttributeNames()) === JSON.stringify([
			'foo'
		]), `are all attribute names parsed and are there no excess attributes? (got ${JSON.stringify(ast.getChildAtIndex(0).getAllAttributeNames())})`);
		await this.assert(ast.getChildAtIndex(0).getAttribute('foo') === 'bar', 'test first unquoted attribute value');
	}
}


class SimpleNodeWithQuotedAndUnquotedAlphabeticAttributes extends test.UnitTest {
	protected async performTest() {
		const ast = await xml.Parser.parseStringToAst('<alpha foo=bar fibo="nacci" />');
		await this.assert(JSON.stringify(ast.getChildAtIndex(0).getAllAttributeNames()) === JSON.stringify([
			'foo', 'fibo'
		]), `are all attribute names parsed and are there no excess attributes? (got ${JSON.stringify(ast.getChildAtIndex(0).getAllAttributeNames())})`);
		await this.assert(ast.getChildAtIndex(0).getAttribute('foo') === 'bar', 'test unquoted attribute value');
		await this.assert(ast.getChildAtIndex(0).getAttribute('fibo') === 'nacci', 'test quoted attribute value');
	}
}


class SimpleNodeWithQuotedAndUnquotedAlphabeticAttributes1 extends test.UnitTest {
	protected async performTest() {
		const ast = await xml.Parser.parseStringToAst('<alpha foo= bar fibo="nacci" />');
		await this.assert(JSON.stringify(ast.getChildAtIndex(0).getAllAttributeNames()) === JSON.stringify([
			'foo', 'fibo'
		]), `are all attribute names parsed and are there no excess attributes? (got ${JSON.stringify(ast.getChildAtIndex(0).getAllAttributeNames())})`);
		await this.assert(ast.getChildAtIndex(0).getAttribute('foo') === 'bar', 'test unquoted attribute value');
		await this.assert(ast.getChildAtIndex(0).getAttribute('fibo') === 'nacci', 'test quoted attribute value');
	}
}


class SimpleNodeWithQuotedAndUnquotedAlphabeticAttributes2 extends test.UnitTest {
	protected async performTest() {
		const ast = await xml.Parser.parseStringToAst('<alpha foo= bar = />');
		await this.assert(JSON.stringify(ast.getChildAtIndex(0).getAllAttributeNames()) === JSON.stringify([
			'foo', 'bar'
		]), `are all attribute names parsed and are there no excess attributes? (got ${JSON.stringify(ast.getChildAtIndex(0).getAllAttributeNames())})`);
		await this.assert(ast.getChildAtIndex(0).getAttribute('foo') === undefined, 'test first attribute value');
		await this.assert(ast.getChildAtIndex(0).getAttribute('bar') === undefined, 'test second attribute value');
	}
}


class AttributeWithSingleQuotes extends test.UnitTest {
	protected async performTest() {
		const ast = await xml.Parser.parseStringToAst(`<test a='1'>`),
			  node = ast.getChildAtIndex(0);
		await this.assert(JSON.stringify(node.getAllAttributeNames()) === JSON.stringify([
			'a'
		]), `are all attribute names parsed and are there no excess attributes? (got ${JSON.stringify(node.getAllAttributeNames())})`);
		await this.assert(node.getAttribute('a') === '1', `test first attribute value`);
	}
}


class AttributesWithEscapedQuotes extends test.UnitTest {
	protected async performTest() {
		const ast = await xml.Parser.parseStringToAst(`<test a="1&quot;2" b="1&apos;2" c='1&quot;2' d='1&apos;2'>`),
			  node = ast.getChildAtIndex(0);
		await this.assert(JSON.stringify(node.getAllAttributeNames()) === JSON.stringify([
			'a', 'b', 'c', 'd'
		]), `are all attribute names parsed and are there no excess attributes? (got ${JSON.stringify(node.getAllAttributeNames())})`);
		await this.assert(node.getAttribute('a') === '1&quot;2', `test escaped double quote in double quoted attribute value, got: ${node.getAttribute('a')}`);
		await this.assert(node.getAttribute('b') === '1&apos;2', `test escaped single quote in double quoted attribute value, got: ${node.getAttribute('b')}`);
		await this.assert(node.getAttribute('c') === '1&quot;2', `test escaped double quote in single quoted attribute value, got: ${node.getAttribute('a')}`);
		await this.assert(node.getAttribute('d') === '1&apos;2', `test escaped single quote in single quoted attribute value, got: ${node.getAttribute('b')}`);
	}
}


class AttributeWithBackslashes extends test.UnitTest {
	protected async performTest() {
		const attrValue = 'C:\\temp\\',
			  ast = await xml.Parser.parseStringToAst(`<path value="${attrValue}" />`);
		await this.assert(JSON.stringify(ast.getChildAtIndex(0).getAllAttributeNames()) === JSON.stringify([
			'value'
		]), `are all attribute names parsed and are there no excess attributes? (got ${JSON.stringify(ast.getChildAtIndex(0).getAllAttributeNames())})`);
		await this.assert(ast.getChildAtIndex(0).getAttribute('value') === attrValue, `test attribute value, got: ${ast.getChildAtIndex(0).getAttribute('value')}`);
	}
}


@TestRunner.testName('Basic Parsing')
export class TestRunner extends test.TestRunner {
	constructor() {
		super();
		this.add(
			new EmptyParsing(),
			new SimpleNode(),
			new SimpleSelfClosingNodesInRoot(),
			new SimpleNodeWithNumberInTagName(),
			new SimpleNodeWithNumericTagName(),
			new SimpleNodeTagNameStartingWithNumber(),
			new SimpleNodeWithUnderscoreInTagName(),
			new SimpleNodeWithOnlyUnderscoresInTagName(),
			new SimpleNodeTagNameStartingWithUnderscore(),
			new SimpleNodeWithHyphenInTagName(),
			new SimpleNodeWithOnlyHyphensInTagName(),
			new SimpleNodeTagNameStartingWithHyphen(),
			new SimpleNodeWithPeriodInTagName(),
			new SimpleNodeWithPeriodAtEndOfTagName(),
			new SimpleNodeWithNamespacePrefix(),
			new SimpleContainerNode(),
			new SimpleContainerNodeWithAttribute(),
			new SimpleContainerNodeWithNamespacePrefix(),
			new SimpleNodeWithIllegalDoubleNamespacePrefix(),
			new SimpleNodeWithNamespacePrefixAndMissingTagName(),
			new SimpleCommentNode(),
			new SimpleTextNode(),
			new SimpleCDataSection(),
			new SimpleDeclarationOpenerNode(),
			new SimpleDeclarationOpenerNode1(),
			new SimpleDeclarationOpenerNodeWithSystemLiteral(),
			new SimpleDeclarationOpenerNodeWithSystemLiterals(),
			new SimpleDeclarationOpenerNodeWithSystemLiteralAndAttributes(),
			new SimpleDeclarationOpenerNodeWithSystemLiteralAndEmptyAttributes(),
			new SimpleDeclarationOpenerNodeWithSystemLiteralsAndEmptyAttributes(),
			new SimpleDeclarationOpenerNodeWithComplexSystemLiteralsAndEmptyAttributes(),
			new SimpleProcessingInstructionNode(),
			new SimpleProcessingInstructionNodeWithMissingQuestionMarkAtEnd(),
			new SimpleProcessingInstructionNodeWithAttribute(),
			new SimpleProcessingInstructionNodeWithAttributeAndMissingQuestionMarkAtEnd(),
			new SimpleProcessingInstructionNodeWithAttributeAndNoSpaceAtEnd(),
			new SimpleProcessingInstructionNodeWithEmptyAttribute(),
			new SimpleNodeWithAttributes(),
			new SimpleVoidNodeWithAttributes(),
			new SimpleNodeWithNamespacedAttributes(),
			new SimpleNodeWithEmptyNamespacedAttribute(),
			new SimpleNodeWithEmptyAttribute(),
			//new SimpleNodeWithUnquotedNamespacedAttribute(),
			new SimpleNodeWithEmptyAndNonEmptyAttributes(),
			//new SimpleNodeWithUnquotedAlphabeticAttribute(),
			//new SimpleNodeWithQuotedAndUnquotedAlphabeticAttributes(),
			//new SimpleNodeWithQuotedAndUnquotedAlphabeticAttributes1(),
			new SimpleNodeWithQuotedAndUnquotedAlphabeticAttributes2(),
			new AttributeWithSingleQuotes(),
			new AttributesWithEscapedQuotes(),
			new AttributeWithBackslashes()
		);
	}
}