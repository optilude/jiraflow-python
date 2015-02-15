"use strict";

var Immutable = require('immutable');
var React = require('react/addons');
var BS = require('react-bootstrap');
var RBS = require('react-router-bootstrap');

var { Button, Nav } = BS;
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

    // TODO: Implement new analysis button

    render: function () {

        var instanceId = this.props.instance.get('id');

        return (
            <div className="sidebar">
                <Nav bsStyle="pills" stacked={true}>
                    <NavItemLink className="currentInstance" to="instance" params={{instanceId: instanceId}}>{this.props.instance.get('title')}</NavItemLink>
                    {this.props.analyses.map((a, idx) => <NavItemLink key={idx} to="analysis" params={{instanceId: instanceId, analysisId: a.get('id')}}>{a.get('title')}</NavItemLink>).toArray()}
                </Nav>
                <Button className="new-analysis-button" bsStyle="success">Configure new analysis</Button>
            </div>
        );
    }
});

module.exports = InstanceSidebar;