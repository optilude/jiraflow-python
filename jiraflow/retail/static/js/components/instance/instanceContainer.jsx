"use strict";

var Marty = require('marty');
var React = require('react');
var Router = require('react-router');
var BS = require('react-bootstrap');
var RBS = require('react-router-bootstrap');

var InstanceStore = require('../../instance/instanceStore');
var AnalysisStore = require('../../analysis/analysisStore');

var Sidebar = require('./instanceSidebar');

var { RouteHandler } = Router;
var { Grid, Row, Col, Nav } = BS;
var { NavItemLink } = RBS;

var InstanceState = Marty.createStateMixin({
    listenTo: [InstanceStore, AnalysisStore],
    getState: function() {
        return {
            selectedInstance: InstanceStore.getSelectedInstance(),
            analyses: AnalysisStore.getAnalyses(),
            selectedAnalysis: AnalysisStore.getSelectedAnalysis()
        };
    }
});

/**
 * Renders a single instance, and the sidebar with the analyses of that
 * instance.
 *
 * Controller-view depending on the InstanceStore and the AnalysisStore.
 */
var InstanceContainer = React.createClass({
    mixins: [InstanceState],

    shouldComponentUpdate: function(nextProps, nextState) {
        // XXX: Can happen briefly during instance delete, before we navigate away
        if(!nextState.selectedInstance) {
            return false;
        }

        return true;
    },

    render: function() {

        var instance = this.state.selectedInstance;
        var analysis = this.state.selectedAnalysis;
        var analyses = this.state.analyses;

        var instanceId = instance.get('id');

        return (
            <Grid fluid={true}>
                <Row>
                    <Col sm={3} md={2}>
                        <Sidebar instance={instance} analyses={analyses} />
                    </Col>
                    <Col sm={9} md={10}>
                        <Nav bsStyle="tabs">
                            <NavItemLink to="viewInstance" params={{instanceId: instanceId}}>View</NavItemLink>
                            <NavItemLink to="editInstance" params={{instanceId: instanceId}}>Manage</NavItemLink>
                        </Nav>
                        <RouteHandler instance={instance} analysis={analysis} />
                    </Col>
                </Row>
            </Grid>
        );

    }
});

module.exports = InstanceContainer;