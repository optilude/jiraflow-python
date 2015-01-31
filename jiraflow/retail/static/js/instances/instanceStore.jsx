/*jshint globalstrict:true, devel:true, newcap:false */
/*global require, module, exports, document, window */
"use strict";

var Immutable = require('immutable');

var Marty = require('marty');
var UserConstants = require('user/userConstants');
var UserStore = require('user/userStore');
var InstanceConstants = require('./instanceConstants');
var InstanceActionCreators = require('./instanceActionCreators');

/**
 * Stores a list of instances available to the current user, plus the currently
 * selected instance.
 */
var InstanceStore = Marty.createStore({
    displayName: 'instances',

    getInstances: function () {
        return this.state.instances.valueSeq();
    },

    getSelectedInstance: function () {
        return this.state.selectedInstance? this.state.instances.get(this.state.selectedInstance) : null;
    },

    // Internal state management

    getInitialState: function () {
        return {
            instances: Immutable.OrderedMap(), // id -> Immutable.Map()
            selectedInstance: null             // id
        };
    },

    // Action handlers

    handlers: {
        _receiveUser: UserConstants.RECEIVE_USER,
        _selectInstance: InstanceConstants.SELECT_INSTANCE,
        _receiveInstances: InstanceConstants.RECEIVE_INSTANCES,
        _receiveInstance: InstanceConstants.RECEIVE_INSTANCE,
        _receiveInstanceDelete: InstanceConstants.RECEIVE_INSTANCE_DELETE
    },

    _receiveUser: function(user) {
        this.waitFor(UserStore);

        // force a re-fetch of everything
        // TODO: Is this right? see http://stackoverflow.com/questions/28257724/ajax-in-flux-refreshing-stores-when-dependent-state-changes
        InstanceActionCreators.fetchInstances();
    },

    _selectInstance: function(id) {
        if(!this.state.instances.has(id)) {
            throw "Instance with id " + id + " not known";
        }

        if(id !== this.state.id) {
            this.state.selectedInstance = id;
            this.hasChanged();
        }
    },

    _receiveInstances: function(instances) {

        var instanceData = instances.map(function(instance) {
            if(!(instance instanceof Immutable.Map)) {
                throw "Each instance must be an Immutable.Map";
            }

            return [instance.get('id'), instance];
        });

        this.state.instances = Immutable.OrderedMap(instanceData);
        this.state.selectedInstance = null;
        this.hasChanged();
    },

    _receiveInstance: function(instance) {
        if(!(instance instanceof Immutable.Map)) {
            throw "Instance must be an Immutable.Map";
        }


        if(!instance.equals(this.state.instances.get(instance.id))) {
            this.state.instances = this.state.instances.set(instance.id, instance);
            this.hasChanged();
        }
    },

    _receiveInstanceDelete: function(id) {

        if(!this.state.instances.has(id)) {
            throw "Instance not found";
        }

        this.state.instances = this.state.instances.delete(id);

        if(this.state.id === id) {
            this.state.id = null;
        }

        this.hasChanged();
    }

});

module.exports = InstanceStore;