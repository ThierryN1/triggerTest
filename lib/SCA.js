/**
 * Created by Thierry on 5/12/2015.
 */

'use strict';
var TriggerManager = require('./triggerManager').TriggerManager;

function SCA(triggerManager) {
    this.triggerManager = triggerManager;
};

var message;
var callbackSuccess = function(msg) {
    console.log("\nCompleted success work");
    message += msg;
};

var callbackFailure = function(msg) {
    console.log("\nCompleted failed work");
    message += msg;
};

/* FOR TESTING ONLY */
SCA.prototype.call = function call (triggerId, data, timeout) {
    message = 'Message=';
    // This is where SCA would manage the timeouts. the code below is simply to illustrate that
    // SCA would terminate the trigger invocation if a timeout occurs
    if (timeout > 0) {
        this.triggerManager.terminate(triggerId);
    } else {
        this.triggerManager.execute(triggerId, data, callbackSuccess, callbackFailure);
    }
};
SCA.prototype.getResponse = function getResponse() {
    return message;
};

// DEV EXPORTS --------------------------------------------------------------------------------
exports.SCA = SCA;
