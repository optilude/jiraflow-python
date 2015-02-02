/*jshint globalstrict:true, devel:true, newcap:false */
/*global require, module, exports, document */
"use strict";

var Immutable = require('immutable');
var React = require('react');
var BS = require('react-bootstrap');

var Nav = BS.Nav;
var NavItem = BS.NavItem;

/**
 * Renders a single analysis
 */
var AnalysisView = React.createClass({

    propTypes: {
        analysis: React.PropTypes.instanceOf(Immutable.Map).isRequired
    },

    shouldComponentUpdate: function(nextProps) {
        return !(this.props.analysis.equals(nextProps.analysis));
    },

    render: function () {

        return (
            <div>
                <Nav bsStyle="tabs">
                    <NavItem active={true} eventKey="view">View</NavItem>
                    <NavItem eventKey="manage">Manage</NavItem>
                </Nav>
                <h1>Analysis &mdash; {this.props.analysis.get('title')}</h1>
                <p>Lorem ipsum</p>
            </div>
        );

    }
});

module.exports = AnalysisView;