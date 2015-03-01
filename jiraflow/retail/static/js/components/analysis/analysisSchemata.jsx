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

var BurnupSchema = Mapping({

    scopeLine: Scalar({
        label: "Scope line",
        hint: "",
        required: true
    })

});

var Schemata = {
    common: CommonSchema,
    burnup: BurnupSchema
};

var getSchema = function(type) {
    var nodes = Schemata.common.props.get('children');

    if(type) {
        var typeSpecificSchema = Schemata[type];
        if(typeSpecificSchema !== undefined) {
            nodes = nodes.merge(typeSpecificSchema.props.get('children'));
        }
    }

    return Mapping(nodes);
};

module.exports = {
    schemata: Schemata,
    getSchema
};