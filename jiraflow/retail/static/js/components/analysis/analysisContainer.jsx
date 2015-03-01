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

    propTypes: {
        instance: React.PropTypes.instanceOf(Immutable.Map),
        analysis: React.PropTypes.instanceOf(Immutable.Map)
    },

    shouldComponentUpdate: function(nextProps, nextState) {
        // XXX: Can happen briefly during navigation
        if(!nextProps.instance || !nextProps.analysis) {
            return false;
        }

        return (
            !Immutable.is(this.props.instance, nextProps.instance) ||
            !Immutable.is(this.props.analysis, nextProps.analysis)
        );
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
                <RouteHandler instance={this.props.instance} analysis={this.props.analysis} />
            </div>
        );

    }
});

module.exports = AnalysisContainer;