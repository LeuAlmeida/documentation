/// Include this file to override default behaviour of React JSX.
/// When included, JSX tags will be converted to strings instantly, which is useful for writing tests:
///     const xmlString: string = <foo alpha={Math.round(1.435)}><bar /></foo> as any;
///     console.log(xmlSting); // will log '<foo alpha="1"><bar /></foo>'
/// Remember to cast JSX to `any` so TypeScript doesn't expect an `Element` instance.

/// <reference path="../../typings/node/node" />
/// <reference path="./react.custom.d.ts" />

var React: typeof __React;
React = React || {} as any;

if (typeof global === 'object' && global !== null) {
	(<any>global).React = React;
}

// This custom `createElement` function will actually return an XML unformatted string, not a `React.DOMElement`.
React.createElement = <any>(function<P>(tagname: string, attributes?: any, ...children: __React.ReactNode[]): string {
	var xml = `<${tagname}`;
	if (typeof attributes === 'object' && attributes !== null) {
		for (let attrName in attributes) {
			const attrValue = (attributes as any)[attrName];
			if (attrValue === false) {
				continue;
			}
			xml += ` ${attrName}="`;
			if (attrValue !== 'undefined' && attrValue !== null) {
				xml += attrValue;
			}
			xml += '"';
		}
	}
	const childXml = children.join('');
	if (childXml.length === 0) {
		return xml + ' />';
	} else {
		return xml + `>${childXml}</${tagname}>`;
	}
});