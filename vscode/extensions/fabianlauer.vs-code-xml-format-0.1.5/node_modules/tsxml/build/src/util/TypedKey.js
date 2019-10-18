"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TypedKey {
    constructor() {
        /**
         * The unique ID of the key.
         */
        this.id = ++TypedKey.counter;
    }
}
TypedKey.counter = 0;
exports.default = TypedKey;
