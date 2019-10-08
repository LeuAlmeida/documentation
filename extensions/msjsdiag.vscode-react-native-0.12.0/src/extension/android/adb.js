"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for details.
Object.defineProperty(exports, "__esModule", { value: true });
const Q = require("q");
const childProcess_1 = require("../../common/node/childProcess");
const commandExecutor_1 = require("../../common/commandExecutor");
const path = require("path");
const fs = require("fs");
const os = require("os");
const nls = require("vscode-nls");
const localize = nls.loadMessageBundle(__filename);
// See android versions usage at: http://developer.android.com/about/dashboards/index.html
var AndroidAPILevel;
(function (AndroidAPILevel) {
    AndroidAPILevel[AndroidAPILevel["Marshmallow"] = 23] = "Marshmallow";
    AndroidAPILevel[AndroidAPILevel["LOLLIPOP_MR1"] = 22] = "LOLLIPOP_MR1";
    AndroidAPILevel[AndroidAPILevel["LOLLIPOP"] = 21] = "LOLLIPOP";
    AndroidAPILevel[AndroidAPILevel["KITKAT"] = 19] = "KITKAT";
    AndroidAPILevel[AndroidAPILevel["JELLY_BEAN_MR2"] = 18] = "JELLY_BEAN_MR2";
    AndroidAPILevel[AndroidAPILevel["JELLY_BEAN_MR1"] = 17] = "JELLY_BEAN_MR1";
    AndroidAPILevel[AndroidAPILevel["JELLY_BEAN"] = 16] = "JELLY_BEAN";
    AndroidAPILevel[AndroidAPILevel["ICE_CREAM_SANDWICH_MR1"] = 15] = "ICE_CREAM_SANDWICH_MR1";
    AndroidAPILevel[AndroidAPILevel["GINGERBREAD_MR1"] = 10] = "GINGERBREAD_MR1";
})(AndroidAPILevel = exports.AndroidAPILevel || (exports.AndroidAPILevel = {}));
var KeyEvents;
(function (KeyEvents) {
    KeyEvents[KeyEvents["KEYCODE_BACK"] = 4] = "KEYCODE_BACK";
    KeyEvents[KeyEvents["KEYCODE_DPAD_UP"] = 19] = "KEYCODE_DPAD_UP";
    KeyEvents[KeyEvents["KEYCODE_DPAD_DOWN"] = 20] = "KEYCODE_DPAD_DOWN";
    KeyEvents[KeyEvents["KEYCODE_DPAD_CENTER"] = 23] = "KEYCODE_DPAD_CENTER";
    KeyEvents[KeyEvents["KEYCODE_MENU"] = 82] = "KEYCODE_MENU";
})(KeyEvents || (KeyEvents = {}));
var DeviceType;
(function (DeviceType) {
    DeviceType[DeviceType["AndroidSdkEmulator"] = 0] = "AndroidSdkEmulator";
    DeviceType[DeviceType["Other"] = 1] = "Other";
})(DeviceType = exports.DeviceType || (exports.DeviceType = {}));
const AndroidSDKEmulatorPattern = /^emulator-\d{1,5}$/;
class AdbHelper {
    constructor(projectRoot, logger, launchActivity = "MainActivity") {
        this.childProcess = new childProcess_1.ChildProcess();
        this.commandExecutor = new commandExecutor_1.CommandExecutor();
        this.adbExecutable = "";
        // Trying to read sdk location from local.properties file and if we succueded then
        // we would run adb from inside it, otherwise we would rely to PATH
        const sdkLocation = this.getSdkLocationFromLocalPropertiesFile(projectRoot, logger);
        this.adbExecutable = sdkLocation ? `${path.join(sdkLocation, "platform-tools", "adb")}` : "adb";
        this.launchActivity = launchActivity;
    }
    /**
     * Gets the list of Android connected devices and emulators.
     */
    getConnectedDevices() {
        return this.childProcess.execToString(`${this.adbExecutable} devices`)
            .then(output => {
            return this.parseConnectedDevices(output);
        });
    }
    setLaunchActivity(launchActivity) {
        this.launchActivity = launchActivity;
    }
    /**
     * Broadcasts an intent to reload the application in debug mode.
     */
    switchDebugMode(projectRoot, packageName, enable, debugTarget) {
        let enableDebugCommand = `${this.adbExecutable} ${debugTarget ? "-s " + debugTarget : ""} shell am broadcast -a "${packageName}.RELOAD_APP_ACTION" --ez jsproxy ${enable}`;
        return new commandExecutor_1.CommandExecutor(projectRoot).execute(enableDebugCommand)
            .then(() => {
            let deferred = Q.defer();
            setTimeout(() => {
                this.stopApp(projectRoot, packageName, debugTarget)
                    .then(() => {
                    return deferred.resolve({});
                });
            }, 200); // We need a little delay after broadcast command
            return deferred.promise;
        })
            .then(() => {
            return this.launchApp(projectRoot, packageName, debugTarget);
        });
    }
    /**
     * Sends an intent which launches the main activity of the application.
     */
    launchApp(projectRoot, packageName, debugTarget) {
        let launchAppCommand = `${this.adbExecutable} ${debugTarget ? "-s " + debugTarget : ""} shell am start -n ${packageName}/.${this.launchActivity}`;
        return new commandExecutor_1.CommandExecutor(projectRoot).execute(launchAppCommand);
    }
    stopApp(projectRoot, packageName, debugTarget) {
        let stopAppCommand = `${this.adbExecutable} ${debugTarget ? "-s " + debugTarget : ""} shell am force-stop ${packageName}`;
        return new commandExecutor_1.CommandExecutor(projectRoot).execute(stopAppCommand);
    }
    apiVersion(deviceId) {
        return this.executeQuery(deviceId, "shell getprop ro.build.version.sdk").then(output => parseInt(output, 10));
    }
    reverseAdb(deviceId, packagerPort) {
        return this.execute(deviceId, `reverse tcp:${packagerPort} tcp:${packagerPort}`);
    }
    showDevMenu(deviceId) {
        let command = `${this.adbExecutable} ${deviceId ? "-s " + deviceId : ""} shell input keyevent ${KeyEvents.KEYCODE_MENU}`;
        return this.commandExecutor.execute(command);
    }
    reloadApp(deviceId) {
        let command = `${this.adbExecutable} ${deviceId ? "-s " + deviceId : ""} shell input text "RR"`;
        return this.commandExecutor.execute(command);
    }
    getOnlineDevices() {
        return this.getConnectedDevices().then(devices => {
            return devices.filter(device => device.isOnline);
        });
    }
    startLogCat(adbParameters) {
        return new childProcess_1.ChildProcess().spawn(`${this.adbExecutable}`, adbParameters);
    }
    parseSdkLocation(fileContent, logger) {
        const matches = fileContent.match(/^sdk\.dir=(.+)$/m);
        if (!matches || !matches[1]) {
            if (logger) {
                logger.info(localize(0, null));
            }
            return null;
        }
        let sdkLocation = matches[1].trim();
        if (os.platform() === "win32") {
            // For Windows we need to unescape files separators and drive letter separators
            sdkLocation = sdkLocation.replace(/\\\\/g, "\\").replace("\\:", ":");
        }
        if (logger) {
            logger.info(localize(1, null, sdkLocation));
        }
        return sdkLocation;
    }
    parseConnectedDevices(input) {
        let result = [];
        let regex = new RegExp("^(\\S+)\\t(\\S+)$", "mg");
        let match = regex.exec(input);
        while (match != null) {
            result.push({ id: match[1], isOnline: match[2] === "device", type: this.extractDeviceType(match[1]) });
            match = regex.exec(input);
        }
        return result;
    }
    extractDeviceType(id) {
        return id.match(AndroidSDKEmulatorPattern)
            ? DeviceType.AndroidSdkEmulator
            : DeviceType.Other;
    }
    executeQuery(deviceId, command) {
        return this.childProcess.execToString(this.generateCommandForDevice(deviceId, command));
    }
    execute(deviceId, command) {
        return this.commandExecutor.execute(this.generateCommandForDevice(deviceId, command));
    }
    generateCommandForDevice(deviceId, adbCommand) {
        return `${this.adbExecutable} -s "${deviceId}" ${adbCommand}`;
    }
    getSdkLocationFromLocalPropertiesFile(projectRoot, logger) {
        const localPropertiesFilePath = path.join(projectRoot, "android", "local.properties");
        if (!fs.existsSync(localPropertiesFilePath)) {
            if (logger) {
                logger.info(localize(2, null));
            }
            return null;
        }
        let fileContent;
        try {
            fileContent = fs.readFileSync(localPropertiesFilePath).toString();
        }
        catch (e) {
            if (logger) {
                logger.error(localize(3, null, localPropertiesFilePath), e, e.stack);
                logger.info(localize(4, null));
            }
            return null;
        }
        return this.parseSdkLocation(fileContent, logger);
    }
}
exports.AdbHelper = AdbHelper;

//# sourceMappingURL=adb.js.map
