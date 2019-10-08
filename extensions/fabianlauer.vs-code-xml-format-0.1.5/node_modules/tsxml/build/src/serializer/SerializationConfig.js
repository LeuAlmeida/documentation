"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = require("./config");
class SerializationConfig {
    constructor() {
        this.data = new Map();
        this.set(config.indentChar, '\t');
        this.set(config.newlineChar, '\n');
    }
    has(key) {
        return this.data.has(key);
    }
    get(key) {
        return this.data.get(key);
    }
    set(key, value) {
        this.data.set(key);
    }
}
exports.default = SerializationConfig;
