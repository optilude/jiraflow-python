/*jshint globalstrict:true, devel:true, newcap:false */
/*global require, module, exports, document, window */
"use strict";

var React = require('react');
var Router = require('react-router');

var TopNav = require('./navigation/topNav');

var RouteHandler = Router.RouteHandler;

/**
 * Document body handler, rendering nav and main body area
 */
var App = React.createClass({

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