import * as xml from '../src/index';

class CustomNode extends xml.ast.SelfClosingNode {
	/**
	 * @override
	 */
	public tagName = 'customnode';
	
	@CustomNode.attributePropertyBinding('id')
	public identifier = `unique-identifier-` + Math.random().toString().replace(/\./, '');
}

const node = new CustomNode();

console.log(node.identifier, node.getAttribute('id')); // both log the random string generated in the class definition

node.identifier = 'my-custom-id';
console.log(node.identifier, node.getAttribute('id')); // both log `my-custom-id`

node.setAttribute('id', 'my-other-custom-id');
console.log(node.identifier, node.getAttribute('id')); // both log `my-other-custom-id`

// The following statement will log:
//    <customnode id="my-other-custom-id" />
// The attribute name in serialised XML is `id`, just as we set it in the decorator call.
console.log(node.toFormattedString());
