/*jshint globalstrict:true, devel:true, newcap:false */
/*global require, module, exports, document */
"use strict";

var React = require('react'),

    BS              = require('react-bootstrap'),

    Grid            = BS.Grid,
    Row             = BS.Row,
    Col             = BS.Col,

    Button          = BS.Button,

    Nav             = BS.Nav,
    NavItem         = BS.NavItem;

var AnalysisPane = React.createClass({

    render: function() {

        // TODO: Handle case where there is no instance selected
        var selected = this.props.analysis.find(a => a.selected.val());

        return (
            <Grid fluid={true}>
                <Row>
                    <Col sm={3} md={2}>
                        <Sidebar jiraInstance={this.props.jiraInstance} analysis={this.props.analysis} />
                    </Col>
                    <Col sm={9} md={10}>
                        <View selectedAnalysis={selected} />
                    </Col>
                </Row>
          </Grid>
        );

    }
});

var Sidebar = React.createClass({

    handleSelect: function(selectedIndex) {
        this.props.analysis.forEach((a, idx) => {
            if(a.selected.val() && idx !== selectedIndex) {
                a.selected.set(false);
            } else if(!a.selected.val() && idx === selectedIndex) {
                a.selected.set(true);
            }
        });
    },

    render: function () {
        return (
            <div className="sidebar">
                <h4>{this.props.jiraInstance.title.val()}</h4>
                <Nav bsStyle="pills" stacked={true}>
                    {this.props.analysis.map((a, idx) => <NavItem active={a.selected.val()} key={idx} onSelect={this.handleSelect.bind(this, idx)}>{a.title.val()}</NavItem>)}
                </Nav>
                <Button className="new-analysis-button" bsStyle="success">New analysis</Button>
            </div>
        );
    }
});

var View = React.createClass({

    render: function () {
        return (
            <div>
                <Nav bsStyle="tabs">
                    <NavItem active={true} eventKey="view">View</NavItem>
                    <NavItem eventKey="manage">Manage</NavItem>
                </Nav>
                <h1>Analysis &mdash; {this.props.selectedAnalysis.title.val()}</h1>
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
