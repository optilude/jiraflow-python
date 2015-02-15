"use strict";

var Marty = require('marty');

var InstanceConstants = Marty.createConstants([
    'FETCH_INSTANCES',          // e.g. user refreshes list of instances
    'CREATE_INSTANCE',          // e.g. user instigates creation of new instance
    'UPDATE_INSTANCE',          // e.g. user instigates change to existing instance
    'DELETE_INSTANCE',          // e.g. user instigates deletion of existing instance
    'SELECT_INSTANCE',          // e.g. user selects an instance

    'RECEIVE_INSTANCES',        // e.g. after a full list of instances received from the server
    'RECEIVE_INSTANCE',         // e.g. after a single instance has been received from the server
    'RECEIVE_INSTANCE_DELETE'   // e.g. after server has deleted an instance
]);

module.exports = InstanceConstants;