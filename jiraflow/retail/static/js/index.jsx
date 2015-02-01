/*jshint globalstrict:true, devel:true, newcap:false */
/*global require, module, exports, document, window */
"use strict";

var Immutable = require('immutable');

var React = require('react');
var Marty = require('marty');

var Router = require('./router');

var UserActionCreators = require('user/userActionCreators');
var InstanceActionCreators = require('instance/instanceActionCreators');
var AnalysisActionCreators = require('analysis/analysisActionCreators');

window.React = React; // For React Developer Tools
window.Marty = Marty; // For Marty Developer Tools

Router.run(function (Handler, state) {

    // Populate stores with initial state in server payload
    if(window.initalState) {

        // User
        if(window.initalState.user) {
            UserActionCreators.receiveUser(Immutable.fromJS(window.initalState.user));
        }

        // Instances
        if(window.initalState.jiraInstances) {
            InstanceActionCreators.receiveInstances(Immutable.fromJS(window.initalState.jiraInstances));
        }

        // Analyses
        if(window.initalState.analysis) {
            AnalysisActionCreators.receiveAnalyses(Immutable.fromJS(window.initalState.analysis));
        }

    }

    React.render(<Handler {...state.params} />, document.body);
});
