/*jshint globalstrict:true, devel:true, newcap:false */
/*global require, module, exports, document, window, setTimeout */
"use strict";

var Immutable = require('immutable');

var React = require('react');
var Marty = require('marty');

var Router = require('./router');

var NavigationActionCreators = require('./navigation/navigationActionCreators');
var UserActionCreators = require('./user/userActionCreators');
var InstanceActionCreators = require('./instance/instanceActionCreators');
var AnalysisActionCreators = require('./analysis/analysisActionCreators');

window.React = React; // For React Developer Tools
window.Marty = Marty; // For Marty Developer Tools

var initialState = window.initialState;

// Populate stores with initial state in server payload
if(initialState) {
    // User
    if(initialState.user !== undefined) {
        UserActionCreators.receiveUser(Immutable.fromJS(initialState.user), false);
    }

    // Instances
    if(initialState.jiraInstances !== undefined) {
        InstanceActionCreators.receiveInstances(Immutable.fromJS(initialState.jiraInstances), false);
    }

    // Analyses
    if(initialState.analysis !== undefined) {
        AnalysisActionCreators.receiveAnalyses(Immutable.fromJS(initialState.analysis), false);
    }
}

Router.run(function(Handler, state) {
    // TODO: Catch exception here and navigate to 404 page?
    NavigationActionCreators.routerNavigate(Handler, state);
    React.render(<Handler />, document.body);
});