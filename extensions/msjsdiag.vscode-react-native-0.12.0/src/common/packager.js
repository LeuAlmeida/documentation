"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for details.
Object.defineProperty(exports, "__esModule", { value: true });
const commandExecutor_1 = require("./commandExecutor");
const exponentHelper_1 = require("../extension/exponent/exponentHelper");
const errorHelper_1 = require("./error/errorHelper");
const internalErrorCode_1 = require("./error/internalErrorCode");
const OutputChannelLogger_1 = require("../extension/log/OutputChannelLogger");
const node_1 = require("./node/node");
const package_1 = require("./node/package");
const promise_1 = require("./node/promise");
const request_1 = require("./node/request");
const reactNativeProjectHelper_1 = require("./reactNativeProjectHelper");
const packagerStatusIndicator_1 = require("../extension/packagerStatusIndicator");
const settingsHelper_1 = require("../extension/settingsHelper");
const Q = require("q");
const path = require("path");
const XDL = require("../extension/exponent/xdlInterface");
const semver = require("semver");
const nls = require("vscode-nls");
const localize = nls.loadMessageBundle(__filename);
class Packager {
    constructor(workspacePath, projectPath, packagerPort, packagerStatusIndicator) {
        this.workspacePath = workspacePath;
        this.projectPath = projectPath;
        this.packagerPort = packagerPort;
        this.logger = OutputChannelLogger_1.OutputChannelLogger.getChannel(OutputChannelLogger_1.OutputChannelLogger.MAIN_CHANNEL_NAME, true);
        this.packagerStatus = packagerStatusIndicator_1.PackagerStatus.PACKAGER_STOPPED;
        this.packagerStatusIndicator = packagerStatusIndicator || new packagerStatusIndicator_1.PackagerStatusIndicator();
        this.expoHelper = new exponentHelper_1.ExponentHelper(this.workspacePath, this.projectPath);
    }
    get port() {
        return this.packagerPort || settingsHelper_1.SettingsHelper.getPackagerPort(this.workspacePath);
    }
    static getHostForPort(port) {
        return `localhost:${port}`;
    }
    get statusIndicator() {
        return this.packagerStatusIndicator;
    }
    getHost() {
        return Packager.getHostForPort(this.port);
    }
    getPackagerStatus() {
        return this.packagerStatus;
    }
    getPackagerArgs(rnVersion, resetCache = false) {
        let args = ["--port", this.port.toString()];
        if (resetCache) {
            args = args.concat("--resetCache");
        }
        return this.expoHelper.isExpoApp(false)
            .then((isExpo) => {
            if (!isExpo) {
                return args;
            }
            // Arguments below using for Expo apps
            if (!semver.gte(rnVersion, "0.57.0")) {
                args.push("--root", path.relative(this.projectPath, path.resolve(this.workspacePath, ".vscode")));
            }
            return this.expoHelper.getExpPackagerOptions()
                .then((options) => {
                Object.keys(options).forEach(key => {
                    args = args.concat([`--${key}`, options[key]]);
                });
                return args;
            })
                .catch(() => {
                this.logger.warning(localize(0, null));
                return args;
            });
        });
    }
    start(resetCache = false) {
        this.packagerStatusIndicator.updatePackagerStatus(packagerStatusIndicator_1.PackagerStatus.PACKAGER_STARTING);
        let executedStartPackagerCmd = false;
        let rnVersion;
        return this.isRunning()
            .then((running) => {
            if (running) {
                return void 0;
            }
            executedStartPackagerCmd = true;
            return reactNativeProjectHelper_1.ReactNativeProjectHelper.getReactNativeVersion(this.projectPath)
                .then((version) => {
                rnVersion = version;
                return this.monkeyPatchOpnForRNPackager(rnVersion);
            })
                .then((version) => {
                return this.getPackagerArgs(rnVersion, resetCache);
            })
                .then((args) => {
                //  There is a bug with launching VSCode editor for file from stack frame in 0.38, 0.39, 0.40 versions:
                //  https://github.com/facebook/react-native/commit/f49093f39710173620fead6230d62cc670570210
                //  This bug will be fixed in 0.41
                const failedRNVersions = ["0.38.0", "0.39.0", "0.40.0"];
                let reactEnv = Object.assign({}, process.env, {
                    REACT_DEBUGGER: "echo A debugger is not needed: ",
                    REACT_EDITOR: failedRNVersions.indexOf(rnVersion) < 0 ? "code" : this.openFileAtLocationCommand(),
                });
                this.logger.info(localize(1, null));
                // The packager will continue running while we debug the application, so we can"t
                // wait for this command to finish
                let spawnOptions = { env: reactEnv };
                const packagerSpawnResult = new commandExecutor_1.CommandExecutor(this.projectPath, this.logger).spawnReactPackager(args, spawnOptions);
                this.packagerProcess = packagerSpawnResult.spawnedProcess;
                packagerSpawnResult.outcome.done(() => { }, () => { }); // Q prints a warning if we don't call .done(). We ignore all outcome errors
                return packagerSpawnResult.startup;
            });
        })
            .then(() => {
            return this.awaitStart();
        })
            .then(() => {
            this.packagerStatusIndicator.updatePackagerStatus(packagerStatusIndicator_1.PackagerStatus.PACKAGER_STARTED);
            if (executedStartPackagerCmd) {
                this.logger.info(localize(2, null));
                this.packagerStatus = packagerStatusIndicator_1.PackagerStatus.PACKAGER_STARTED;
            }
            else {
                this.logger.info(localize(3, null));
                if (!this.packagerProcess) {
                    this.logger.warning(errorHelper_1.ErrorHelper.getWarning(localize(4, null)));
                }
            }
        });
    }
    stop(silent = false) {
        this.packagerStatusIndicator.updatePackagerStatus(packagerStatusIndicator_1.PackagerStatus.PACKAGER_STOPPING);
        return this.isRunning()
            .then(running => {
            if (running) {
                if (!this.packagerProcess) {
                    if (!silent) {
                        this.logger.warning(errorHelper_1.ErrorHelper.getWarning(localize(5, null)));
                    }
                    return Q.resolve(void 0);
                }
                return this.killPackagerProcess();
            }
            else {
                if (!silent) {
                    this.logger.warning(errorHelper_1.ErrorHelper.getWarning(localize(6, null)));
                }
                return Q.resolve(void 0);
            }
        }).then(() => {
            this.packagerStatus = packagerStatusIndicator_1.PackagerStatus.PACKAGER_STOPPED;
            this.packagerStatusIndicator.updatePackagerStatus(packagerStatusIndicator_1.PackagerStatus.PACKAGER_STOPPED);
        });
    }
    restart(port) {
        if (this.port && this.port !== port) {
            return Q.reject(errorHelper_1.ErrorHelper.getInternalError(internalErrorCode_1.InternalErrorCode.PackagerRunningInDifferentPort, port, this.port));
        }
        return this.isRunning()
            .then(running => {
            if (running) {
                if (!this.packagerProcess) {
                    this.logger.warning(errorHelper_1.ErrorHelper.getWarning(localize(7, null)));
                    return Q.resolve(false);
                }
                return this.killPackagerProcess().then(() => Q.resolve(true));
            }
            else {
                this.logger.warning(errorHelper_1.ErrorHelper.getWarning(localize(8, null)));
                return Q.resolve(true);
            }
        })
            .then(stoppedOK => {
            if (stoppedOK) {
                return this.start(true);
            }
            else {
                return Q.resolve(void 0);
            }
        });
    }
    prewarmBundleCache(platform) {
        if (platform === "exponent") {
            return Q.resolve(void 0);
        }
        return this.isRunning()
            .then(running => {
            if (!running) {
                return void 0;
            }
            const defaultIndex = path.resolve(this.projectPath, "index.js");
            const oldIndex = path.resolve(this.projectPath, `index.${platform}.js`); // react-native < 0.49.0
            return Q.all([Packager.fs.exists(defaultIndex), Packager.fs.exists(oldIndex)])
                .then((exists) => {
                let bundleName = "";
                if (exists[0]) {
                    bundleName = "index.bundle";
                }
                else if (exists[1]) {
                    bundleName = `index.${platform}.bundle`;
                }
                else {
                    this.logger.info(localize(9, null, platform));
                    return;
                }
                const bundleURL = `http://${this.getHost()}/${bundleName}?platform=${platform}`;
                this.logger.info(localize(10, null, bundleURL));
                return request_1.Request.request(bundleURL, true)
                    .then(() => {
                    this.logger.warning(localize(11, null));
                });
            })
                .catch(() => {
                // The attempt to prefetch the bundle failed. This may be because the bundle has
                // a different name that the one we guessed so we shouldn't treat this as fatal.
            });
        });
    }
    isRunning() {
        let statusURL = `http://${this.getHost()}/status`;
        return request_1.Request.request(statusURL)
            .then((body) => {
            return body === "packager-status:running";
        }, (error) => {
            return false;
        });
    }
    awaitStart(retryCount = 30, delay = 2000) {
        let pu = new promise_1.PromiseUtil();
        return pu.retryAsync(() => this.isRunning(), (running) => running, retryCount, delay, localize(12, null));
    }
    findOpnPackage(ReactNativeVersion) {
        try {
            let OPN_PACKAGE_NAME;
            if (semver.gte(ReactNativeVersion, Packager.RN_VERSION_WITH_OPEN_PKG)) {
                OPN_PACKAGE_NAME = Packager.OPN_PACKAGE_NAME.new;
            }
            else {
                OPN_PACKAGE_NAME = Packager.OPN_PACKAGE_NAME.old;
            }
            let flatDependencyPackagePath = path.resolve(this.projectPath, Packager.NODE_MODULES_FODLER_NAME, OPN_PACKAGE_NAME, Packager.OPN_PACKAGE_MAIN_FILENAME);
            let nestedDependencyPackagePath = path.resolve(this.projectPath, Packager.NODE_MODULES_FODLER_NAME, Packager.REACT_NATIVE_PACKAGE_NAME, Packager.NODE_MODULES_FODLER_NAME, OPN_PACKAGE_NAME, Packager.OPN_PACKAGE_MAIN_FILENAME);
            let fsHelper = new node_1.Node.FileSystem();
            // Attempt to find the 'opn' package directly under the project's node_modules folder (node4 +)
            // Else, attempt to find the package within the dependent node_modules of react-native package
            let possiblePaths = [flatDependencyPackagePath, nestedDependencyPackagePath];
            return Q.any(possiblePaths.map(fsPath => fsHelper.exists(fsPath).then(exists => exists
                ? Q.resolve(fsPath)
                : Q.reject(errorHelper_1.ErrorHelper.getInternalError(internalErrorCode_1.InternalErrorCode.OpnPackagerLocationNotFound)))));
        }
        catch (err) {
            return Q.reject(errorHelper_1.ErrorHelper.getInternalError(internalErrorCode_1.InternalErrorCode.OpnPackagerNotFound, err));
        }
    }
    monkeyPatchOpnForRNPackager(ReactNativeVersion) {
        let opnPackage;
        let destnFilePath;
        // Finds the 'opn' or 'open' package
        return this.findOpnPackage(ReactNativeVersion)
            .then((opnIndexFilePath) => {
            destnFilePath = opnIndexFilePath;
            // Read the package's "package.json"
            opnPackage = new package_1.Package(path.resolve(path.dirname(destnFilePath)));
            return opnPackage.parsePackageInformation();
        }).then((packageJson) => {
            let JS_INJECTOR_FILEPATH;
            let JS_INJECTOR_FILENAME;
            if (semver.gte(ReactNativeVersion, Packager.RN_VERSION_WITH_OPEN_PKG)) {
                JS_INJECTOR_FILENAME = Packager.JS_INJECTOR_FILENAME.new;
            }
            else {
                JS_INJECTOR_FILENAME = Packager.JS_INJECTOR_FILENAME.old;
            }
            JS_INJECTOR_FILEPATH = path.resolve(Packager.JS_INJECTOR_DIRPATH, JS_INJECTOR_FILENAME);
            if (packageJson.main !== JS_INJECTOR_FILENAME) {
                // Copy over the patched 'opn' main file
                return new node_1.Node.FileSystem().copyFile(JS_INJECTOR_FILEPATH, path.resolve(path.dirname(destnFilePath), JS_INJECTOR_FILENAME))
                    .then(() => {
                    // Write/over-write the "main" attribute with the new file
                    return opnPackage.setMainFile(JS_INJECTOR_FILENAME);
                });
            }
            return Q.resolve(void 0);
        });
    }
    killPackagerProcess() {
        this.logger.info(localize(13, null));
        return new commandExecutor_1.CommandExecutor(this.projectPath, this.logger).killReactPackager(this.packagerProcess).then(() => {
            this.packagerProcess = undefined;
            let helper = new exponentHelper_1.ExponentHelper(this.workspacePath, this.projectPath);
            return helper.isExpoApp(false)
                .then((isExpo) => {
                if (isExpo) {
                    this.logger.debug("Stopping Exponent");
                    return XDL.stopAll(this.projectPath)
                        .then(() => {
                        this.logger.debug("Exponent Stopped");
                    })
                        .catch((err) => {
                        if (err.code === "NOT_LOGGED_IN") {
                            return void (0);
                        }
                        throw err;
                    });
                }
                else {
                    return void (0);
                }
            });
        });
    }
    openFileAtLocationCommand() {
        let atomScript = "node " + path.join(__dirname, "..", "..", "scripts", "atom");
        //  shell-quote package incorrectly parses windows paths
        //  https://github.com/facebook/react-native/blob/master/local-cli/server/util/launchEditor.js#L83
        if (process.platform === "win32") {
            return atomScript.replace(/\\/g, "/");
        }
        return atomScript;
    }
}
Packager.DEFAULT_PORT = 8081;
// old name for RN < 0.60.0, new for versions >= 0.60.0
Packager.JS_INJECTOR_FILENAME = {
    new: "open-main.js",
    old: "opn-main.js",
};
Packager.RN_VERSION_WITH_OPEN_PKG = "0.60.0";
Packager.JS_INJECTOR_DIRPATH = path.resolve(path.dirname(path.dirname(__dirname)), "js-patched");
Packager.NODE_MODULES_FODLER_NAME = "node_modules";
Packager.OPN_PACKAGE_NAME = {
    new: "open",
    old: "opn",
};
Packager.REACT_NATIVE_PACKAGE_NAME = "react-native";
Packager.OPN_PACKAGE_MAIN_FILENAME = "index.js";
Packager.fs = new node_1.Node.FileSystem();
exports.Packager = Packager;

//# sourceMappingURL=packager.js.map
