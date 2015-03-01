"use strict";

var Immutable = require('immutable');

var React = require('react');
var Marty = require('marty');

var Exception = require('./exception');
var ErrorView = require('./components/error/error');
var Router = require('./router');

var NavigationActionCreators = require('./navigation/navigationActionCreators');
var UserActionCreators = require('./user/userActionCreators');
var InstanceActionCreators = require('./instance/instanceActionCreators');

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
}

Router.run(function(Handler, state) {

    try {
        NavigationActionCreators.routerNavigate(Handler, state);
        React.render(<Handler />, document.body);
    } catch(e) {
        // Route to an appropriate error page if something went wrong during navigation

        var lastRouteName = state.routes[state.routes.length - 1].name;

        console.log(e.stack);
        if(e instanceof Exception) {
            if(e.status === 404 && lastRouteName !== "notFound") {
                Router.transitionTo("notFound");
            } else if(lastRouteName !== "error") {
                Router.transitionTo("error");
            }
        } else if(lastRouteName !== "error") {
            // Wipe all state and show an error.
            document.body.innerHTML = '';
            React.render(<ErrorView />, document.body);
        }
    }

});