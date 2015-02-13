/*jshint globalstrict:true, devel:true, newcap:false */
/*global require, module, exports, document */
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

        // TODO: This is annoying. It is needed because for a brief moment
        // during deletion of an instance or navigating to a different instance,
        // the view re-renders and we get errors if we assume analysis is never null.
        if(this.props.analysis === null) {
            return (
                <div></div>
            );
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