"use strict";

var Immutable = require('immutable');
var React = require('react/addons');
var Router = require('react-router');
var BS = require('react-bootstrap');
var RBS = require('react-router-bootstrap');

var { Nav } = BS;
var { RouteHandler} = Router;
var { NavItemLink } = RBS;

/**
 * Renders the tabs above the analysis
 */
var AnalysisContainer = React.createClass({
    mixins: [React.addons.PureRenderMixin],

    propTypes: {
        instance: React.PropTypes.instanceOf(Immutable.Map),
        analysis: React.PropTypes.instanceOf(Immutable.Map)
    },

    render: function () {

        var instanceId = this.props.instance.get('id');
        var analysisId = this.props.analysis.get('id');

        return (
            <div>
                <Nav bsStyle="tabs">
                    <NavItemLink to="viewAnalysis" params={{instanceId: instanceId, analysisId: analysisId}}>View</NavItemLink>
                    <NavItemLink to="editAnalysis" params={{instanceId: instanceId, analysisId: analysisId}}>Manage</NavItemLink>
                </Nav>
                <RouteHandler analysis={this.props.analysis} />
            </div>
        );

    }
});

module.exports = AnalysisContainer;