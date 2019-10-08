"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AssertionResult {
    constructor(_unitTestID, _successful, _description) {
        this._unitTestID = _unitTestID;
        this._successful = _successful;
        this._description = _description;
    }
    get unitTestID() {
        return this._unitTestID;
    }
    get successful() {
        return this._successful;
    }
    get description() {
        return this._description;
    }
}
exports.AssertionResult = AssertionResult;
