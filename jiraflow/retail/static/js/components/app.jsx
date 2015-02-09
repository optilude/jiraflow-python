/*jshint globalstrict:true, devel:true, newcap:false */
/*global require, module, exports, document, window */
"use strict";

var React = require('react');
var Router = require('react-router');

var UserStore = require('../user/userStore');
var TopNav = require('./navigation/topNav');

var RouteHandler = Router.RouteHandler;

/**
 * Document body handler, rendering nav and main body area
 */
var App = React.createClass({

    statics: {
        willTransitionTo: function(transition, params) {
            var user = UserStore.getUser();
            if(user === null) { // no user/not logged in
                transition.redirect('/login');
            }
        }
    },

    render: function() {
        return (
            <div className="main">
                <TopNav />
                <RouteHandler />
            </div>
        );

    }
});

module.exports = App;