/*jshint globalstrict:true, devel:true, newcap:false */
/*global require, module, exports, document */
"use strict";

var React = require('react'),
    Cursor = require('react-cursor').Cursor,
    ImmutableOptimizations = require('react-cursor').ImmutableOptimizations,

    u = require('./utils'),

    BS              = require('react-bootstrap'),

    Grid            = BS.Grid,
    Row             = BS.Row,
    Col             = BS.Col,

    Button          = BS.Button,

    Nav             = BS.Nav,
    NavItem         = BS.NavItem;

var AnalysisPane = React.createClass({
    mixins: [ImmutableOptimizations(['jiraInstance', 'analysis'])],

    propTypes: {
        jiraInstance: React.PropTypes.instanceOf(Cursor).isRequired,
        analysis: React.PropTypes.instanceOf(Cursor).isRequired
    },

    render: function() {

        // TODO: Handle case where there is no instance selected
        var selectedAnalysis = u.find(this.props.analysis, a => a.refine('selected').value);

        return (
            <Grid fluid={true}>
                <Row>
                    <Col sm={3} md={2}>
                        <Sidebar jiraInstance={this.props.jiraInstance} analysis={this.props.analysis} />
                    </Col>
                    <Col sm={9} md={10}>
                        <View selectedAnalysis={selectedAnalysis} />
                    </Col>
                </Row>
          </Grid>
        );

    }
});

var Sidebar = React.createClass({
    mixins: [ImmutableOptimizations(['jiraInstance', 'analysis'])],

    propTypes: {
        jiraInstance: React.PropTypes.instanceOf(Cursor).isRequired,
        analysis: React.PropTypes.instanceOf(Cursor).isRequired
    },

    handleSelect: function(selectedIndex) {
        this.props.analysis.value.forEach((a, idx) => {
            var selection = this.props.analysis.refine(idx).refine('selected');
            if(a.selected && idx !== selectedIndex) {
                selection.set(false);
            } else if(!a.selected && idx === selectedIndex) {
                selection.set(true);
            }
        });
    },

    render: function () {
        return (
            <div className="sidebar">
                <h4>{this.props.jiraInstance.refine('title').value}</h4>
                <Nav bsStyle="pills" stacked={true}>
                    {this.props.analysis.value.map((a, idx) => <NavItem active={a.selected} key={idx} onSelect={this.handleSelect.bind(this, idx)}>{a.title}</NavItem>)}
                </Nav>
                <Button className="new-analysis-button" bsStyle="success">New analysis</Button>
            </div>
        );
    }
});

var View = React.createClass({
    mixins: [ImmutableOptimizations(['selectedAnalysis'])],

    propTypes: {
        selectedAnalysis: React.PropTypes.instanceOf(Cursor).isRequired
    },

    render: function () {
        return (
            <div>
                <Nav bsStyle="tabs">
                    <NavItem active={true} eventKey="view">View</NavItem>
                    <NavItem eventKey="manage">Manage</NavItem>
                </Nav>
                <h1>Analysis &mdash; {this.props.selectedAnalysis.refine('title').value}</h1>
                <p>Lorem ipsum</p>
            </div>
        );
    }
});

module.exports = {
  AnalysisPane: AnalysisPane,
  Sidebar: Sidebar,
  View: View
};
