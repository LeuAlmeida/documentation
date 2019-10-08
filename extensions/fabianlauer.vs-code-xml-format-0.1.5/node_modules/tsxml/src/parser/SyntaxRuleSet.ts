import {TagSyntaxRule} from './TagSyntaxRule';

export class SyntaxRuleSet {
	/**
	 * Creates an instance of the syntax rule set class this static method is called on.
	 */
	public static createInstance(): SyntaxRuleSet {
		return new this();
	}
	
	
	public static isSyntaxRuleSetClass(candidate: typeof SyntaxRuleSet): boolean {
		return (typeof candidate === 'function' && candidate._syntaxRuleSetBrand_ === SyntaxRuleSet._syntaxRuleSetBrand_);
	}
	
	
	public hasTagSyntaxRule(rule: TagSyntaxRule): boolean {
		return this.tagSyntaxRules.indexOf(rule) !== -1;
	}
	
	
	public getAllTagSyntaxRules(): TagSyntaxRule[] {
		return [].concat(this.tagSyntaxRules);
	}
	
	
	/**
	 * @chainable
	 */
	public addTagSyntaxRule(rule: TagSyntaxRule) {
		if (!this.hasTagSyntaxRule(rule)) {
			this.tagSyntaxRules.push(rule);
		}
		return this;
	}
	
	
	/**
	 * @chainable
	 */
	public addTagSyntaxRules(...rules: TagSyntaxRule[]) {
		rules.forEach(rule => this.addTagSyntaxRule(rule));
		return this;
	}
	
	
	private static _syntaxRuleSetBrand_ = Math.random();
	
	
	private tagSyntaxRules: TagSyntaxRule[] = [];
}