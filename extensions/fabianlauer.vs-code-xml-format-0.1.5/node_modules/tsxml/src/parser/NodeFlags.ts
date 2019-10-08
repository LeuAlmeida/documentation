/**
 * Flags applied to nodes during parsing.
 * Bitmask.
 */
export enum NodeFlags {
	None = 0,
	Opened = 1 << 0,
	Closed = 1 << 1,
	SelfClosing = 1 << 2 | Opened | Closed,
	Void = 1 << 3 | SelfClosing
}