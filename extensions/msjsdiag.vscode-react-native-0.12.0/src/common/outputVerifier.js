"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for details.
Object.defineProperty(exports, "__esModule", { value: true });
const Q = require("q");
const errorHelper_1 = require("./error/errorHelper");
const internalErrorCode_1 = require("./error/internalErrorCode");
/* This class transforms a spawn process to only succeed if all defined success patterns
   are found on stdout, and none of the failure patterns were found on stderr */
class OutputVerifier {
    constructor(generatePatternsForSuccess, generatePatternToFailure, platformName) {
        this.output = "";
        this.errors = "";
        this.generatePatternsForSuccess = generatePatternsForSuccess;
        this.generatePatternToFailure = generatePatternToFailure;
        this.platformName = platformName;
    }
    process(spawnResult) {
        // Store all output
        this.store(spawnResult.stdout, new_content => this.output += new_content);
        this.store(spawnResult.stderr, new_content => this.errors += new_content);
        return spawnResult.outcome // Wait for the process to finish
            .then(this.generatePatternToFailure) // Generate the failure patterns to check
            .then(patterns => {
            const failureErrorCode = this.findAnyFailurePattern(patterns);
            if (failureErrorCode) {
                return Q.reject(errorHelper_1.ErrorHelper.getInternalError(failureErrorCode)); // If at least one failure happened, we fail
            }
            else {
                return this.generatePatternsForSuccess(); // If not we generate the success patterns
            }
        }).then(successPatterns => {
            if (!this.areAllSuccessPatternsPresent(successPatterns)) { // If we don't find all the success patterns, we also fail
                return Q.reject(errorHelper_1.ErrorHelper.getInternalError(internalErrorCode_1.InternalErrorCode.NotAllSuccessPatternsMatched, this.platformName, this.platformName));
            } // else we found all the success patterns, so we succeed
            return Q.resolve(void 0);
        });
    }
    store(stream, append) {
        stream.on("data", (data) => {
            append(data.toString());
        });
    }
    // We check the failure patterns one by one, to see if any of those appeared on the errors. If they did, we return the associated error
    findAnyFailurePattern(patterns) {
        const errorsAndOutput = this.errors + this.output;
        const patternThatAppeared = patterns.find(pattern => {
            return pattern.pattern instanceof RegExp ?
                pattern.pattern.test(errorsAndOutput) :
                errorsAndOutput.indexOf(pattern.pattern) !== -1;
        });
        return patternThatAppeared ? patternThatAppeared.errorCode : null;
    }
    // We check that all the patterns appeared on the output
    areAllSuccessPatternsPresent(successPatterns) {
        return successPatterns.every(pattern => {
            let patternRe = new RegExp(pattern, "i");
            return patternRe.test(this.output);
        });
    }
}
exports.OutputVerifier = OutputVerifier;

//# sourceMappingURL=outputVerifier.js.map
