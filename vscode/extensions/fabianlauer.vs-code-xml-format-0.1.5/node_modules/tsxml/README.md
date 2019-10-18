# tsxml

**A no-dependency XML parser with DOM-like AST and XML serialization for node.js and the browser.**

## Overview

tsxml is a small, *not (yet) spec compliant* XML library that contains a liberal parser, a syntax tree similar to, but not as complicated as, the DOM. The syntax tree can be used to build XML manually. It can serialize formatted and compact XML.

It supports all kinds of XML nodes, including comments, markup declaration openers (such as `<!DOCTYPE ...>`), processing instructions (`<?svg...`) and self closing (`<foo />`) and "void" (`<foo>`) nodes, meaning it's capable of parsing HTML and SVG, too.


## Is it used somewhere?

Yup, here: [vs-code-xml-format](https://github.com/FabianLauer/vs-code-xml-format).

## Status Quo

### Parser
The parser is:
- liberal in what it accepts

The parser is not (yet):
- incremental
- capable of streaming

At the moment the parser only processes complete XML strings at once, incremental parsing is not possible yet (which can be a performance issue with huge documents). **If you need incremental parsing and are comfortable with using streams, check out [sax-js](https://github.com/isaacs/sax-js)**.

### Schema Validation
Does not exist. At least not yet.

### Syntax Tree
The syntax tree can be built manually (see examples) or by the parser. It is similar to the DOM, but not quite as complex. It can be used to traverse (in fact, the parser uses AST nodes it creates to traverse while parsing) and to serialize XML.

To-Do-List:
- XPath support


### XML Serialization (converting objects to XML strings)
Syntax tree nodes support XML serialization with their `toString()` and `toFormattedString()` methods, for example:

	const document = xml.Compiler.parseStringToAst(`
		<foo><bar /></foo>
	`);
	/*
		The following 2 statements will log '<foo><bar /></foo>' 
	*/
	console.log(node.toString());
	console.log(node + '');
	/*
		The following statement will log:
			<foo>
				<bar />
			</foo> 
	*/
	node.toFormattedString();

Formatting can also be done in a somewhat more concise way:

	console.log(await xml.Compiler.formatXmlString('<foo><bar /></foo>'));
	/*
		...which will log:
			<foo>
				<bar />
			</foo> 
	*/

 

## Why build another XML parser, aren't there plenty already?
I see your point. There's plenty of good parsers around and most of them get the job done alright. What I wanted, however, is a tool that runs in every environment (browser, node.js, you name it), doesn't come with a myriad of dependencies (especially ones that run in node's C-space), that doesn't just ignore comments, MDOs and processing instructions (which are a huge no-no in some other libraries) and that, ideally, has a syntax tree that allows traversal similar to the DOM instead of just providing plain old objects. Oh, right, there should be a way to serialize XML as well.

If you don't need all of this, you might want to check out these:

## Alternatives
- [sax-js](https://github.com/isaacs/sax-js)
- [cheerio](https://github.com/cheeriojs/cheerio)
- [segmentio's xml-parser](https://github.com/segmentio/xml-parser)


## License
MIT. See LICENSE file.