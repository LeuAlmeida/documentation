"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const vs = require("vscode");
class SdkCommands {
    // TODO: Find an easy way to share the API signature class.
    constructor(context, dartExtensionApi) {
        this.dartExtensionApi = dartExtensionApi;
        context.subscriptions.push(vs.commands.registerCommand("flutter.createSampleProject", (_) => this.runFunctionIfSupported(dartExtensionApi.flutterCreateSampleProject)));
    }
    runFunctionIfSupported(f) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!f) {
                this.showApiMismatchError();
                return undefined;
            }
            return f();
        });
    }
    showApiMismatchError() {
        vs.window.showErrorMessage("The installed version of the Dart extension does not support this feature. Please update the Dart extension.");
    }
}
exports.SdkCommands = SdkCommands;
//# sourceMappingURL=sdk.js.map