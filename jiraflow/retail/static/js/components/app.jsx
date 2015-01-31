/*jshint globalstrict:true, devel:true, newcap:false */
/*global require, module, exports, document, window */
"use strict";

var React = require('react');
var Router = require('react-router');

var TopNav = require('./topnav');

var RouteHandler = Router.RouteHandler;

var App = React.createClass({

    getInitialState: function () {
        return window.initialState;
    },

    render: function() {
        var cursor = Cursor.build(this);

        return (
            <div className="main">
                <TopNav jiraInstances={cursor.refine('jiraInstances')} user={cursor.refine('user')} />
                <RouteHandler jiraInstances={cursor.refine('jiraInstances')} analysis={cursor.refine('analysis')} />
            </div>
        );

    }
});

module.exports = App;