"use strict";

var Immutable = require('immutable');
var React = require('react/addons');
var BS = require('react-bootstrap');

var { Nav, NavItem } = BS;

/**
 * Renders a single analysis
 */
var AnalysisView = React.createClass({
    mixins: [React.addons.PureRenderMixin],

    propTypes: {
        analysis: React.PropTypes.instanceOf(Immutable.Map)
    },

    // TODO: Implement views for different analysis types; edit; delete

    render: function () {

        // XXX: Can happen during "navigate away"
        if(!this.props.analysis) {
            return <span></span>;
        }

        return (
            <div>
                <Nav bsStyle="tabs">
                    <NavItem active={true} eventKey="view">View</NavItem>
                    <NavItem eventKey="manage">Manage</NavItem>
                </Nav>
                <h1>Analysis &mdash; {this.props.analysis.get('title')}</h1>
                <p>Lorem ipsum</p>
            </div>
        );

    }
});

module.exports = AnalysisView;