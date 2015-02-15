"use strict";

var Immutable = require('immutable');
var Marty = require('marty');

var NavigationConstants = require('./navigationConstants');

/**
 * Stores the current user as an immutable map.
 */
var NavigationStore = Marty.createStore({
    displayName: 'navigation',

    getPath: function () {
        return this.state? this.state.get('path') : null;
    },

    getPathName: function () {
        return this.state? this.state.get('pathName') : null;
    },

    getQueryString: function () {
        return this.state? this.state.get('queryString') : null;
    },

    getParams: function () {
        return this.state? this.state.get('params').toJS() : null;
    },

    getRoutes: function () {
        return this.state? this.state.get('routes').toJS() : null;
    },

    // Internal state management

    getInitialState: function () {
        return null;
    },

    // Action handlers

    handlers: {
        _navigate: NavigationConstants.NAVIGATE
    },

    _navigate: function(state) {
        this.state = state? Immutable.fromJS(state) : null;
        this.hasChanged();
    }

});

module.exports = NavigationStore;