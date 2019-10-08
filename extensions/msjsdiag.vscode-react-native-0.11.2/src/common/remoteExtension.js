"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for details.
Object.defineProperty(exports, "__esModule", { value: true });
const extensionMessaging_1 = require("./extensionMessaging");
const WebSocket = require("ws");
const rpc = require("noice-json-rpc");
class RemoteExtension {
    constructor(_api) {
        this._api = _api;
    }
    static atProjectRootPath(projectRootPath) {
        const pipePath = extensionMessaging_1.MessagingHelper.getPath(projectRootPath);
        let ws = new WebSocket("ws+unix://" + pipePath);
        ws.on("error", (err) => {
            console.error(err);
        });
        const _api = new rpc.Client(ws).api();
        return new RemoteExtension(_api);
    }
    get api() {
        return this._api;
    }
    stopMonitoringLogcat() {
        return this._api.Extension.stopMonitoringLogcat();
    }
    sendTelemetry(extensionId, extensionVersion, appInsightsKey, eventName, properties = {}, measures = {}) {
        const request = {
            extensionId,
            extensionVersion,
            appInsightsKey,
            eventName,
            properties,
            measures,
        };
        return this._api.Extension.sendTelemetry(request);
    }
    openFileAtLocation(filename, lineNumber) {
        const request = {
            filename,
            lineNumber,
        };
        return this._api.Extension.openFileAtLocation(request);
    }
    getPackagerPort(projectRoot) {
        return this._api.Extension.getPackagerPort(projectRoot);
    }
    showInformationMessage(infoMessage) {
        return this._api.Extension.showInformationMessage(infoMessage);
    }
    launch(request) {
        return this._api.Extension.launch(request);
    }
    showDevMenu(deviceId) {
        return this._api.Extension.showDevMenu(deviceId);
    }
    reloadApp(deviceId) {
        return this._api.Extension.reloadApp(deviceId);
    }
}
exports.RemoteExtension = RemoteExtension;

//# sourceMappingURL=remoteExtension.js.map
