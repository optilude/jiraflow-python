/*jshint globalstrict:true, devel:true, newcap:false */
/*global require, module, exports, document */
"use strict";

var Immutable = require('immutable');
var React = require('react/addons');
var BS = require('react-bootstrap');
var RBS = require('react-router-bootstrap');

var { Button, Nav, NavItem } = BS;
var { NavItemLink } = RBS;

/**
 * Sidebar listing the analyses under an instance.
 */
var InstanceSidebar = React.createClass({
    mixins: [React.addons.PureRenderMixin],

    propTypes: {
        instance: React.PropTypes.instanceOf(Immutable.Map).isRequired,
        analyses: React.PropTypes.instanceOf(Immutable.Iterable).isRequired
    },

    // TODO: Implement new analysis

    render: function () {

        var instanceId = this.props.instance.get('id');

        return (
            <div className="sidebar">
                <h4>{this.props.instance.get('title')}</h4>
                <Nav bsStyle="pills" stacked={true}>
                    {this.props.analyses.map((a, idx) => <NavItemLink key={idx} to="analysis" params={{instanceId: instanceId, analysisId: a.get('id')}}>{a.get('title')}</NavItemLink>).toArray()}
                </Nav>
                <Button className="new-analysis-button" bsStyle="success">New analysis</Button>
            </div>
        );
    }
});

module.exports = InstanceSidebar;