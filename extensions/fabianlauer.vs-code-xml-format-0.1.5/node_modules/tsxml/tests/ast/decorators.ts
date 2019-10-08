import * as test from '../../src/test';
import * as xml from '../../src/index';


class AttributePropertyBinding extends test.UnitTest {
	protected async performTest() {
		const attrName = 'testAttribute';
		let attrValue = 'test value';
		class SampleNode extends xml.ast.Node {
			@xml.ast.Node.attributePropertyBinding(attrName)
			public testProperty = attrValue;
		}
		const node = new SampleNode();
		await this.assert(node.testProperty === attrValue, 'property has correct value after definition');
		await this.assert(node.getAttribute(attrName) === attrValue, 'attribute has correct value after definition');
		await this.assert(node.getBoundAttributeNameForProperty('testProperty') === attrName, '`getBoundAttributeNameForProperty()` returns correct attribute name');
		await this.assert(JSON.stringify(node.getBoundPropertyNamesForAttribute(attrName)) === JSON.stringify(['testProperty']), '`getBoundPropertyNamesForAttribute()` returns correct property name array');
		attrValue = 'another test value';
		node.testProperty = attrValue;
		await this.assert(node.testProperty === attrValue, 'property has correct value after update via binding');
		await this.assert(node.getAttribute(attrName) === attrValue, 'attribute has correct value after update via binding');
		attrValue = 'yet another test value';
		node.setAttribute(attrName, attrValue);
		await this.assert(node.testProperty === attrValue, 'property has correct value after update via `setAttribute(...)`');
		await this.assert(node.getAttribute(attrName) === attrValue, 'attribute has correct value after update via `setAttribute(...)`');
	}
}


@TestRunner.testName('Decorators')
export class TestRunner extends test.TestRunner {
	constructor() {
		super();
		this.add(
			new AttributePropertyBinding()
		);
	}
}