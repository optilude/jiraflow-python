/*jshint globalstrict:true, devel:true, newcap:false */
/*global require, module, exports, document, window */
"use strict";

var Immutable = require('immutable');
var Marty = require('marty');

var Exception = require('../exception');
var NavigationConstants = require('../navigation/navigationConstants');
var NavigationStore = require('../navigation/navigationStore');
var NavigationActionCreators = require('../navigation/navigationActionCreators');
var UserConstants = require('../user/userConstants');
var UserStore = require('../user/userStore');
var InstanceConstants = require('./instanceConstants');
var InstanceActionCreators = require('./instanceActionCreators');
var InstanceAPI = require('./instanceAPI');

/**
 * Stores a list of instances available to the current user, plus the currently
 * selected instance.
 */
var InstanceStore = Marty.createStore({
    displayName: 'instances',

    getInstances: function() {
        return this.state.instances.valueSeq();
    },

    getSelectedInstance: function() {
        return this.state.selectedInstance? this.state.instances.get(this.state.selectedInstance) : null;
    },

    updatePending: function() {
        return this.state.updatePending;
    },

    // Internal state management

    getInitialState: function () {
        return {
            updatePending: false,              // true during refresh
            instances: Immutable.OrderedMap(), // id -> Immutable.Map()
            selectedInstance: null             // id
        };
    },

    // Action handlers

    handlers: {
        _changeUser: UserConstants.RECEIVE_USER,
        _navigate: NavigationConstants.NAVIGATE,
        _selectInstance: InstanceConstants.SELECT_INSTANCE,
        _receiveInstances: InstanceConstants.RECEIVE_INSTANCES,
        _receiveInstance: InstanceConstants.RECEIVE_INSTANCE,
        _receiveInstanceDelete: InstanceConstants.RECEIVE_INSTANCE_DELETE
    },

    _changeUser: function(user, refresh /* default: true */) {
        this.waitFor(UserStore);

        // Clear out existing data
        this.state.instances = Immutable.OrderedMap();
        this.hasChanged();

        if(user !== null && refresh !== false) { // true or undefined
            // force a re-fetch of everything
            this.state.updatePending = true;
            this.hasChanged();
            InstanceAPI.fetchAll()
            .then(result => {
                InstanceActionCreators.receiveInstances(result);
                return result;
            })
            .catch(error => {
                throw new Exception(500, "Unable to refresh instances for new user", error);
            });
        }
    },

    _navigate: function(action) {
        this.waitFor(NavigationStore);

        var instanceId = NavigationStore.getParams().instanceId;
        if(instanceId) {
            this._selectInstance(instanceId);
        }
    },

    _selectInstance: function(id) {
        if(!this.state.instances.has(id)) {
            throw new Exception(404, "Instance with id " + id + " not known");
        }

        if(id !== this.state.selectedInstance) {
            this.state.selectedInstance = id;
            this.hasChanged();
        }
    },

    _receiveInstances: function(instances) {
        var instanceData = instances.map(function(instance) {
            if(!(instance instanceof Immutable.Map)) {
                throw new Exception(500, "Each instance must be an Immutable.Map");
            }

            return [instance.get('id'), instance];
        });

        this.state.updatePending = false;
        this.state.instances = Immutable.OrderedMap(instanceData);
        this.state.selectedInstance = null;
        this.hasChanged();
    },

    _receiveInstance: function(instance) {
        if(!(instance instanceof Immutable.Map)) {
            throw new Exception(500, "Instance must be an Immutable.Map");
        }

        if(!instance.equals(this.state.instances.get(instance.get('id')))) {
            this.state.instances = this.state.instances.set(instance.get('id'), instance);
            this.hasChanged();
        }
    },

    _receiveInstanceDelete: function(id) {
        if(!this.state.instances.has(id)) {
            throw new Exception(404, "Instance not found");
        }

        this.state.instances = this.state.instances.delete(id);

        if(this.state.selectedInstance === id) {
            this.state.selectedInstance = null;
        }

        this.hasChanged();
    }

});

module.exports = InstanceStore;