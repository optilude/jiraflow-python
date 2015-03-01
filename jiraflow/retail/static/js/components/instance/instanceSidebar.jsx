"use strict";

var Immutable = require('immutable');
var React = require('react/addons');
var BS = require('react-bootstrap');
var RBS = require('react-router-bootstrap');

var { Nav } = BS;
var { NavItemLink, ButtonLink } = RBS;

/**
 * Sidebar listing the analyses under an instance.
 */
var InstanceSidebar = React.createClass({
    mixins: [React.addons.PureRenderMixin],

    propTypes: {
        instance: React.PropTypes.instanceOf(Immutable.Map).isRequired,
        analyses: React.PropTypes.instanceOf(Immutable.Iterable).isRequired
    },

    render: function () {

        var instanceId = this.props.instance.get('id');

        return (
            <div className="sidebar">
                <Nav bsStyle="pills" stacked={true}>
                    <NavItemLink className="currentInstance" to="instance" params={{instanceId: instanceId}}>{this.props.instance.get('title')}</NavItemLink>
                    {this.props.analyses.map((a, idx) => <NavItemLink key={idx} to="analysis" params={{instanceId: instanceId, analysisId: a.get('id')}}>{a.get('title')}</NavItemLink>).toArray()}
                </Nav>
                <ButtonLink to="newAnalysis" params={{instanceId: instanceId}} className="new-analysis-button" bsStyle="success">Configure new analysis</ButtonLink>
            </div>
        );
    }
});

module.exports = InstanceSidebar;