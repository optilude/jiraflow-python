/*jshint globalstrict:true, devel:true, newcap:false */
/*global require, module, exports, document, window */
"use strict";

var Immutable = require('immutable');

var React = require('react');
var Marty = require('marty');

var Router = require('./router');

var UserActionCreators = require('user/userActionCreators');
var InstanceActionCreators = require('instances/instanceActionCreators');
var AnalysisActionCreators = require('analyses/analysisActionCreators');

window.React = React; // For React Developer Tools
window.Marty = Marty; // For Marty Developer Tools

var initialState = window.initialState;

Router.run(function (Handler, state) {

    // Populate stores with initial state in server payload
    if(initialState !== undefined) {
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

    React.render(<Handler {...state.params} />, document.body);
});
