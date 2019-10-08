/**
 * Flags applied to nodes during parsing.
 * Bitmask.
 */
export declare enum NodeFlags {
    None = 0,
    Opened = 1,
    Closed = 2,
    SelfClosing = 7,
    Void = 15,
}
