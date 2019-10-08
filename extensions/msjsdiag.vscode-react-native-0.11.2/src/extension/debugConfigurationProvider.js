"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for details.
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const telemetryHelper_1 = require("../common/telemetryHelper");
const telemetry_1 = require("../common/telemetry");
const nls = require("vscode-nls");
const localize = nls.loadMessageBundle(__filename);
class ReactNativeDebugConfigProvider {
    constructor() {
        this.debugConfigurations = {
            "Debug Android": {
                "name": "Debug Android",
                "cwd": "${workspaceFolder}",
                "type": "reactnative",
                "request": "launch",
                "platform": "android",
            },
            "Debug iOS": {
                "name": "Debug iOS",
                "cwd": "${workspaceFolder}",
                "type": "reactnative",
                "request": "launch",
                "platform": "ios",
            },
            "Attach to packager": {
                "name": "Attach to packager",
                "cwd": "${workspaceFolder}",
                "type": "reactnative",
                "request": "attach",
            },
            "Debug in Exponent": {
                "name": "Debug in Exponent",
                "cwd": "${workspaceFolder}",
                "type": "reactnative",
                "request": "launch",
                "platform": "exponent",
            },
        };
        this.pickConfig = [
            {
                label: "Debug Android",
                description: localize(0, null),
            },
            {
                label: "Debug iOS",
                description: localize(1, null),
            },
            {
                label: "Attach to packager",
                description: localize(2, null),
            },
            {
                label: "Debug in Exponent",
                description: localize(3, null),
            },
        ];
    }
    provideDebugConfigurations(folder, token) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                const configPicker = this.prepareDebugConfigPicker();
                const disposables = [];
                const pickHandler = () => {
                    let chosenConfigsEvent = telemetryHelper_1.TelemetryHelper.createTelemetryEvent("chosenDebugConfigurations");
                    let selected = configPicker.selectedItems.map(element => element.label);
                    chosenConfigsEvent.properties["selectedItems"] = selected;
                    telemetry_1.Telemetry.send(chosenConfigsEvent);
                    const launchConfig = this.gatherDebugScenarios(selected);
                    disposables.forEach(d => d.dispose());
                    resolve(launchConfig);
                };
                disposables.push(configPicker.onDidAccept(pickHandler), configPicker.onDidHide(pickHandler), configPicker);
                configPicker.show();
            });
        });
    }
    gatherDebugScenarios(selectedItems) {
        let launchConfig = selectedItems.map(element => this.debugConfigurations[element]);
        return launchConfig;
    }
    prepareDebugConfigPicker() {
        const debugConfigPicker = vscode.window.createQuickPick();
        debugConfigPicker.canSelectMany = true;
        debugConfigPicker.ignoreFocusOut = true;
        debugConfigPicker.title = localize(4, null);
        debugConfigPicker.items = this.pickConfig;
        // QuickPickItem property `picked` doesn't work, so this line will check first item in the list
        // which is supposed to be Debug Android
        debugConfigPicker.selectedItems = [this.pickConfig[0]];
        return debugConfigPicker;
    }
}
exports.ReactNativeDebugConfigProvider = ReactNativeDebugConfigProvider;

//# sourceMappingURL=debugConfigurationProvider.js.map
