"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Enumerates all tag closing modes. Bitmap.
 */
var TagCloseMode;
(function (TagCloseMode) {
    /**
     * Indicates that a tag can be closed by a close tag, such as `<div></div>`.
     */
    TagCloseMode[TagCloseMode["Tag"] = 1] = "Tag";
    /**
     * Indicates that a tag can self-close, such as `<br />`.
     */
    TagCloseMode[TagCloseMode["SelfClose"] = 2] = "SelfClose";
    /**
     * Indicates that a tag does not need to close, such as `<meta>`.
     */
    TagCloseMode[TagCloseMode["Void"] = 4] = "Void";
})(TagCloseMode = exports.TagCloseMode || (exports.TagCloseMode = {}));
