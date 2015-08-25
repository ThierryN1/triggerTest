/**
 * Created by thierryn1 on 5/12/2015.
 */

'use strict';
var CPApplication = require('./application').CPApplication;

var paymentApp;
TriggerManager.prototype.setSCA = function setSCA (app) {
    paymentApp = app;
}

// Initialization of registered applications
var applications;
// Currently running
var triggers;
// Callbacks
var callbacks;

function TriggerManager() {
    callbacks = new Array();
    triggers = new Array();
    triggers['TRIGGER_ONE'] = new Array();
    triggers['TRIGGER_TWO'] = new Array();
    triggers['TRIGGER_MULTIPLE'] = new Array();
    applications = new Array();
    applications['TRIGGER_ONE'] = [new CPApplication('FAILURE', this)];
    applications['TRIGGER_TWO'] = [new CPApplication('SUCCESS', this)];
    applications['TRIGGER_MULTIPLE'] = [new CPApplication('ONE', this), new CPApplication('TWO', this)];
};

TriggerManager.prototype.execute = function execute (triggerId, data, success, failure) {
    var response;
    var applications = getAppsForTriggerId(triggerId);
    if(isNullOrUndefined(applications)) {
        // Nobody registered so nothing should happen
    } else {
        callbacks[triggerId] = [success, failure];
        applications.forEach(function(app) {
            triggers[triggerId].push(app);
            app.execute(triggerId, data);
        });
    }
};

TriggerManager.prototype.terminate = function terminate (triggerId) {
    var response;
    // See what is currently running for this triggerId
    var apps = getTriggersForTriggerId(triggerId);
    if(isNullOrUndefined(apps)) {
        // Nobody is running for this triggerId
        response = false;
    } else {
        apps.forEach(function(app) {
            app.terminate(triggerId);
        });
        delete triggers[triggerId];
        delete callbacks[triggerId];
        response = true;
    }
    return response;
};

// This assumes a single CPApplication is running for a triggerId
TriggerManager.prototype.sendResult = function sendResult (code, triggerId, data) {
    var app = getAppsForTriggerId(triggerId);
    if(code >= 0) {
        // SUCCESS
        callbacks[triggerId][0](data);
    } else {
        // FAILURE
        callbacks[triggerId][1](data);
    }
};

// Private functions -------------------------------------------------------
function getAppsForTriggerId(triggerId) {
    return applications[triggerId];
};
function getTriggersForTriggerId(triggerId) {
    return triggers[triggerId];
};
function isNullOrUndefined (obj) {
    return obj === undefined || obj === null;
};

// DEV EXPORTS --------------------------------------------------------------------------------
exports.TriggerManager = TriggerManager;