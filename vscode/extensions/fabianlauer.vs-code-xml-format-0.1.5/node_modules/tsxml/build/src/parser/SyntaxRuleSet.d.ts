import { TagSyntaxRule } from './TagSyntaxRule';
export declare class SyntaxRuleSet {
    /**
     * Creates an instance of the syntax rule set class this static method is called on.
     */
    static createInstance(): SyntaxRuleSet;
    static isSyntaxRuleSetClass(candidate: typeof SyntaxRuleSet): boolean;
    hasTagSyntaxRule(rule: TagSyntaxRule): boolean;
    getAllTagSyntaxRules(): TagSyntaxRule[];
    /**
     * @chainable
     */
    addTagSyntaxRule(rule: TagSyntaxRule): this;
    /**
     * @chainable
     */
    addTagSyntaxRules(...rules: TagSyntaxRule[]): this;
    private static _syntaxRuleSetBrand_;
    private tagSyntaxRules;
}
