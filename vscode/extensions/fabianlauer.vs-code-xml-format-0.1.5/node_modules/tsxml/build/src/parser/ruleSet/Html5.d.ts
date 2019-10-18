import { SyntaxRuleSet } from '../SyntaxRuleSet';
export declare class Html5 extends SyntaxRuleSet {
    static readonly Loose: typeof Html5;
    static readonly Strict: typeof Html5;
    constructor(allowVoidElementsToSelfClose?: boolean);
}
