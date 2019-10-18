"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for details.
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const glob = require("glob");
const fs = require("fs");
const semver = require("semver");
const node_1 = require("../../common/node/node");
const errorHelper_1 = require("../../common/error/errorHelper");
const internalErrorCode_1 = require("../../common/error/internalErrorCode");
const reactNativeProjectHelper_1 = require("../../common/reactNativeProjectHelper");
class PlistBuddy {
    constructor({ nodeChildProcess = new node_1.Node.ChildProcess(), } = {}) {
        this.nodeChildProcess = nodeChildProcess;
    }
    getBundleId(iosProjectRoot, simulator = true, configuration = "Debug", productName, scheme) {
        const projectRoot = path.normalize(path.join(iosProjectRoot, ".."));
        return reactNativeProjectHelper_1.ReactNativeProjectHelper.getReactNativeVersion(projectRoot)
            .then((rnVersion) => {
            let productsFolder;
            if (semver.gte(rnVersion, "0.59.0")) {
                if (!scheme) {
                    // If no scheme were provided via runOptions.scheme or via runArguments then try to get scheme using the way RN CLI does.
                    scheme = this.getInferredScheme(projectRoot, rnVersion);
                }
                productsFolder = path.join(iosProjectRoot, "build", scheme, "Build", "Products");
            }
            else {
                productsFolder = path.join(iosProjectRoot, "build", "Build", "Products");
            }
            const configurationFolder = path.join(productsFolder, `${configuration}${simulator ? "-iphonesimulator" : "-iphoneos"}`);
            let executable = "";
            if (productName) {
                executable = `${productName}.app`;
            }
            else {
                const executableList = this.findExecutable(configurationFolder);
                if (!executableList.length) {
                    throw errorHelper_1.ErrorHelper.getInternalError(internalErrorCode_1.InternalErrorCode.IOSCouldNotFoundExecutableInFolder, configurationFolder);
                }
                else if (executableList.length > 1) {
                    throw errorHelper_1.ErrorHelper.getInternalError(internalErrorCode_1.InternalErrorCode.IOSFoundMoreThanOneExecutablesCleanupBuildFolder, configurationFolder);
                }
                executable = `${executableList[0]}`;
            }
            const infoPlistPath = path.join(configurationFolder, executable, "Info.plist");
            return this.invokePlistBuddy("Print:CFBundleIdentifier", infoPlistPath);
        });
    }
    setPlistProperty(plistFile, property, value) {
        // Attempt to set the value, and if it fails due to the key not existing attempt to create the key
        return this.invokePlistBuddy(`Set ${property} ${value}`, plistFile).fail(() => this.invokePlistBuddy(`Add ${property} string ${value}`, plistFile)).then(() => { });
    }
    setPlistBooleanProperty(plistFile, property, value) {
        // Attempt to set the value, and if it fails due to the key not existing attempt to create the key
        return this.invokePlistBuddy(`Set ${property} ${value}`, plistFile)
            .fail(() => this.invokePlistBuddy(`Add ${property} bool ${value}`, plistFile))
            .then(() => { });
    }
    deletePlistProperty(plistFile, property) {
        return this.invokePlistBuddy(`Delete ${property}`, plistFile).then(() => { });
    }
    readPlistProperty(plistFile, property) {
        return this.invokePlistBuddy(`Print ${property}`, plistFile);
    }
    getInferredScheme(projectRoot, rnVersion) {
        // Portion of code was taken from https://github.com/react-native-community/cli/blob/master/packages/platform-ios/src/commands/runIOS/index.js
        // and modified a little bit
        /**
         * Copyright (c) Facebook, Inc. and its affiliates.
         *
         * This source code is licensed under the MIT license found in the
         * LICENSE file in the root directory of this source tree.
         *
         * @flow
         * @format
         */
        let iOSCliFolderName;
        if (semver.gte(rnVersion, "0.60.0")) {
            iOSCliFolderName = "cli-platform-ios";
        }
        else {
            iOSCliFolderName = "cli";
        }
        const findXcodeProject = require(path.join(projectRoot, `node_modules/@react-native-community/${iOSCliFolderName}/build/commands/runIOS/findXcodeProject`)).default;
        const xcodeProject = findXcodeProject(fs.readdirSync(`${projectRoot}/ios`));
        if (!xcodeProject) {
            throw new Error(`Could not find Xcode project files in "${`${projectRoot}/ios`}" folder`);
        }
        const inferredSchemeName = path.basename(xcodeProject.name, path.extname(xcodeProject.name));
        return inferredSchemeName;
    }
    findExecutable(folder) {
        return glob.sync("*.app", {
            cwd: folder,
        });
    }
    invokePlistBuddy(command, plistFile) {
        return this.nodeChildProcess.exec(`${PlistBuddy.plistBuddyExecutable} -c '${command}' '${plistFile}'`).outcome.then((result) => {
            return result.toString().trim();
        });
    }
}
PlistBuddy.plistBuddyExecutable = "/usr/libexec/PlistBuddy";
exports.PlistBuddy = PlistBuddy;

//# sourceMappingURL=plistBuddy.js.map
