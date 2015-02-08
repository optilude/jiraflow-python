/*jshint globalstrict:true, devel:true, newcap:false */
/*global require, module, exports, document, window */
"use strict";

var Marty = require('marty');
var NavigationConstants = require('./navigationConstants');

function navigateTo(route, params) {
    // avoid cyclical import
    var Router = require('../router');
    Router.transitionTo(route, params || {});
}

var NavigationActionCreators = Marty.createActionCreators({

    // Directly trigger the NAVIGATE action
    routerNavigate: NavigationConstants.NAVIGATE(function(handler, state) {
        this.dispatch({
            path: state.path,
            pathName: state.pathname,
            queryString: state.query,
            params: state.params,
            routes: state.routes.map(r => r.name)
        });
    })

});

// Helper functions that are not really action creators, but end up triggering
// the NAVIGATE action indirectly

NavigationActionCreators.navigateHome = function() {
    navigateTo('home');
};

NavigationActionCreators.navigateToLogin = function() {
    navigateTo('login');
};

NavigationActionCreators.navigateToInstance = function(id) {
    navigateTo('instance', {instanceId: id});
};

NavigationActionCreators.navigateToAnalysis = function(instanceId, id) {
    navigateTo('analysis', {instanceId: instanceId, analysisId: id});
};

module.exports = NavigationActionCreators;