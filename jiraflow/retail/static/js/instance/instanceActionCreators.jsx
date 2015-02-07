/*jshint globalstrict:true, devel:true, newcap:false */
/*global require, module, exports, document, window */
"use strict";

var Marty = require('marty');

var InstanceConstants = require('./instanceConstants');
var InstanceAPI = require('./instanceAPI');

/**
 * First order actions for instance CRUD operations
 */
var InstanceActionCreators = Marty.createActionCreators({

    fetchInstances: InstanceConstants.FETCH_INSTANCES(function() {
        return InstanceAPI.fetchAll().then(function(result) {
            // inform stores instances have been received
            this.receiveInstances(result);
            return result;
        }.bind(this));
    }),

    createInstance: InstanceConstants.CREATE_INSTANCE(function(instance) {
        return InstanceAPI.create(instance)
        .then(function(result) {
            // inform stores an instance has been received
            this.receiveInstance(result);

            // dispatch action with the instance as returned by the server
            this.dispatch(result);
            return result;
        }.bind(this));
    }),

    updateInstance: InstanceConstants.UPDATE_INSTANCE(function(id, instance) {
        // optimistically dispatch
        var action = this.dispatch(id, instance);

        return InstanceAPI.update(instance)
        .then(function(result) {
            // inform stores an instance has been received
            this.receiveInstance(result);
            return result;
        }.bind(this))
        .catch(function(error) {
            // roll back action if AJAX opertion failed
            action.rollback();
            throw error;
        }.bind(this));
    }),

    deleteInstance: InstanceConstants.DELETE_INSTANCE(function(id) {
        // optimistically dispatch
        var action = this.dispatch(id);

        return InstanceAPI.delete(instance)
        .then(function(result) {
            // inform stores an instance has been received
            this.receiveInstanceDelete(result);
            return result;
        }.bind(this))
        .catch(function(error) {
            // roll back action if AJAX opertion failed
            action.rollback();
            throw error;
        }.bind(this));
    }),

    selectInstance: InstanceConstants.SELECT_INSTANCE(),
    receiveInstance: InstanceConstants.RECEIVE_INSTANCE(),
    receiveInstances: InstanceConstants.RECEIVE_INSTANCES(),
    receiveInstanceDelete: InstanceConstants.RECEIVE_INSTANCE_DELETE()

});

module.exports = InstanceActionCreators;