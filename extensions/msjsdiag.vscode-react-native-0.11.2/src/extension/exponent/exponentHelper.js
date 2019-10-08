"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for details.
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="exponentHelper.d.ts" />
const path = require("path");
const Q = require("q");
const XDL = require("./xdlInterface");
const package_1 = require("../../common/node/package");
const reactNativeProjectHelper_1 = require("../../common/reactNativeProjectHelper");
const fileSystem_1 = require("../../common/node/fileSystem");
const OutputChannelLogger_1 = require("../log/OutputChannelLogger");
const stripJSONComments = require("strip-json-comments");
const nls = require("vscode-nls");
const errorHelper_1 = require("../../common/error/errorHelper");
const internalErrorCode_1 = require("../../common/error/internalErrorCode");
const localize = nls.loadMessageBundle(__filename);
const APP_JSON = "app.json";
const EXP_JSON = "exp.json";
const EXPONENT_INDEX = "exponentIndex.js";
const DEFAULT_EXPONENT_INDEX = "index.js";
const DEFAULT_IOS_INDEX = "index.ios.js";
const DEFAULT_ANDROID_INDEX = "index.android.js";
const DBL_SLASHES = /\\/g;
class ExponentHelper {
    constructor(workspaceRootPath, projectRootPath, fs = new fileSystem_1.FileSystem()) {
        this.logger = OutputChannelLogger_1.OutputChannelLogger.getMainChannel();
        this.workspaceRootPath = workspaceRootPath;
        this.projectRootPath = projectRootPath;
        this.fs = fs;
        this.hasInitialized = false;
        // Constructor is slim by design. This is to add as less computation as possible
        // to the initialization of the extension. If a public method is added, make sure
        // to call this.lazilyInitialize() at the begining of the code to be sure all variables
        // are correctly initialized.
    }
    configureExponentEnvironment() {
        this.lazilyInitialize();
        this.logger.info(localize(0, null));
        this.logger.logStream(localize(1, null));
        let isExpo;
        return this.isExpoApp(true)
            .then(result => {
            isExpo = result;
            if (!isExpo) {
                return this.appHasExpoInstalled().then((expoInstalled) => {
                    if (!expoInstalled) {
                        // Expo requires expo package to be installed inside RN application in order to be able to run it
                        // https://github.com/expo/expo-cli/issues/255#issuecomment-453214632
                        this.logger.logStream("\n");
                        this.logger.logStream(localize(2, null));
                        this.logger.logStream("\n");
                    }
                });
            }
            return;
        }).then(() => {
            this.logger.logStream(".\n");
            return this.patchAppJson(isExpo);
        });
    }
    /**
     * Returns the current user. If there is none, asks user for username and password and logins to exponent servers.
     */
    loginToExponent(promptForInformation, showMessage) {
        this.lazilyInitialize();
        return XDL.currentUser()
            .then((user) => {
            if (!user) {
                let username = "";
                return showMessage(localize(3, null))
                    .then(() => promptForInformation(localize(4, null), false)).then((name) => {
                    username = name;
                    return promptForInformation(localize(5, null), true);
                })
                    .then((password) => XDL.login(username, password));
            }
            return user;
        })
            .catch(error => {
            return Q.reject(error);
        });
    }
    getExpPackagerOptions() {
        this.lazilyInitialize();
        return this.getFromExpConfig("packagerOpts")
            .then(opts => opts || {});
    }
    appHasExpoInstalled() {
        return this.getAppPackageInformation()
            .then((packageJson) => {
            if (packageJson.dependencies && packageJson.dependencies.expo) {
                this.logger.debug("'expo' package is found in 'dependencies' section of package.json");
                return true;
            }
            else if (packageJson.devDependencies && packageJson.devDependencies.expo) {
                this.logger.debug("'expo' package is found in 'devDependencies' section of package.json");
                return true;
            }
            return false;
        });
    }
    appHasExpoRNSDKInstalled() {
        return this.getAppPackageInformation()
            .then((packageJson) => {
            const reactNativeValue = packageJson.dependencies && packageJson.dependencies["react-native"];
            if (reactNativeValue) {
                this.logger.debug(`'react-native' package with value '${reactNativeValue}' is found in 'dependencies' section of package.json`);
                if (reactNativeValue.startsWith("https://github.com/expo/react-native/archive/sdk")) {
                    return true;
                }
            }
            return false;
        });
    }
    isExpoApp(showProgress = false) {
        if (showProgress) {
            this.logger.logStream("...");
        }
        return Q.all([
            this.appHasExpoInstalled(),
            this.appHasExpoRNSDKInstalled(),
        ]).spread((expoInstalled, expoRNSDKInstalled) => {
            if (showProgress)
                this.logger.logStream(".");
            return expoInstalled && expoRNSDKInstalled;
        }).catch((e) => {
            this.logger.error(e.message, e, e.stack);
            if (showProgress) {
                this.logger.logStream(".");
            }
            // Not in a react-native project
            return false;
        });
    }
    /**
     * Path to a given file inside the .vscode directory
     */
    dotvscodePath(filename, isAbsolute) {
        let paths = [".vscode", filename];
        if (isAbsolute) {
            paths = [this.workspaceRootPath].concat(...paths);
        }
        return path.join(...paths);
    }
    createExpoEntry(name) {
        this.lazilyInitialize();
        return this.detectEntry()
            .then((entryPoint) => {
            const content = this.generateFileContent(name, entryPoint);
            return this.fs.writeFile(this.dotvscodePath(EXPONENT_INDEX, true), content);
        });
    }
    detectEntry() {
        this.lazilyInitialize();
        return Q.all([
            this.fs.exists(this.pathToFileInWorkspace(DEFAULT_EXPONENT_INDEX)),
            this.fs.exists(this.pathToFileInWorkspace(DEFAULT_IOS_INDEX)),
            this.fs.exists(this.pathToFileInWorkspace(DEFAULT_ANDROID_INDEX)),
        ])
            .spread((expo, ios) => {
            return expo ? this.pathToFileInWorkspace(DEFAULT_EXPONENT_INDEX) :
                ios ? this.pathToFileInWorkspace(DEFAULT_IOS_INDEX) :
                    this.pathToFileInWorkspace(DEFAULT_ANDROID_INDEX);
        });
    }
    generateFileContent(name, entryPoint) {
        return `// This file is automatically generated by VS Code
// Please do not modify it manually. All changes will be lost.
var React = require('${this.pathToFileInWorkspace("/node_modules/react")}');
var { Component } = React;
var ReactNative = require('${this.pathToFileInWorkspace("/node_modules/react-native")}');
var { AppRegistry } = ReactNative;
var entryPoint = require('${entryPoint}');
AppRegistry.registerRunnable('main', function(appParameters) {
    AppRegistry.runApplication('${name}', appParameters);
});`;
    }
    patchAppJson(isExpo = true) {
        return this.readAppJson()
            .catch(() => {
            // if app.json doesn't exist but it's ok, we will create it
            return {};
        })
            .then((config) => {
            let expoConfig = (config.expo || {});
            if (!expoConfig.name || !expoConfig.slug) {
                return this.getPackageName()
                    .then((name) => {
                    expoConfig.slug = expoConfig.slug || config.name || name.replace(" ", "-");
                    expoConfig.name = expoConfig.name || config.name || name;
                    config.expo = expoConfig;
                    return config;
                });
            }
            return config;
        })
            .then((config) => {
            if (!config.name) {
                return this.getPackageName()
                    .then((name) => {
                    config.name = name;
                    return config;
                });
            }
            return config;
        })
            .then((config) => {
            if (!config.expo.sdkVersion) {
                return this.exponentSdk(true)
                    .then(sdkVersion => {
                    config.expo.sdkVersion = sdkVersion;
                    return config;
                });
            }
            return config;
        })
            .then((config) => {
            if (!isExpo) {
                // entryPoint must be relative
                // https://docs.expo.io/versions/latest/workflow/configuration/#entrypoint
                config.expo.entryPoint = this.dotvscodePath(EXPONENT_INDEX, false);
            }
            return config;
        })
            .then((config) => {
            return config ? this.writeAppJson(config) : config;
        })
            .then((config) => {
            return isExpo ? Q.resolve(void 0) : this.createExpoEntry(config.expo.name);
        });
    }
    /**
     * Exponent sdk version that maps to the current react-native version
     * If react native version is not supported it returns null.
     */
    exponentSdk(showProgress = false) {
        if (showProgress) {
            this.logger.logStream("...");
        }
        return reactNativeProjectHelper_1.ReactNativeProjectHelper.getReactNativeVersion(this.projectRootPath)
            .then(version => {
            if (showProgress)
                this.logger.logStream(".");
            return XDL.mapVersion(version)
                .then(sdkVersion => {
                if (!sdkVersion) {
                    return XDL.supportedVersions()
                        .then((versions) => {
                        return Q.reject(errorHelper_1.ErrorHelper.getInternalError(internalErrorCode_1.InternalErrorCode.RNVersionNotSupportedByExponent, versions.join(", ")));
                    });
                }
                return sdkVersion;
            });
        });
    }
    /**
     * Name specified on user's package.json
     */
    getPackageName() {
        return new package_1.Package(this.projectRootPath, { fileSystem: this.fs }).name();
    }
    getExpConfig() {
        return this.readExpJson()
            .catch(err => {
            if (err.code === "ENOENT") {
                return this.readAppJson()
                    .then((config) => {
                    return config.expo || {};
                });
            }
            return err;
        });
    }
    getFromExpConfig(key) {
        return this.getExpConfig()
            .then((config) => config[key]);
    }
    /**
     * Returns the specified setting from exp.json if it exists
     */
    readExpJson() {
        const expJsonPath = this.pathToFileInWorkspace(EXP_JSON);
        return this.fs.readFile(expJsonPath)
            .then(content => {
            return JSON.parse(stripJSONComments(content));
        });
    }
    readAppJson() {
        const appJsonPath = this.pathToFileInWorkspace(APP_JSON);
        return this.fs.readFile(appJsonPath)
            .then(content => {
            return JSON.parse(stripJSONComments(content));
        });
    }
    writeAppJson(config) {
        const appJsonPath = this.pathToFileInWorkspace(APP_JSON);
        return this.fs.writeFile(appJsonPath, JSON.stringify(config, null, 2))
            .then(() => config);
    }
    getAppPackageInformation() {
        return new package_1.Package(this.projectRootPath, { fileSystem: this.fs }).parsePackageInformation();
    }
    /**
     * Path to a given file from the workspace root
     */
    pathToFileInWorkspace(filename) {
        return path.join(this.projectRootPath, filename).replace(DBL_SLASHES, "/");
    }
    /**
     * Works as a constructor but only initiliazes when it's actually needed.
     */
    lazilyInitialize() {
        if (!this.hasInitialized) {
            this.hasInitialized = true;
            XDL.configReactNativeVersionWargnings();
            XDL.attachLoggerStream(this.projectRootPath, {
                stream: {
                    write: (chunk) => {
                        if (chunk.level <= 30) {
                            this.logger.logStream(chunk.msg);
                        }
                        else if (chunk.level === 40) {
                            this.logger.warning(chunk.msg);
                        }
                        else {
                            this.logger.error(chunk.msg);
                        }
                    },
                },
                type: "raw",
            });
        }
    }
}
exports.ExponentHelper = ExponentHelper;

//# sourceMappingURL=exponentHelper.js.map
