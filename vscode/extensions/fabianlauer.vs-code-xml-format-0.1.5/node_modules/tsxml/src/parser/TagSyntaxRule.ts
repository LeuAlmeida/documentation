import {TagCloseMode} from './TagCloseMode'; 

/**
 * Defines all possible permissions and restrictions for one or more tags. 
 */
export class TagSyntaxRule {
	/**
	 * Creates a new syntax rule for a certain tag name.
	 * @param tagName The tag name to create the syntax rule for.
	 */
	public static createForTagName(tagName: string): TagSyntaxRule {
		return new TagSyntaxRule([tagName]);
	}
	
	
	
	/**
	 * Creates a new syntax rule for one or more tag names.
	 * @param tagName The tag name to create the syntax rule for.
	 */
	public static createForTagNames(...tagNames: string[]): TagSyntaxRule {
		return new TagSyntaxRule(
			// make sure there are no duplicate tag names
			/// TODO: Check whether this is fast enough on large tag name lists.
			tagNames.filter((tagName: string, index: number, array: typeof tagNames) => array.indexOf(tagName) === index)
		);
	}
	
	
	/**
	 * Creates a new tag syntax rule object. **Use static method `createForTagName` instead.**
	 */
	constructor(private tagNames: string[]) { }
	
	
	/**
	 * Returns all tag names a rule applies to.
	 */
	public getTagNames(): string[] {
		return [].concat(this.tagNames);
	}
	
	
	/**
	 * Checks whether a rule applies to a certain tag name. This method is case sensitive.
	 * @param tagName The tag name to check.
	 */
	public appliesToTagName(tagName: string): boolean {
		return this.tagNames.indexOf(tagName) !== -1;
	}
	
	
	/**
	 * Returns a rule's current close mode or close modes.
	 */
	public getCloseMode(): TagCloseMode {
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
	public setCloseMode(mode: TagCloseMode) {
		this.closeMode = mode;
		return this;
	}
	
	
	private closeMode: TagCloseMode;
}