"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for details.
Object.defineProperty(exports, "__esModule", { value: true });
const Q = require("q");
const path = require("path");
const WebSocket = require("ws");
const events_1 = require("events");
const packagerStatus_1 = require("../common/packagerStatus");
const errorHelper_1 = require("../common/error/errorHelper");
const vscode_chrome_debug_core_1 = require("vscode-chrome-debug-core");
const executionsLimiter_1 = require("../common/executionsLimiter");
const fileSystem_1 = require("../common/node/fileSystem");
const forkedAppWorker_1 = require("./forkedAppWorker");
const scriptImporter_1 = require("./scriptImporter");
const reactNativeProjectHelper_1 = require("../common/reactNativeProjectHelper");
const nls = require("vscode-nls");
const internalErrorCode_1 = require("../common/error/internalErrorCode");
const localize = nls.loadMessageBundle(__filename);
function printDebuggingError(error, reason) {
    const nestedError = errorHelper_1.ErrorHelper.getNestedError(error, internalErrorCode_1.InternalErrorCode.DebuggingWontWorkReloadJSAndReconnect, reason);
    vscode_chrome_debug_core_1.logger.error(nestedError.message);
}
/** This class will create a SandboxedAppWorker that will run the RN App logic, and then create a socket
 * and send the RN App messages to the SandboxedAppWorker. The only RN App message that this class handles
 * is the prepareJSRuntime, which we reply to the RN App that the sandbox was created successfully.
 * When the socket closes, we'll create a new SandboxedAppWorker and a new socket pair and discard the old ones.
 */
