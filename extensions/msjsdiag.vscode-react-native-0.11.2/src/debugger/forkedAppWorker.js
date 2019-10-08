"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for details.
Object.defineProperty(exports, "__esModule", { value: true });
const Q = require("q");
const path = require("path");
const url = require("url");
const child_process = require("child_process");
const fs = require("fs");
const scriptImporter_1 = require("./scriptImporter");
const vscode_chrome_debug_core_1 = require("vscode-chrome-debug-core");
const errorHelper_1 = require("../common/error/errorHelper");
const remoteExtension_1 = require("../common/remoteExtension");
const internalErrorCode_1 = require("../common/error/internalErrorCode");
const LogHelper_1 = require("../extension/log/LogHelper");
function printDebuggingError(error, reason) {
    const nestedError = errorHelper_1.ErrorHelper.getNestedError(error, internalErrorCode_1.InternalErrorCode.DebuggingWontWorkReloadJSAndReconnect, reason);
    vscode_chrome_debug_core_1.logger.error(nestedError.message);
}
/** This class will run the RN App logic inside a forked Node process. The framework to run the logic is provided by the file
 * debuggerWorker.js (designed to run on a WebWorker). We add a couple of tweaks (mostly to polyfill WebWorker API) to that
 * file and load it inside of a process.
 * On this side we listen to IPC messages and either respond to them or redirect them to packager via MultipleLifetimeAppWorker's
 * instance. We also intercept packager's signal to load the bundle's code and mutate the message with path to file we've downloaded
 * to let importScripts function take this file.
 */
