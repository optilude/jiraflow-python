/*jshint globalstrict:true, devel:true, newcap:false */
/*global require, module, exports, document, window */
"use strict";

var Marty = require('marty');

var Router = require('../router');
var NavigationConstants = require('./navigationConstants');

function navigateTo(route, params) {
    Router.transitionTo(route, params || {});
}

var NavigationActionCreators = Marty.createActionCreators({

    // These trigger Router actions, which in turn trigger the NAVIGATE
    // action.
    navigateHome: function() {
        navigateTo('home');
    },

    navigateToInstance: function(id) {
        navigateTo('instance', {instanceId: id});
    },

    navigateToAnalysis: function(instanceId, id) {
        navigateTo('analysis', {instanceId: instanceId, analysisId: id});
    },

    routerNavigate: NavigationConstants.NAVIGATE(function(handler, state) {
        var payload = {
            path: state.path,
            pathName: state.pathname,
            queryString: state.query,
            params: state.params,
            routes: state.routes.map(r => r.name)
        };
        this.dispatch(payload);
    }),

});



module.exports = NavigationActionCreators;