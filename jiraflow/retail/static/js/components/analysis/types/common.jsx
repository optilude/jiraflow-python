"use strict";

var React = require('react');
var ReactForms = require('react-forms');
var RadioButtonGroup  = require('react-forms/lib/RadioButtonGroup');

var { Mapping, Scalar } = ReactForms.schema;

var ANALYSIS_TYPES = [
    {value: 'burnup', name: 'Burn-up chart'},
    {value: 'cfd', name: 'Cumulative flow diagram'},
    {value: 'forecast', name: 'Forecast analysis'},
];

var CommonSchema = Mapping({

    title: Scalar({
        label: "Title",
        hint: "Enter a short title for this analysis",
        required: true
    }),

    description: Scalar({
        label: "Description",
        hint: "Enter a longer description for this analysis",
        required: true,
        input: <textarea rows="4" />
    }),

    query: Scalar({
        label: "Query",
        hint: "Enter a JQL query to find the issues to include in this analysis",
        required: false
    }),

    refresh_interval: Scalar({
        type: "number",
        label: "Refresh interval (seconds)",
        hint: "How frequently should raw data be fetched from the JIRA instance?",
        defaultValue: 600,
        required: true
    }),

    type: Scalar({
        label: "Type",
        hint: "Choose the analaysis type",
        required: true,
        input: <RadioButtonGroup options={ANALYSIS_TYPES} allowEmpty={false} />
    })

});

/**
 * Base class for analysis types. The propery `schema` returns a ReactForms
 * schema. `type` returns the type string. `serialize()` and `deserialize()`
 * can turn a form value into a json mapping (and vice-versa) suitable for
 * passing to the server representation, where non-common fields are stored
 * in a `parameters` key/value pairs.
 */
class Common {

    constructor() {
        this.type = null;
        this.schema = CommonSchema;
    }

    mergeSchema(schema) {
        return new Mapping(
            schema.props.delete('children'),
            CommonSchema.props.get('children').merge(schema.props.get('children'))
        );
    }

    serialize(value) {

    }

    deserialize(json) {

    }

}

module.exports = Common;