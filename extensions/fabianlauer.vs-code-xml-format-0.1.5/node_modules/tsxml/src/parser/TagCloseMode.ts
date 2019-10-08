/**
 * Enumerates all tag closing modes. Bitmap. 
 */
export enum TagCloseMode {
	/**
	 * Indicates that a tag can be closed by a close tag, such as `<div></div>`.
	 */
	Tag = 1 << 0,
	/**
	 * Indicates that a tag can self-close, such as `<br />`.
	 */
	SelfClose = 1 << 1,
	/**
	 * Indicates that a tag does not need to close, such as `<meta>`.
	 */
	Void = 1 << 2
}