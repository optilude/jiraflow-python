/*jshint globalstrict:true, devel:true, newcap:false */
/*global require, module, exports, document */
"use strict";

var React = require('react'),

    BS              = require('react-bootstrap'),
    Nav             = BS.Nav,
    NavItem         = BS.NavItem;

var Analysis = React.createClass({
    displayName: '',
    render: function () {
        return (
            <div>
                <Nav bsStyle="tabs">
                    <NavItem active={true} eventKey="1">View</NavItem>
                    <NavItem eventKey="2">Manage</NavItem>
                </Nav>
                <h1>Analysis</h1>
                <p>Lorem ipsum</p>
            </div>
        );
    }
});

module.exports = {
  Analysis: Analysis
};
