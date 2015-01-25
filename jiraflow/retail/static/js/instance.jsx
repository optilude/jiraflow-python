/*jshint globalstrict:true, devel:true, newcap:false */
/*global require, module, exports, document */
"use strict";

var React = require('react'),
    Cursor = require('react-cursor').Cursor,
    ImmutableOptimizations = require('react-cursor').ImmutableOptimizations,

    Router = require('react-router'),

    Sidebar = require('./instance-sidebar'),
    RouteHandler = require('react-router').RouteHandler,

    u = require('./utils'),

    BS              = require('react-bootstrap'),
    Grid            = BS.Grid,
    Row             = BS.Row,
    Col             = BS.Col;

var Instance = React.createClass({
    mixins: [
        Router.State
    ],

    propTypes: {
        jiraInstances: React.PropTypes.instanceOf(Cursor).isRequired,
        analysis: React.PropTypes.instanceOf(Cursor).isRequired
    },

    getInitialState: function() {
        return {
            selectedInstance: u.find(this.props.jiraInstances, i => i.refine('id').value === this.getParams().instanceId)
        };
    },

    componentWillReceiveProps: function() {
        this.setState({
            selectedInstance: u.find(this.props.jiraInstances, i => i.refine('id').value === this.getParams().instanceId)
        });
    },

    shouldComponentUpdate: function (nextProps) {
        if(this.props.jiraInstances !== nextProps.jiraInstances) return true;
        if(this.props.analysis !== nextProps.analysis) return true;
        if(this.selectedInstance && this.selectedInstance.refine('id') !== this.getParams().instanceId) return true;
        if(!this.selectedInstance && this.getParams().instanceId) return true;
        return false;
    },

    render: function() {

        if(!this.state.selectedInstance) {
            return (<h1>Instance not found</h1>);
        }

        return (
            <Grid fluid={true}>
                <Row>
                    <Col sm={3} md={2}>
                        <Sidebar jiraInstance={this.state.selectedInstance} analysis={this.props.analysis} />
                    </Col>
                    <Col sm={9} md={10}>
                        <RouteHandler jiraInstance={this.state.selectedInstance} analysis={this.props.analysis} />
                    </Col>
                </Row>
          </Grid>
        );

    }
});

module.exports = Instance;