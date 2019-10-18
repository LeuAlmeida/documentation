import * as xml from '../src/index';

(async () => {
	const parsedXml = await xml.Parser.parseStringToAst(`
<!DOCTYPE html>
<html>
	<head>
		<title>Sample HTML</title>
	</head>
	<body>
		<h1>Sample Heading</h1>
	</body>
</html>`);


	const htmlNode = <xml.ast.ContainerNode<xml.ast.Node>>parsedXml.getChildAtIndex(1),
		  bodyNode = <xml.ast.ContainerNode<xml.ast.Node>>htmlNode.getChildAtIndex(1);
	
	bodyNode.setAttribute('style', 'background: #aaa;');
	const ownTextNode = new xml.ast.TextNode();
	bodyNode.appendChild(ownTextNode);
	ownTextNode.content = `Some sample text.`;
	
	console.log(htmlNode.toFormattedString());
})();