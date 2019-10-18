import { TagCloseMode } from './TagCloseMode';
/**
 * Defines all possible permissions and restrictions for one or more tags.
 */
export declare class TagSyntaxRule {
    private tagNames;
    /**
     * Creates a new syntax rule for a certain tag name.
     * @param tagName The tag name to create the syntax rule for.
     */
    static createForTagName(tagName: string): TagSyntaxRule;
    /**
     * Creates a new syntax rule for one or more tag names.
     * @param tagName The tag name to create the syntax rule for.
     */
    static createForTagNames(...tagNames: string[]): TagSyntaxRule;
    /**
     * Creates a new tag syntax rule object. **Use static method `createForTagName` instead.**
     */
    constructor(tagNames: string[]);
    /**
     * Returns all tag names a rule applies to.
     */
    getTagNames(): string[];
    /**
     * Checks whether a rule applies to a certain tag name. This method is case sensitive.
     * @param tagName The tag name to check.
     */
    appliesToTagName(tagName: string): boolean;
    /**
     * Returns a rule's current close mode or close modes.
     */
    getCloseMode(): TagCloseMode;
    /**
     * Sets the rule's allowed tag close modes. This can be a single mode or a combination of modes.
     * @example
     *     rule.setCloseMode(TagCloseMode.SelfClose);
     *     rule.setCloseMode(TagCloseMode.SelfClose | TagCloseMode.Void);
     * @chainable
     * @param mode The close mode to set.
     */
    setCloseMode(mode: TagCloseMode): this;
    private closeMode;
}
