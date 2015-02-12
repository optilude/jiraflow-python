/*jshint globalstrict:true, devel:true, newcap:false */
/*global require, module, exports, document, window */
"use strict";

var Marty = require('marty');

var Exception = require('../exception');
var InstanceConstants = require('./instanceConstants');
var InstanceAPI = require('./instanceAPI');

/**
 * First order actions for instance CRUD operations
 */
var InstanceActionCreators = Marty.createActionCreators({

    fetchInstances: InstanceConstants.FETCH_INSTANCES(function() {
        return InstanceAPI.fetchAll()
        .then(result => {
            // inform stores instances have been received
            this.receiveInstances(result);
            return result;
        })
        .catch(error => {
            throw new Exception(500, "Server request failed", error);
        });
    }),

    createInstance: InstanceConstants.CREATE_INSTANCE(function(instance) {
        return InstanceAPI.create(instance)
        .then(result => {
            // inform stores an instance has been received
            this.receiveInstance(result);

            // dispatch action with the instance as returned by the server
            this.dispatch(result);
            return result;
        })
        .catch(error => {
            throw new Exception(500, "Server request failed", error);
        });
    }),

    updateInstance: InstanceConstants.UPDATE_INSTANCE(function(id, instance) {
        // optimistically dispatch
        var action = this.dispatch(id, instance);

        return InstanceAPI.update(instance)
        .then(result => {
            // inform stores an instance has been received
            this.receiveInstance(result);
            return result;
        })
        .catch(error => {
            // roll back action if AJAX operation failed
            action.rollback();
            throw new Exception(500, "Server request failed", error);
        });
    }),

    deleteInstance: InstanceConstants.DELETE_INSTANCE(function(id) {
        return InstanceAPI.deleteInstance(id)
        .then(result => {
            // inform stores an instance has been received
            this.receiveInstanceDelete(result);

            // dispatch
            var action = this.dispatch(id);
            return result;
        })
        .catch(error => {
            throw new Exception(500, "Server request failed", error);
        });
    }),

    selectInstance: InstanceConstants.SELECT_INSTANCE(),
    receiveInstance: InstanceConstants.RECEIVE_INSTANCE(),
    receiveInstances: InstanceConstants.RECEIVE_INSTANCES(),
    receiveInstanceDelete: InstanceConstants.RECEIVE_INSTANCE_DELETE()

});

module.exports = InstanceActionCreators;