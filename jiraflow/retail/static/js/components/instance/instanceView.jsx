/*jshint globalstrict:true, devel:true, newcap:false */
/*global require, module, exports, document */
"use strict";

var Marty = require('marty');
var React = require('react');
var Router = require('react-router');
var BS = require('react-bootstrap');

var InstanceStore = require('instances/instanceStore');
var AnalysisStore = require('analyses/analysisStore');

var Sidebar = require('./instanceSidebar');
var RouteHandler = Router.RouteHandler;

var Grid = BS.Grid;
var Row = BS.Row;
var Col = BS.Col;

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
var InstanceView = React.createClass({
    mixins: [InstanceState],

    render: function() {
        return (
            <Grid fluid={true}>
                <Row>
                    <Col sm={3} md={2}>
                        <Sidebar instance={this.state.selectedInstance} analyses={this.state.analyses} />
                    </Col>
                    <Col sm={9} md={10}>
                        <RouteHandler analysis={this.state.selectedAnalysis} />
                    </Col>
                </Row>
          </Grid>
        );

    }
});

module.exports = InstanceView;