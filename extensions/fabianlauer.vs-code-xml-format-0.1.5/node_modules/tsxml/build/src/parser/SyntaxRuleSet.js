"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SyntaxRuleSet {
    constructor() {
        this.tagSyntaxRules = [];
    }
    /**
     * Creates an instance of the syntax rule set class this static method is called on.
     */
    static createInstance() {
        return new this();
    }
    static isSyntaxRuleSetClass(candidate) {
        return (typeof candidate === 'function' && candidate._syntaxRuleSetBrand_ === SyntaxRuleSet._syntaxRuleSetBrand_);
    }
    hasTagSyntaxRule(rule) {
        return this.tagSyntaxRules.indexOf(rule) !== -1;
    }
    getAllTagSyntaxRules() {
        return [].concat(this.tagSyntaxRules);
    }
    /**
     * @chainable
     */
    addTagSyntaxRule(rule) {
        if (!this.hasTagSyntaxRule(rule)) {
            this.tagSyntaxRules.push(rule);
        }
        return this;
    }
    /**
     * @chainable
     */
    addTagSyntaxRules(...rules) {
        rules.forEach(rule => this.addTagSyntaxRule(rule));
        return this;
    }
}
SyntaxRuleSet._syntaxRuleSetBrand_ = Math.random();
exports.SyntaxRuleSet = SyntaxRuleSet;
