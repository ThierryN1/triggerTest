/**
 * Created by Thierry on 5/12/2015.
 */
/*global describe:false, it:false, before:false, after:false, afterEach:false*/

'use strict';

var TriggerManager = require('../lib/triggerManager').TriggerManager;
var SCA = require('../lib/SCA').SCA;
var assert = require('chai').assert;


describe('Triggering Test', function ()
{
    it('testTriggerManagerSuccess',  function (done)
    {
        var triggerManager = new TriggerManager();
        var sca = new SCA(triggerManager);
        sca.call('TRIGGER_TWO', 'SUCCESS');
        assert.equal(sca.getResponse(), 'Message=SUCCESS');
        done();
    });

    it('testTriggerManagerFailure',  function (done)
    {
        var triggerManager = new TriggerManager();
        var sca = new SCA(triggerManager);
        sca.call('TRIGGER_ONE', 'FAILURE');
        assert.equal(sca.getResponse(), 'Message=FAILURE');
        done();
    });

    it('testTriggerManagerNoTriggerFound',  function (done)
    {
        var triggerManager = new TriggerManager();
        var sca = new SCA(triggerManager);
        sca.call('TRIGGER_XYZ');
        assert.equal(sca.getResponse(), 'Message=');
        done();
    });

    it('testTriggerManagerTerminate',  function (done)
    {
        var triggerManager = new TriggerManager();
        var sca = new SCA(triggerManager);
        sca.call('TRIGGER_ONE');
        var response = triggerManager.terminate('TRIGGER_ONE');
        assert.isTrue(response);
        // Trying to terminate twice
        response = triggerManager.terminate('TRIGGER_ONE');
        assert.isFalse(response);
        done();
    });

    it('testTriggerManagerWithMultipleApplications',  function (done)
    {
        var triggerManager = new TriggerManager();
        var sca = new SCA(triggerManager);
        sca.call('TRIGGER_MULTIPLE');
        assert.equal(sca.getResponse(), 'Message=ONETWO');
        done();
    });

    it('testTriggerManagerWithTimeout',  function (done)
    {
        var triggerManager = new TriggerManager();
        var sca = new SCA(triggerManager);
        sca.call('TRIGGER_TIMEOUT', 20);
        // Nothing is in the response because the trigger invocation has timed out
        assert.equal(sca.getResponse(), 'Message=');
        done();

    });
});
