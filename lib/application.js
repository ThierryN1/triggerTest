/**
 * Created by Thierry on 5/12/2015.
 */

var TriggerManager = require('./triggerManager').TriggerManager;

function CPApplication(name, triggerManager) {
    this.name = name;
    this.triggerManager = triggerManager;
};

CPApplication.prototype.execute = function execute (triggerId, data) {
    switch (data) {
        case 'FAILURE':
            this.triggerManager.sendResult (-1, triggerId, 'FAILURE');
            break;
        case 'SUCCESS':
            this.triggerManager.sendResult (0, triggerId, 'SUCCESS');
            break;
        default:
            this.triggerManager.sendResult (0, triggerId, this.name);
            break;
    }
};

CPApplication.prototype.terminate = function terminate (triggerId) {
    console.log('\nTERMINATED '+triggerId);
    return true;
};


// DEV EXPORTS --------------------------------------------------------------------------------
exports.CPApplication = CPApplication;