class MultipleLifetimesAppWorker extends events_1.EventEmitter {
    constructor(attachRequestArguments, sourcesStoragePath, projectRootPath, { webSocketConstructor = (url) => new WebSocket(url), } = {}) {
        super();
        this.executionLimiter = new executionsLimiter_1.ExecutionsLimiter();
        this.nodeFileSystem = new fileSystem_1.FileSystem();
        this.packagerAddress = attachRequestArguments.address || "localhost";
        this.packagerPort = attachRequestArguments.port;
        this.packagerRemoteRoot = attachRequestArguments.remoteRoot;
        this.packagerLocalRoot = attachRequestArguments.localRoot;
        this.debuggerWorkerUrlPath = attachRequestArguments.debuggerWorkerUrlPath;
        this.sourcesStoragePath = sourcesStoragePath;
        this.projectRootPath = projectRootPath;
        if (!this.sourcesStoragePath)
            throw errorHelper_1.ErrorHelper.getInternalError(internalErrorCode_1.InternalErrorCode.SourcesStoragePathIsNullOrEmpty);
        this.webSocketConstructor = webSocketConstructor;
        this.scriptImporter = new scriptImporter_1.ScriptImporter(this.packagerAddress, this.packagerPort, sourcesStoragePath, this.packagerRemoteRoot, this.packagerLocalRoot);
    }
    start(retryAttempt = false) {
        const errPackagerNotRunning = errorHelper_1.ErrorHelper.getInternalError(internalErrorCode_1.InternalErrorCode.CannotAttachToPackagerCheckPackagerRunningOnPort, this.packagerPort);
        return packagerStatus_1.ensurePackagerRunning(this.packagerAddress, this.packagerPort, errPackagerNotRunning)
            .then(() => {
            // Don't fetch debugger worker on socket disconnect
            return retryAttempt ? Q.resolve(void 0) :
                this.downloadAndPatchDebuggerWorker();
        })
            .then(() => this.createSocketToApp(retryAttempt));
    }
    stop() {
        if (this.socketToApp) {
            this.socketToApp.removeAllListeners();
            this.socketToApp.close();
        }
        if (this.singleLifetimeWorker) {
            this.singleLifetimeWorker.stop();
        }
    }
    downloadAndPatchDebuggerWorker() {
        let scriptToRunPath = path.resolve(this.sourcesStoragePath, scriptImporter_1.ScriptImporter.DEBUGGER_WORKER_FILENAME);
        return this.scriptImporter.downloadDebuggerWorker(this.sourcesStoragePath, this.projectRootPath, this.debuggerWorkerUrlPath)
            .then(() => this.nodeFileSystem.readFile(scriptToRunPath, "utf8"))
            .then((workerContent) => {
            const isHaulProject = reactNativeProjectHelper_1.ReactNativeProjectHelper.isHaulProject(this.projectRootPath);
            // Add our customizations to debugger worker to get it working smoothly
            // in Node env and polyfill WebWorkers API over Node's IPC.
            const modifiedDebuggeeContent = [
                MultipleLifetimesAppWorker.WORKER_BOOTSTRAP,
                MultipleLifetimesAppWorker.CONSOLE_TRACE_PATCH,
                MultipleLifetimesAppWorker.PROCESS_TO_STRING_PATCH,
                isHaulProject ? MultipleLifetimesAppWorker.FETCH_STUB : null,
                workerContent,
                MultipleLifetimesAppWorker.WORKER_DONE,
            ].join("\n");
            return this.nodeFileSystem.writeFile(scriptToRunPath, modifiedDebuggeeContent);
        });
    }
    startNewWorkerLifetime() {
        this.singleLifetimeWorker = new forkedAppWorker_1.ForkedAppWorker(this.packagerAddress, this.packagerPort, this.sourcesStoragePath, this.projectRootPath, (message) => {
            this.sendMessageToApp(message);
        }, this.packagerRemoteRoot, this.packagerLocalRoot);
        vscode_chrome_debug_core_1.logger.verbose("A new app worker lifetime was created.");
        return this.singleLifetimeWorker.start()
            .then(startedEvent => {
            this.emit("connected", startedEvent);
        });
    }
    createSocketToApp(retryAttempt = false) {
        let deferred = Q.defer();
        this.socketToApp = this.webSocketConstructor(this.debuggerProxyUrl());
        this.socketToApp.on("open", () => {
            this.onSocketOpened();
        });
        this.socketToApp.on("close", () => {
            this.executionLimiter.execute("onSocketClose.msg", /*limitInSeconds*/ 10, () => {
                /*
                 * It is not the best idea to compare with the message, but this is the only thing React Native gives that is unique when
                 * it closes the socket because it already has a connection to a debugger.
                 * https://github.com/facebook/react-native/blob/588f01e9982775f0699c7bfd56623d4ed3949810/local-cli/server/util/webSocketProxy.js#L38
                 */
                let msgKey = "_closeMessage";
                if (this.socketToApp[msgKey] === "Another debugger is already connected") {
                    deferred.reject(errorHelper_1.ErrorHelper.getInternalError(internalErrorCode_1.InternalErrorCode.AnotherDebuggerConnectedToPackager));
                }
                vscode_chrome_debug_core_1.logger.log(localize(0, null));
            });
            setTimeout(() => {
                this.start(true /* retryAttempt */);
            }, 100);
        });
        this.socketToApp.on("message", (message) => this.onMessage(message));
        this.socketToApp.on("error", (error) => {
            if (retryAttempt) {
                printDebuggingError(errorHelper_1.ErrorHelper.getInternalError(internalErrorCode_1.InternalErrorCode.ReconnectionToPackagerFailedCheckForErrorsOrRestartReactNative), error);
            }
            deferred.reject(error);
        });
        // In an attempt to catch failures in starting the packager on first attempt,
        // wait for 300 ms before resolving the promise
        Q.delay(300).done(() => deferred.resolve(void 0));
        return deferred.promise;
    }
    debuggerProxyUrl() {
        return `ws://${this.packagerAddress}:${this.packagerPort}/debugger-proxy?role=debugger&name=vscode`;
    }
    onSocketOpened() {
        this.executionLimiter.execute("onSocketOpened.msg", /*limitInSeconds*/ 10, () => vscode_chrome_debug_core_1.logger.log(localize(1, null)));
    }
    killWorker() {
        if (!this.singleLifetimeWorker)
            return;
        this.singleLifetimeWorker.stop();
        this.singleLifetimeWorker = null;
    }
    onMessage(message) {
        try {
            vscode_chrome_debug_core_1.logger.verbose("From RN APP: " + message);
            let object = JSON.parse(message);
            if (object.method === "prepareJSRuntime") {
                // In RN 0.40 Android runtime doesn't seem to be sending "$disconnected" event
                // when user reloads an app, hence we need to try to kill it here either.
                this.killWorker();
                // The MultipleLifetimesAppWorker will handle prepareJSRuntime aka create new lifetime
                this.gotPrepareJSRuntime(object);
            }
            else if (object.method === "$disconnected") {
                // We need to shutdown the current app worker, and create a new lifetime
                this.killWorker();
            }
            else if (object.method) {
                // All the other messages are handled by the single lifetime worker
                if (this.singleLifetimeWorker) {
                    this.singleLifetimeWorker.postMessage(object);
                }
            }
            else {
                // Message doesn't have a method. Ignore it. This is an info message instead of warn because it's normal and expected
                vscode_chrome_debug_core_1.logger.verbose(`The react-native app sent a message without specifying a method: ${message}`);
            }
        }
        catch (exception) {
            printDebuggingError(errorHelper_1.ErrorHelper.getInternalError(internalErrorCode_1.InternalErrorCode.FailedToProcessMessageFromReactNativeApp, message), exception);
        }
    }
    gotPrepareJSRuntime(message) {
        // Create the sandbox, and replay that we finished processing the message
        this.startNewWorkerLifetime().done(() => {
            this.sendMessageToApp({ replyID: parseInt(message.id, 10) });
        }, error => printDebuggingError(errorHelper_1.ErrorHelper.getInternalError(internalErrorCode_1.InternalErrorCode.FailedToPrepareJSRuntimeEnvironment, message), error));
    }
    sendMessageToApp(message) {
        let stringified = "";
        try {
            stringified = JSON.stringify(message);
            vscode_chrome_debug_core_1.logger.verbose(`To RN APP: ${stringified}`);
            this.socketToApp.send(stringified);
        }
        catch (exception) {
            let messageToShow = stringified || ("" + message); // Try to show the stringified version, but show the toString if unavailable
            printDebuggingError(errorHelper_1.ErrorHelper.getInternalError(internalErrorCode_1.InternalErrorCode.FailedToSendMessageToTheReactNativeApp, messageToShow), exception);
        }
    }
}
MultipleLifetimesAppWorker.WORKER_BOOTSTRAP = `
// Initialize some variables before react-native code would access them
var onmessage=null, self=global;
// Cache Node's original require as __debug__.require
global.__debug__={require: require};
// Prevent leaking process.versions from debugger process to
// worker because pure React Native doesn't do that and some packages as js-md5 rely on this behavior
Object.defineProperty(process, "versions", {
    value: undefined
});
function getNativeModules() {
    var NativeModules;
    try {
        // This approach is for old RN versions
        NativeModules = global.require('NativeModules');
    } catch (err) {
        // ignore error and try another way for more recent RN versions
        try {
            var nativeModuleId;
            var modules = global.__r.getModules();
            var ids = Object.keys(modules);
            for (var i = 0; i < ids.length; i++) {
              if (modules[ids[i]].verboseName) {
                 var packagePath = new String(modules[ids[i]].verboseName);
                 if (packagePath.indexOf("react-native/Libraries/BatchedBridge/NativeModules.js") > 0) {
                   nativeModuleId = parseInt(ids[i], 10);
                   break;
                 }
              }
            }
          if (nativeModuleId) {
            NativeModules = global.__r(nativeModuleId);
          }
        }
        catch (err) {
            // suppress errors
        }
    }
    return NativeModules;
}
// Originally, this was made for iOS only
var vscodeHandlers = {
    'vscode_reloadApp': function () {
        var NativeModules = getNativeModules();
        if (NativeModules) {
            NativeModules.DevMenu.reload();
        }
    },
    'vscode_showDevMenu': function () {
        var NativeModules = getNativeModules();
        if (NativeModules) {
            NativeModules.DevMenu.show();
        }
    }
};
process.on("message", function (message) {
    if (message.data && vscodeHandlers[message.data.method]) {
        vscodeHandlers[message.data.method]();
    } else if(onmessage) {
        onmessage(message);
    }
});
var postMessage = function(message){
    process.send(message);
};
if (!self.postMessage) {
    self.postMessage = postMessage;
}
var importScripts = (function(){
    var fs=require('fs'), vm=require('vm');
    return function(scriptUrl){
        var scriptCode = fs.readFileSync(scriptUrl, "utf8");
        vm.runInThisContext(scriptCode, {filename: scriptUrl});
    };
})();`;
MultipleLifetimesAppWorker.CONSOLE_TRACE_PATCH = `// Worker is ran as nodejs process, so console.trace() writes to stderr and it leads to error in native app
// To avoid this console.trace() is overridden to print stacktrace via console.log()
// Please, see Node JS implementation: https://github.com/nodejs/node/blob/master/lib/internal/console/constructor.js
console.trace = (function() {
    return function() {
        try {
            var err = {
                name: 'Trace',
                message: require('util').format.apply(null, arguments)
                };
            // Node uses 10, but usually it's not enough for RN app trace
            Error.stackTraceLimit = 30;
            Error.captureStackTrace(err, console.trace);
            console.log(err.stack);
        } catch (e) {
            console.error(e);
        }
    };
})();`;
MultipleLifetimesAppWorker.PROCESS_TO_STRING_PATCH = `// As worker is ran in node, it breaks broadcast-channels package approach of identifying if it’s ran in node:
// https://github.com/pubkey/broadcast-channel/blob/master/src/util.js#L64
// To avoid it if process.toString() is called if will return empty string instead of [object process].
var nativeObjectToString = Object.prototype.toString;
Object.prototype.toString = function() {
    if (this === process) {
        return '';
    } else {
        return nativeObjectToString.call(this);
    }
};
`;
MultipleLifetimesAppWorker.WORKER_DONE = `// Notify debugger that we're done with loading
// and started listening for IPC messages
postMessage({workerLoaded:true});`;
MultipleLifetimesAppWorker.FETCH_STUB = `(function(self) {
        'use strict';
        if (self.fetch) {
          return
        }
        self.fetch = fetch;
        function fetch(url) {
            return new Promise((resolve, reject) => {
                var data = require("fs").readFileSync(url, 'utf8');
                resolve(
                    {
                        text: function () {
                            return data;
                        }
                    });
            });
        }
      })(global);`;
exports.MultipleLifetimesAppWorker = MultipleLifetimesAppWorker;

//# sourceMappingURL=appWorker.js.map