class ForkedAppWorker {
    constructor(packagerAddress, packagerPort, sourcesStoragePath, projectRootPath, postReplyToApp, packagerRemoteRoot, packagerLocalRoot) {
        this.packagerAddress = packagerAddress;
        this.packagerPort = packagerPort;
        this.sourcesStoragePath = sourcesStoragePath;
        this.projectRootPath = projectRootPath;
        this.postReplyToApp = postReplyToApp;
        this.packagerRemoteRoot = packagerRemoteRoot;
        this.packagerLocalRoot = packagerLocalRoot;
        this.debuggeeProcess = null;
        /** A deferred that we use to make sure that worker has been loaded completely defore start sending IPC messages */
        this.workerLoaded = Q.defer();
        this.scriptImporter = new scriptImporter_1.ScriptImporter(this.packagerAddress, this.packagerPort, this.sourcesStoragePath, this.packagerRemoteRoot, this.packagerLocalRoot);
        this.remoteExtension = remoteExtension_1.RemoteExtension.atProjectRootPath(this.projectRootPath);
        this.remoteExtension.api.Debugger.onShowDevMenu(() => {
            this.postMessage({
                method: "vscode_showDevMenu",
            });
        });
        this.remoteExtension.api.Debugger.onReloadApp(() => {
            this.postMessage({
                method: "vscode_reloadApp",
            });
        });
    }
    stop() {
        if (this.debuggeeProcess) {
            vscode_chrome_debug_core_1.logger.verbose(`About to kill debuggee with pid ${this.debuggeeProcess.pid}`);
            this.debuggeeProcess.kill();
            this.debuggeeProcess = null;
        }
    }
    start() {
        let scriptToRunPath = path.resolve(this.sourcesStoragePath, scriptImporter_1.ScriptImporter.DEBUGGER_WORKER_FILENAME);
        const port = Math.round(Math.random() * 40000 + 3000);
        // Note that we set --inspect-brk flag to pause the process on the first line - this is
        // required for debug adapter to set the breakpoints BEFORE the debuggee has started.
        // The adapter will continue execution once it's done with breakpoints.
        // --no-deprecation flag disables deprecation warnings like "[DEP0005] DeprecationWarning: Buffer() is deprecated..." and so on that leads to errors in native app
        // https://nodejs.org/dist/latest-v7.x/docs/api/cli.html
        const nodeArgs = [`--inspect-brk=${port}`, "--no-deprecation", scriptToRunPath];
        // Start child Node process in debugging mode
        // Using fork instead of spawn causes breakage of piping between app worker and VS Code debug console, e.g. console.log() in application
        // wouldn't work. Please see https://github.com/Microsoft/vscode-react-native/issues/758
        this.debuggeeProcess = child_process.spawn("node", nodeArgs, {
            stdio: ["pipe", "pipe", "pipe", "ipc"],
        })
            .on("message", (message) => {
            // 'workerLoaded' is a special message that indicates that worker is done with loading.
            // We need to wait for it before doing any IPC because process.send doesn't seems to care
            // about whether the message has been received or not and the first messages are often get
            // discarded by spawned process
            if (message && message.workerLoaded) {
                this.workerLoaded.resolve(void 0);
                return;
            }
            this.postReplyToApp(message);
        })
            .on("error", (error) => {
            printDebuggingError(errorHelper_1.ErrorHelper.getInternalError(internalErrorCode_1.InternalErrorCode.ReactNativeWorkerProcessThrownAnError), error);
        });
        // If special env variables are defined, then write process outputs to file
        this.logDirectory = LogHelper_1.getLoggingDirectory();
        if (this.logDirectory) {
            this.logWriteStream = fs.createWriteStream(path.join(this.logDirectory, "nodeProcessLog.txt"));
            this.logWriteStream.on("error", err => {
                vscode_chrome_debug_core_1.logger.error(`Error creating log file at path: ${this.logDirectory}. Error: ${err.toString()}\n`);
            });
            this.debuggeeProcess.stdout.pipe(this.logWriteStream);
            this.debuggeeProcess.stderr.pipe(this.logWriteStream);
            this.debuggeeProcess.on("close", () => {
                this.logWriteStream.end();
            });
        }
        // Resolve with port debugger server is listening on
        // This will be sent to subscribers of MLAppWorker in "connected" event
        vscode_chrome_debug_core_1.logger.verbose(`Spawned debuggee process with pid ${this.debuggeeProcess.pid} listening to ${port}`);
        return Q.resolve(port);
    }
    postMessage(rnMessage) {
        // Before sending messages, make sure that the worker is loaded
        const promise = this.workerLoaded.promise
            .then(() => {
            if (rnMessage.method !== "executeApplicationScript") {
                // Before sending messages, make sure that the app script executed
                if (this.bundleLoaded) {
                    return this.bundleLoaded.promise.then(() => {
                        return rnMessage;
                    });
                }
                else {
                    return rnMessage;
                }
            }
            else {
                this.bundleLoaded = Q.defer();
                // When packager asks worker to load bundle we download that bundle and
                // then set url field to point to that downloaded bundle, so the worker
                // will take our modified bundle
                if (rnMessage.url) {
                    const packagerUrl = url.parse(rnMessage.url);
                    packagerUrl.host = `${this.packagerAddress}:${this.packagerPort}`;
                    rnMessage = Object.assign({}, rnMessage, { url: url.format(packagerUrl) });
                    vscode_chrome_debug_core_1.logger.verbose(`Packager requested runtime to load script from ${rnMessage.url}`);
                    return this.scriptImporter.downloadAppScript(rnMessage.url, this.projectRootPath)
                        .then((downloadedScript) => {
                        this.bundleLoaded.resolve(void 0);
                        return Object.assign({}, rnMessage, { url: downloadedScript.filepath });
                    });
                }
                else {
                    throw errorHelper_1.ErrorHelper.getInternalError(internalErrorCode_1.InternalErrorCode.RNMessageWithMethodExecuteApplicationScriptDoesntHaveURLProperty);
                }
            }
        });
        promise.done((message) => {
            if (this.debuggeeProcess) {
                this.debuggeeProcess.send({ data: message });
            }
        }, (reason) => printDebuggingError(errorHelper_1.ErrorHelper.getInternalError(internalErrorCode_1.InternalErrorCode.CouldntImportScriptAt, rnMessage.url), reason));
        return promise;
    }
}
exports.ForkedAppWorker = ForkedAppWorker;

//# sourceMappingURL=forkedAppWorker.js.map
