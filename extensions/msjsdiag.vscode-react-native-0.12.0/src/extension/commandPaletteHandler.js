"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for details.
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const Q = require("q");
const XDL = require("./exponent/xdlInterface");
const settingsHelper_1 = require("./settingsHelper");
const OutputChannelLogger_1 = require("./log/OutputChannelLogger");
const androidPlatform_1 = require("./android/androidPlatform");
const iOSPlatform_1 = require("./ios/iOSPlatform");
const reactNativeProjectHelper_1 = require("../common/reactNativeProjectHelper");
const targetPlatformHelper_1 = require("../common/targetPlatformHelper");
const telemetryHelper_1 = require("../common/telemetryHelper");
const exponentPlatform_1 = require("./exponent/exponentPlatform");
const child_process_1 = require("child_process");
const hostPlatform_1 = require("../common/hostPlatform");
const nls = require("vscode-nls");
const errorHelper_1 = require("../common/error/errorHelper");
const internalErrorCode_1 = require("../common/error/internalErrorCode");
const localize = nls.loadMessageBundle(__filename);
class CommandPaletteHandler {
    static addFolder(workspaceFolder, stuff) {
        this.logger.debug(`Command palette: added folder ${workspaceFolder.uri.fsPath}`);
        this.projectsCache[workspaceFolder.uri.fsPath] = Object.assign({}, stuff, { workspaceFolder });
    }
    static getFolder(workspaceFolder) {
        return this.projectsCache[workspaceFolder.uri.fsPath];
    }
    static delFolder(workspaceFolder) {
        delete this.projectsCache[workspaceFolder.uri.fsPath];
    }
    /**
     * Starts the React Native packager
     */
    static startPackager() {
        return this.selectProject()
            .then((project) => {
            return this.executeCommandInContext("startPackager", project.workspaceFolder, () => {
                return project.packager.isRunning()
                    .then((running) => {
                    return running ? project.packager.stop() : Q.resolve(void 0);
                });
            })
                .then(() => project.packager.start());
        });
    }
    /**
     * Kills the React Native packager invoked by the extension's packager
     */
    static stopPackager() {
        return this.selectProject()
            .then((project) => {
            return this.executeCommandInContext("stopPackager", project.workspaceFolder, () => project.packager.stop());
        });
    }
    static stopAllPackagers() {
        let keys = Object.keys(this.projectsCache);
        let promises = [];
        keys.forEach((key) => {
            let project = this.projectsCache[key];
            promises.push(this.executeCommandInContext("stopPackager", project.workspaceFolder, () => project.packager.stop()));
        });
        return Q.all(promises).then(() => { });
    }
    /**
     * Restarts the React Native packager
     */
    static restartPackager() {
        return this.selectProject()
            .then((project) => {
            return this.executeCommandInContext("restartPackager", project.workspaceFolder, () => this.runRestartPackagerCommandAndUpdateStatus(project));
        });
    }
    /**
     * Execute command to publish to exponent host.
     */
    static publishToExpHost() {
        return this.selectProject()
            .then((project) => {
            return this.executeCommandInContext("publishToExpHost", project.workspaceFolder, () => {
                return this.executePublishToExpHost(project).then((didPublish) => {
                    if (!didPublish) {
                        CommandPaletteHandler.logger.warning(localize(0, null));
                    }
                });
            });
        });
    }
    /**
     * Executes the 'react-native run-android' command
     */
    static runAndroid(target = "simulator") {
        return this.selectProject()
            .then((project) => {
            targetPlatformHelper_1.TargetPlatformHelper.checkTargetPlatformSupport("android");
            return this.executeCommandInContext("runAndroid", project.workspaceFolder, () => {
                const platform = this.createPlatform(project, "android", androidPlatform_1.AndroidPlatform, target);
                return platform.beforeStartPackager()
                    .then(() => {
                    return platform.startPackager();
                })
                    .then(() => {
                    return platform.runApp(/*shouldLaunchInAllDevices*/ true);
                })
                    .then(() => {
                    return platform.disableJSDebuggingMode();
                });
            });
        });
    }
    /**
     * Executes the 'react-native run-ios' command
     */
    static runIos(target = "simulator") {
        return this.selectProject()
            .then((project) => {
            targetPlatformHelper_1.TargetPlatformHelper.checkTargetPlatformSupport("ios");
            return this.executeCommandInContext("runIos", project.workspaceFolder, () => {
                const platform = this.createPlatform(project, "ios", iOSPlatform_1.IOSPlatform, target);
                return platform.beforeStartPackager()
                    .then(() => {
                    return platform.startPackager();
                })
                    .then(() => {
                    // Set the Debugging setting to disabled, because in iOS it's persisted across runs of the app
                    return platform.disableJSDebuggingMode();
                })
                    .catch(() => { }) // If setting the debugging mode fails, we ignore the error and we run the run ios command anyways
                    .then(() => {
                    return platform.runApp();
                });
            });
        });
    }
    /**
     * Starts the Exponent packager
     */
    static runExponent() {
        return this.selectProject()
            .then((project) => {
            return this.loginToExponent(project)
                .then(() => {
                return this.executeCommandInContext("runExponent", project.workspaceFolder, () => {
                    const platform = this.createPlatform(project, "exponent", exponentPlatform_1.ExponentPlatform);
                    return platform.beforeStartPackager()
                        .then(() => {
                        return platform.startPackager();
                    })
                        .then(() => {
                        return platform.runApp();
                    });
                });
            });
        });
    }
    static showDevMenu() {
        return this.selectProject()
            .then((project) => {
            const androidPlatform = this.createPlatform(project, "android", androidPlatform_1.AndroidPlatform);
            androidPlatform.showDevMenu()
                .catch(() => { }); // Ignore any errors
            if (process.platform === "darwin") {
                const iosPlatform = this.createPlatform(project, "ios", iOSPlatform_1.IOSPlatform);
                iosPlatform.showDevMenu()
                    .catch(() => { }); // Ignore any errors
            }
            return Q.resolve(void 0);
        });
    }
    static reloadApp() {
        return this.selectProject()
            .then((project) => {
            const androidPlatform = this.createPlatform(project, "android", androidPlatform_1.AndroidPlatform);
            androidPlatform.reloadApp()
                .catch(() => { }); // Ignore any errors
            if (process.platform === "darwin") {
                const iosPlatform = this.createPlatform(project, "ios", iOSPlatform_1.IOSPlatform);
                iosPlatform.reloadApp()
                    .catch(() => { }); // Ignore any errors
            }
            return Q.resolve(void 0);
        });
    }
    static runElementInspector() {
        if (!CommandPaletteHandler.elementInspector) {
            // Remove the following env variables to prevent running electron app in node mode.
            // https://github.com/Microsoft/vscode/issues/3011#issuecomment-184577502
            let env = Object.assign({}, process.env);
            delete env.ATOM_SHELL_INTERNAL_RUN_AS_NODE;
            delete env.ELECTRON_RUN_AS_NODE;
            let command = hostPlatform_1.HostPlatform.getNpmCliCommand("react-devtools");
            CommandPaletteHandler.elementInspector = child_process_1.spawn(command, [], {
                env,
            });
            if (!CommandPaletteHandler.elementInspector.pid) {
                CommandPaletteHandler.elementInspector = null;
                return Q.reject(errorHelper_1.ErrorHelper.getInternalError(internalErrorCode_1.InternalErrorCode.ReactDevtoolsIsNotInstalled));
            }
            CommandPaletteHandler.elementInspector.stdout.on("data", (data) => {
                this.logger.info(data);
            });
            CommandPaletteHandler.elementInspector.stderr.on("data", (data) => {
                this.logger.error(data);
            });
            CommandPaletteHandler.elementInspector.once("exit", () => {
                CommandPaletteHandler.elementInspector = null;
            });
        }
        else {
            this.logger.info(localize(1, null));
        }
        return Q(void 0);
    }
    static stopElementInspector() {
        return CommandPaletteHandler.elementInspector ? CommandPaletteHandler.elementInspector.kill() : void 0;
    }
    static getPlatformByCommandName(commandName) {
        commandName = commandName.toLocaleLowerCase();
        if (commandName.indexOf("android") > -1) {
            return "android";
        }
        if (commandName.indexOf("ios") > -1) {
            return "ios";
        }
        if (commandName.indexOf("exponent") > -1) {
            return "exponent";
        }
        return "";
    }
    static createPlatform(project, platform, platformClass, target) {
        const runOptions = CommandPaletteHandler.getRunOptions(project, platform, target);
        return new platformClass(runOptions, {
            packager: project.packager,
        });
    }
    static runRestartPackagerCommandAndUpdateStatus(project) {
        return project.packager.restart(settingsHelper_1.SettingsHelper.getPackagerPort(project.workspaceFolder.uri.fsPath));
    }
    /**
     * Ensures that we are in a React Native project and then executes the operation
     * Otherwise, displays an error message banner
     * {operation} - a function that performs the expected operation
     */
    static executeCommandInContext(rnCommand, workspaceFolder, operation) {
        const extProps = {
            platform: {
                value: CommandPaletteHandler.getPlatformByCommandName(rnCommand),
                isPii: false,
            },
        };
        return telemetryHelper_1.TelemetryHelper.generate("RNCommand", extProps, (generator) => {
            generator.add("command", rnCommand, false);
            const projectRoot = settingsHelper_1.SettingsHelper.getReactNativeProjectRoot(workspaceFolder.uri.fsPath);
            this.logger.debug(`Command palette: run project ${projectRoot} in context`);
            return reactNativeProjectHelper_1.ReactNativeProjectHelper.isReactNativeProject(projectRoot)
                .then(isRNProject => {
                generator.add("isRNProject", isRNProject, false);
                if (isRNProject) {
                    // Bring the log channel to focus
                    this.logger.setFocusOnLogChannel();
                    // Execute the operation
                    return operation();
                }
                else {
                    vscode.window.showErrorMessage(`${projectRoot} workspace is not a React Native project.`);
                    return;
                }
            });
        });
    }
    /**
     * Publish project to exponent server. In order to do this we need to make sure the user is logged in exponent and the packager is running.
     */
    static executePublishToExpHost(project) {
        CommandPaletteHandler.logger.info(localize(2, null));
        return this.loginToExponent(project)
            .then(user => {
            CommandPaletteHandler.logger.debug(`Publishing as ${user.username}...`);
            return this.runExponent()
                .then(() => XDL.publish(project.workspaceFolder.uri.fsPath))
                .then(response => {
                if (response.err || !response.url) {
                    return false;
                }
                const publishedOutput = localize(3, null, response.url);
                CommandPaletteHandler.logger.info(publishedOutput);
                vscode.window.showInformationMessage(publishedOutput);
                return true;
            });
        });
    }
    static loginToExponent(project) {
        return project.exponentHelper.loginToExponent((message, password) => {
            return Q.Promise((resolve, reject) => {
                vscode.window.showInputBox({ placeHolder: message, password: password })
                    .then(login => {
                    resolve(login || "");
                }, reject);
            });
        }, (message) => {
            return Q.Promise((resolve, reject) => {
                vscode.window.showInformationMessage(message)
                    .then(password => {
                    resolve(password || "");
                }, reject);
            });
        })
            .catch((err) => {
            CommandPaletteHandler.logger.warning(localize(4, null));
            throw err;
        });
    }
    static selectProject() {
        let keys = Object.keys(this.projectsCache);
        if (keys.length > 1) {
            return Q.Promise((resolve, reject) => {
                vscode.window.showQuickPick(keys)
                    .then((selected) => {
                    if (selected) {
                        this.logger.debug(`Command palette: selected project ${selected}`);
                        resolve(this.projectsCache[selected]);
                    }
                }, reject);
            });
        }
        else if (keys.length === 1) {
            this.logger.debug(`Command palette: once project ${keys[0]}`);
            return Q.resolve(this.projectsCache[keys[0]]);
        }
        else {
            return Q.reject(errorHelper_1.ErrorHelper.getInternalError(internalErrorCode_1.InternalErrorCode.WorkspaceNotFound, "Current workspace does not contain React Native projects."));
        }
    }
    static getRunOptions(project, platform, target = "simulator") {
        const packagerPort = settingsHelper_1.SettingsHelper.getPackagerPort(project.workspaceFolder.uri.fsPath);
        const runArgs = settingsHelper_1.SettingsHelper.getRunArgs(platform, target, project.workspaceFolder.uri);
        const envArgs = settingsHelper_1.SettingsHelper.getEnvArgs(platform, target, project.workspaceFolder.uri);
        const envFile = settingsHelper_1.SettingsHelper.getEnvFile(platform, target, project.workspaceFolder.uri);
        const projectRoot = settingsHelper_1.SettingsHelper.getReactNativeProjectRoot(project.workspaceFolder.uri.fsPath);
        const runOptions = {
            platform: platform,
            workspaceRoot: project.workspaceFolder.uri.fsPath,
            projectRoot: projectRoot,
            packagerPort: packagerPort,
            runArguments: runArgs,
            env: envArgs,
            envFile: envFile,
        };
        return runOptions;
    }
}
CommandPaletteHandler.projectsCache = {};
CommandPaletteHandler.logger = OutputChannelLogger_1.OutputChannelLogger.getMainChannel();
exports.CommandPaletteHandler = CommandPaletteHandler;

//# sourceMappingURL=commandPaletteHandler.js.map
