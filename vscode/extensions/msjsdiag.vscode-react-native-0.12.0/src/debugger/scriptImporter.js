"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for details.
Object.defineProperty(exports, "__esModule", { value: true });
const fileSystem_1 = require("../common/node/fileSystem");
const vscode_chrome_debug_core_1 = require("vscode-chrome-debug-core");
const packagerStatus_1 = require("../common/packagerStatus");
const path = require("path");
const Q = require("q");
const request_1 = require("../common/node/request");
const sourceMap_1 = require("./sourceMap");
const url = require("url");
const semver = require("semver");
const reactNativeProjectHelper_1 = require("../common/reactNativeProjectHelper");
const errorHelper_1 = require("../common/error/errorHelper");
const internalErrorCode_1 = require("../common/error/internalErrorCode");
class ScriptImporter {
    constructor(packagerAddress, packagerPort, sourcesStoragePath, packagerRemoteRoot, packagerLocalRoot) {
        this.packagerAddress = packagerAddress;
        this.packagerPort = packagerPort;
        this.sourcesStoragePath = sourcesStoragePath;
        this.packagerRemoteRoot = packagerRemoteRoot;
        this.packagerLocalRoot = packagerLocalRoot;
        this.sourceMapUtil = new sourceMap_1.SourceMapUtil();
    }
    downloadAppScript(scriptUrlString, projectRootPath) {
        const parsedScriptUrl = url.parse(scriptUrlString);
        const overriddenScriptUrlString = (parsedScriptUrl.hostname === "localhost") ? this.overridePackagerPort(scriptUrlString) : scriptUrlString;
        // We'll get the source code, and store it locally to have a better debugging experience
        return request_1.Request.request(overriddenScriptUrlString, true).then(scriptBody => {
            return reactNativeProjectHelper_1.ReactNativeProjectHelper.getReactNativeVersion(projectRootPath).then(rnVersion => {
                // unfortunatelly Metro Bundler is broken in RN 0.54.x versions, so use this workaround unless it will be fixed
                // https://github.com/facebook/metro/issues/147
                // https://github.com/Microsoft/vscode-react-native/issues/660
                if (reactNativeProjectHelper_1.ReactNativeProjectHelper.getRNVersionsWithBrokenMetroBundler().indexOf(rnVersion) >= 0) {
                    let noSourceMappingUrlGenerated = scriptBody.match(/sourceMappingURL=/g) === null;
                    if (noSourceMappingUrlGenerated) {
                        let sourceMapPathUrl = overriddenScriptUrlString.replace("bundle", "map");
                        scriptBody = this.sourceMapUtil.appendSourceMapPaths(scriptBody, sourceMapPathUrl);
                    }
                }
                // Extract sourceMappingURL from body
                let scriptUrl = url.parse(overriddenScriptUrlString); // scriptUrl = "http://localhost:8081/index.ios.bundle?platform=ios&dev=true"
                let sourceMappingUrl = this.sourceMapUtil.getSourceMapURL(scriptUrl, scriptBody); // sourceMappingUrl = "http://localhost:8081/index.ios.map?platform=ios&dev=true"
                let waitForSourceMapping = Q(void 0);
                if (sourceMappingUrl) {
                    /* handle source map - request it and store it locally */
                    waitForSourceMapping = this.writeAppSourceMap(sourceMappingUrl, scriptUrl)
                        .then(() => {
                        scriptBody = this.sourceMapUtil.updateScriptPaths(scriptBody, sourceMappingUrl);
                        if (semver.gte(rnVersion, "0.61.0")) {
                            scriptBody = this.sourceMapUtil.removeSourceURL(scriptBody);
                        }
                    });
                }
                return waitForSourceMapping
                    .then(() => this.writeAppScript(scriptBody, scriptUrl))
                    .then((scriptFilePath) => {
                    vscode_chrome_debug_core_1.logger.verbose(`Script ${overriddenScriptUrlString} downloaded to ${scriptFilePath}`);
                    return { contents: scriptBody, filepath: scriptFilePath };
                });
            });
        });
    }
    downloadDebuggerWorker(sourcesStoragePath, projectRootPath, debuggerWorkerUrlPath) {
        const errPackagerNotRunning = errorHelper_1.ErrorHelper.getInternalError(internalErrorCode_1.InternalErrorCode.CannotAttachToPackagerCheckPackagerRunningOnPort, this.packagerPort);
        return packagerStatus_1.ensurePackagerRunning(this.packagerAddress, this.packagerPort, errPackagerNotRunning)
            .then(() => {
            return reactNativeProjectHelper_1.ReactNativeProjectHelper.getReactNativeVersion(projectRootPath);
        })
            .then((rnVersion) => {
            let debuggerWorkerURL = this.prepareDebuggerWorkerURL(rnVersion, debuggerWorkerUrlPath);
            let debuggerWorkerLocalPath = path.join(sourcesStoragePath, ScriptImporter.DEBUGGER_WORKER_FILENAME);
            vscode_chrome_debug_core_1.logger.verbose("About to download: " + debuggerWorkerURL + " to: " + debuggerWorkerLocalPath);
            return request_1.Request.request(debuggerWorkerURL, true)
                .then((body) => {
                return new fileSystem_1.FileSystem().writeFile(debuggerWorkerLocalPath, body);
            });
        });
    }
    prepareDebuggerWorkerURL(rnVersion, debuggerWorkerUrlPath) {
        let debuggerWorkerURL;
        // It can be empty string
        if (debuggerWorkerUrlPath !== undefined) {
            debuggerWorkerURL = `http://${this.packagerAddress}:${this.packagerPort}/${debuggerWorkerUrlPath}${ScriptImporter.DEBUGGER_WORKER_FILENAME}`;
        }
        else {
            let newPackager = "";
            if (!semver.valid(rnVersion) /*Custom RN implementations should support new packager*/ || (semver.gte(rnVersion, "0.50.0"))) {
                newPackager = "debugger-ui/";
            }
            debuggerWorkerURL = `http://${this.packagerAddress}:${this.packagerPort}/${newPackager}${ScriptImporter.DEBUGGER_WORKER_FILENAME}`;
        }
        return debuggerWorkerURL;
    }
    /**
     * Writes the script file to the project temporary location.
     */
    writeAppScript(scriptBody, scriptUrl) {
        let scriptFilePath = path.join(this.sourcesStoragePath, path.basename(scriptUrl.pathname)); // scriptFilePath = "$TMPDIR/index.ios.bundle"
        return new fileSystem_1.FileSystem().writeFile(scriptFilePath, scriptBody)
            .then(() => scriptFilePath);
    }
    /**
     * Writes the source map file to the project temporary location.
     */
    writeAppSourceMap(sourceMapUrl, scriptUrl) {
        return request_1.Request.request(sourceMapUrl.href, true)
            .then((sourceMapBody) => {
            let sourceMappingLocalPath = path.join(this.sourcesStoragePath, path.basename(sourceMapUrl.pathname)); // sourceMappingLocalPath = "$TMPDIR/index.ios.map"
            let scriptFileRelativePath = path.basename(scriptUrl.pathname); // scriptFileRelativePath = "index.ios.bundle"
            let updatedContent = this.sourceMapUtil.updateSourceMapFile(sourceMapBody, scriptFileRelativePath, this.sourcesStoragePath, this.packagerRemoteRoot, this.packagerLocalRoot);
            return new fileSystem_1.FileSystem().writeFile(sourceMappingLocalPath, updatedContent);
        });
    }
    /**
     * Changes the port of the url to be the one configured as this.packagerPort
     */
    overridePackagerPort(urlToOverride) {
        let components = url.parse(urlToOverride);
        components.port = this.packagerPort.toString();
        delete components.host; // We delete the host, if not the port change will be ignored
        return url.format(components);
    }
}
ScriptImporter.DEBUGGER_WORKER_FILE_BASENAME = "debuggerWorker";
ScriptImporter.DEBUGGER_WORKER_FILENAME = ScriptImporter.DEBUGGER_WORKER_FILE_BASENAME + ".js";
exports.ScriptImporter = ScriptImporter;

//# sourceMappingURL=scriptImporter.js.map
