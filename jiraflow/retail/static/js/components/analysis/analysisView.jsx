"use strict";

var Immutable = require('immutable');
var React = require('react/addons');
var BS = require('react-bootstrap');

/**
 * Renders a single analysis
 */
var AnalysisView = React.createClass({
    mixins: [React.addons.PureRenderMixin],

    propTypes: {
        analysis: React.PropTypes.instanceOf(Immutable.Map)
    },

    // TODO: Complete

    render: function () {

        return (
            <div>
                <h1>Analysis &mdash; {this.props.analysis.get('title')}</h1>
                <p>Lorem ipsum</p>
            </div>
        );

    }
});

module.exports = AnalysisView;