/*jshint globalstrict:true, devel:true, newcap:false */
/*global require, module, exports, document, window */
"use strict";

var React = require('react'),

    TopNav = require('./navigation').TopNav,
    Layout = require('./layout').Layout;

var App = React.createClass({
    render: function() {

        return (
            <div className="main">
                <TopNav />
                <Layout />
            </div>
        );

    }
});

React.render(
  <App />,
  document.body
);
