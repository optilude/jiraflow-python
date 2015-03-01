"use strict";

var React = require('react');
var ReactForms = require('react-forms');

var { Form } = ReactForms;

var Types = require('./types/registry');

/**
 * Dynamic form that renders the correct analysis schema based on the selected
 * type.
 */
var AnalysisForm = React.createClass({

    getInitialState: function() {
        return {
            type: null
        };
    },

    render: function () {
        var type = this.state.type;
        var defaultValue = this.props.defaultValue;

        if(type === null && defaultValue && defaultValue.get('type')) {
            type = defaultValue.get('type');
        }

        var analysisType = Types[type];
        var schema = analysisType.schema;

        return <Form schema={schema} component="div" onUpdate={this.onChangeForm} />;
    },

    onChangeForm: function(value, validation, keyPath) {
        var type = value.get('type');
        if(type !== this.state.type) {
            this.setState({
                type: type
            });
        }
    }

});

module.exports = AnalysisForm;