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
const Q = require("q");
const path = require("path");
const fs = require("fs");
const stripJsonComments = require("strip-json-comments");
const telemetry_1 = require("../common/telemetry");
const telemetryHelper_1 = require("../common/telemetryHelper");
const remoteExtension_1 = require("../common/remoteExtension");
const telemetryReporters_1 = require("../common/telemetryReporters");
const vscode_chrome_debug_core_1 = require("vscode-chrome-debug-core");
const vscode_debugadapter_1 = require("vscode-debugadapter");
const appWorker_1 = require("./appWorker");
const reactNativeProjectHelper_1 = require("../common/reactNativeProjectHelper");
const nls = require("vscode-nls");
const errorHelper_1 = require("../common/error/errorHelper");
const internalErrorCode_1 = require("../common/error/internalErrorCode");
const LogHelper_1 = require("../extension/log/LogHelper");
const mkdirp = require("mkdirp");
const localize = nls.loadMessageBundle(__filename);
function makeSession(debugSessionClass, debugSessionOpts, telemetryReporter, appName, version) {
    return class extends debugSessionClass {
        constructor(debuggerLinesAndColumnsStartAt1, isServer) {
            super(debuggerLinesAndColumnsStartAt1, isServer, debugSessionOpts);
            this.appWorker = null;
        }
        // Override ChromeDebugSession's sendEvent to control what we will send to client
        sendEvent(event) {
            // Do not send "terminated" events signaling about session's restart to client as it would cause it
            // to restart adapter's process, while we want to stay alive and don't want to interrupt connection
            // to packager.
            if (event.event === "terminated" && event.body && event.body.restart) {
                // Worker has been reloaded and switched to "continue" state
                // So we have to send "continued" event to client instead of "terminated"
                // Otherwise client might mistakenly show "stopped" state
                let continuedEvent = {
                    event: "continued",
                    type: "event",
                    seq: event["seq"],
                    body: { threadId: event.body.threadId },
                };
                super.sendEvent(continuedEvent);
                return;
            }
            super.sendEvent(event);
        }
        dispatchRequest(request) {
            if (request.command === "disconnect")
                return this.disconnect(request);
            if (request.command === "attach")
                return this.attach(request);
            if (request.command === "launch")
                return this.launch(request);
            return super.dispatchRequest(request);
        }
        launch(request) {
            this.requestSetup(request.arguments)
                .then(() => {
                vscode_chrome_debug_core_1.logger.verbose(`Handle launch request: ${JSON.stringify(request.arguments, null, 2)}`);
                return this.remoteExtension.launch(request);
            })
                .then(() => {
                return this.remoteExtension.getPackagerPort(request.arguments.cwd || request.arguments.program);
            })
                .then((packagerPort) => {
                this.attachRequest(Object.assign({}, request, { arguments: Object.assign({}, request.arguments, { port: packagerPort }) }));
            })
                .catch(error => {
                this.bailOut(error.data || error.message);
            });
        }
        attach(request) {
            this.requestSetup(request.arguments)
                .then(() => {
                vscode_chrome_debug_core_1.logger.verbose(`Handle attach request: ${JSON.stringify(request.arguments, null, 2)}`);
                return this.remoteExtension.getPackagerPort(request.arguments.cwd || request.arguments.program);
            })
                .then((packagerPort) => {
                this.attachRequest(Object.assign({}, request, { arguments: Object.assign({}, request.arguments, { port: request.arguments.port || packagerPort }) }));
            })
                .catch(error => {
                this.bailOut(error.data || error.message);
            });
        }
        disconnect(request) {
            // The client is about to disconnect so first we need to stop app worker
            if (this.appWorker) {
                this.appWorker.stop();
            }
            // Then we tell the extension to stop monitoring the logcat, and then we disconnect the debugging session
            if (request.arguments.platform === "android") {
                this.remoteExtension.stopMonitoringLogcat()
                    .catch(reason => vscode_chrome_debug_core_1.logger.warn(localize(0, null, reason.message || reason)))
                    .finally(() => super.dispatchRequest(request));
            }
            else {
                super.dispatchRequest(request);
            }
        }
        requestSetup(args) {
            // If special env variables are defined, then write process outputs to file
            let chromeDebugCoreLogs = LogHelper_1.getLoggingDirectory();
            if (chromeDebugCoreLogs) {
                chromeDebugCoreLogs = path.join(chromeDebugCoreLogs, "ChromeDebugCoreLogs.txt");
            }
            let logLevel = args.trace;
            if (logLevel) {
                logLevel = logLevel.replace(logLevel[0], logLevel[0].toUpperCase());
                vscode_chrome_debug_core_1.logger.setup(vscode_debugadapter_1.Logger.LogLevel[logLevel], chromeDebugCoreLogs || false);
            }
            else {
                vscode_chrome_debug_core_1.logger.setup(vscode_debugadapter_1.Logger.LogLevel.Log, chromeDebugCoreLogs || false);
            }
            if (!args.sourceMaps) {
                args.sourceMaps = true;
            }
            const projectRootPath = getProjectRoot(args);
            return reactNativeProjectHelper_1.ReactNativeProjectHelper.isReactNativeProject(projectRootPath)
                .then((result) => {
                if (!result) {
                    throw errorHelper_1.ErrorHelper.getInternalError(internalErrorCode_1.InternalErrorCode.NotInReactNativeFolderError);
                }
                this.projectRootPath = projectRootPath;
                this.remoteExtension = remoteExtension_1.RemoteExtension.atProjectRootPath(this.projectRootPath);
                // Start to send telemetry
                telemetryReporter.reassignTo(new telemetryReporters_1.RemoteTelemetryReporter(appName, version, telemetry_1.Telemetry.APPINSIGHTS_INSTRUMENTATIONKEY, this.projectRootPath));
                if (args.program) {
                    // TODO: Remove this warning when program property will be completely removed
                    vscode_chrome_debug_core_1.logger.warn(localize(1, null));
                    const useProgramEvent = telemetryHelper_1.TelemetryHelper.createTelemetryEvent("useProgramProperty");
                    telemetry_1.Telemetry.send(useProgramEvent);
                }
                if (args.cwd) {
                    // To match count of 'cwd' users with 'program' users. TODO: Remove when program property will be removed
                    const useCwdEvent = telemetryHelper_1.TelemetryHelper.createTelemetryEvent("useCwdProperty");
                    telemetry_1.Telemetry.send(useCwdEvent);
                }
                return void 0;
            });
        }
        /**
         * Runs logic needed to attach.
         * Attach should:
         * - Enable js debugging
         */
        // tslint:disable-next-line:member-ordering
        attachRequest(request) {
            const extProps = {
                platform: {
                    value: request.arguments.platform,
                    isPii: false,
                },
            };
            return telemetryHelper_1.TelemetryHelper.generate("attach", extProps, (generator) => {
                return Q({})
                    .then(() => {
                    vscode_chrome_debug_core_1.logger.log(localize(2, null));
                    // TODO: remove dependency on args.program - "program" property is technically
                    // no more required in launch configuration and could be removed
                    const workspaceRootPath = request.arguments.cwd ? path.resolve(request.arguments.cwd) : path.resolve(path.dirname(request.arguments.program), "..");
                    const sourcesStoragePath = path.join(workspaceRootPath, ".vscode", ".react");
                    // Create folder if not exist to avoid problems if
                    // RN project root is not a ${workspaceFolder}
                    mkdirp.sync(sourcesStoragePath);
                    // If launch is invoked first time, appWorker is undefined, so create it here
                    this.appWorker = new appWorker_1.MultipleLifetimesAppWorker(request.arguments, sourcesStoragePath, this.projectRootPath, undefined);
                    this.appWorker.on("connected", (port) => {
                        vscode_chrome_debug_core_1.logger.log(localize(3, null, port));
                        // Don't mutate original request to avoid side effects
                        let attachArguments = Object.assign({}, request.arguments, {
                            address: "localhost",
                            port,
                            restart: true,
                            request: "attach",
                            remoteRoot: undefined,
                            localRoot: undefined,
                        });
                        // Reinstantiate debug adapter, as the current implementation of ChromeDebugAdapter
                        // doesn't allow us to reattach to another debug target easily. As of now it's easier
                        // to throw previous instance out and create a new one.
                        this._debugAdapter = new debugSessionOpts.adapter(debugSessionOpts, this);
                        // Explicity call _debugAdapter.attach() to prevent directly calling dispatchRequest()
                        // yield a response as "attach" even for "launch" request. Because dispatchRequest() will
                        // decide to do a sendResponse() aligning with the request parameter passed in.
                        Q(this._debugAdapter.attach(attachArguments, request.seq))
                            .then((responseBody) => {
                            const response = new vscode_debugadapter_1.Response(request);
                            response.body = responseBody;
                            this.sendResponse(response);
                        });
                    });
                    return this.appWorker.start();
                })
                    .catch(error => this.bailOut(error.message));
            });
        }
        /**
         * Logs error to user and finishes the debugging process.
         */
        bailOut(message) {
            vscode_chrome_debug_core_1.logger.error(localize(4, null, message));
            this.sendEvent(new vscode_debugadapter_1.TerminatedEvent());
        }
    };
}
exports.makeSession = makeSession;
function makeAdapter(debugAdapterClass) {
    return class extends debugAdapterClass {
        constructor() {
            super(...arguments);
            this.firstStop = true;
        }
        doAttach(port, targetUrl, address, timeout) {
            // We need to overwrite ChromeDebug's _attachMode to let Node2 adapter
            // to set up breakpoints on initial pause event
            this._attachMode = false;
            return super.doAttach(port, targetUrl, address, timeout);
        }
        // Since the bundle runs inside the Node.js VM in debuggerWorker.js in runtime
        // Node debug adapter need time to parse new added code source maps
        // So we added 'debugger;' statement at the start of the bundle code
        // and wait for the adapter to receive a signal to stop on that statement
        // and then wait for code bundle to be processed and then send continue request to skip the code execution stop in VS Code UI
        onPaused(notification, expectingStopReason) {
            // When pause on 'debugger;' statement, notification contains reason with value "other" instead of "breakpoint"
            if (this.firstStop && notification.reason === "other") {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        this.firstStop = false;
                        this.continue();
                        resolve({ didPause: false });
                    }, 50);
                });
            }
            else {
                return super.onPaused(notification, expectingStopReason);
            }
        }
        terminate(args) {
            return __awaiter(this, void 0, void 0, function* () {
                return this.disconnect({
                    terminateDebuggee: true,
                });
            });
        }
    };
}
exports.makeAdapter = makeAdapter;
/**
 * Parses settings.json file for workspace root property
 */
function getProjectRoot(args) {
    try {
        let vsCodeRoot = args.cwd ? path.resolve(args.cwd) : path.resolve(args.program, "../..");
        let settingsPath = path.resolve(vsCodeRoot, ".vscode/settings.json");
        let settingsContent = fs.readFileSync(settingsPath, "utf8");
        settingsContent = stripJsonComments(settingsContent);
        let parsedSettings = JSON.parse(settingsContent);
        let projectRootPath = parsedSettings["react-native-tools.projectRoot"] || parsedSettings["react-native-tools"].projectRoot;
        return path.resolve(vsCodeRoot, projectRootPath);
    }
    catch (e) {
        return args.cwd ? path.resolve(args.cwd) : path.resolve(args.program, "../..");
    }
}
exports.getProjectRoot = getProjectRoot;

//# sourceMappingURL=nodeDebugWrapper.js.map
