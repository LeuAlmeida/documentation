"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Defines all possible permissions and restrictions for one or more tags.
 */
class TagSyntaxRule {
    /**
     * Creates a new tag syntax rule object. **Use static method `createForTagName` instead.**
     */
    constructor(tagNames) {
        this.tagNames = tagNames;
    }
    /**
     * Creates a new syntax rule for a certain tag name.
     * @param tagName The tag name to create the syntax rule for.
     */
    static createForTagName(tagName) {
        return new TagSyntaxRule([tagName]);
    }
    /**
     * Creates a new syntax rule for one or more tag names.
     * @param tagName The tag name to create the syntax rule for.
     */
    static createForTagNames(...tagNames) {
        return new TagSyntaxRule(
        // make sure there are no duplicate tag names
        /// TODO: Check whether this is fast enough on large tag name lists.
        tagNames.filter((tagName, index, array) => array.indexOf(tagName) === index));
    }
    /**
     * Returns all tag names a rule applies to.
     */
    getTagNames() {
        return [].concat(this.tagNames);
    }
    /**
     * Checks whether a rule applies to a certain tag name. This method is case sensitive.
     * @param tagName The tag name to check.
     */
    appliesToTagName(tagName) {
        return this.tagNames.indexOf(tagName) !== -1;
    }
    /**
     * Returns a rule's current close mode or close modes.
     */
    getCloseMode() {
        return this.closeMode;
    }
    /**
     * Sets the rule's allowed tag close modes. This can be a single mode or a combination of modes.
     * @example
     *     rule.setCloseMode(TagCloseMode.SelfClose);
     *     rule.setCloseMode(TagCloseMode.SelfClose | TagCloseMode.Void);
     * @chainable
     * @param mode The close mode to set.
     */
    setCloseMode(mode) {
        this.closeMode = mode;
        return this;
    }
}
exports.TagSyntaxRule = TagSyntaxRule;
