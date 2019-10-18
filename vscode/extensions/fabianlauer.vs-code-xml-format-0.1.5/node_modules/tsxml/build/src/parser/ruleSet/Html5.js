"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TagCloseMode_1 = require("../TagCloseMode");
const TagSyntaxRule_1 = require("../TagSyntaxRule");
const SyntaxRuleSet_1 = require("../SyntaxRuleSet");
class Html5 extends SyntaxRuleSet_1.SyntaxRuleSet {
    static get Loose() {
        return class Html5Loose extends Html5 {
            constructor() {
                super(true);
            }
        };
    }
    static get Strict() {
        return class Html5Strict extends Html5 {
            constructor() {
                super(false);
            }
        };
    }
    constructor(allowVoidElementsToSelfClose) {
        super();
        if (typeof allowVoidElementsToSelfClose === 'undefined') {
            allowVoidElementsToSelfClose = true;
        }
        // see https://www.w3.org/TR/html-markup/syntax.html#syntax-elements
        const voidTagSyntaxRule = TagSyntaxRule_1.TagSyntaxRule.createForTagNames('area', 'base', 'br', 'col', 'command', 'embed', 'hr', 'img', 'input', 'keygen', 'link', 'meta', 'param', 'source', 'track', 'wbr');
        if (allowVoidElementsToSelfClose) {
            voidTagSyntaxRule.setCloseMode(TagCloseMode_1.TagCloseMode.Void | TagCloseMode_1.TagCloseMode.SelfClose);
        }
        else {
            voidTagSyntaxRule.setCloseMode(TagCloseMode_1.TagCloseMode.Void);
        }
        this.addTagSyntaxRule(voidTagSyntaxRule);
    }
}
exports.Html5 = Html5;
