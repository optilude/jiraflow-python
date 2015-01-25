/*jshint globalstrict:true, devel:true, newcap:false */
/*global require, module, exports, document */
"use strict";

var React = require('react'),
    ImmutableOptimizations = require('react-cursor').ImmutableOptimizations,

    BS              = require('react-bootstrap'),
    Grid            = BS.Grid,
    Row             = BS.Row,
    Col             = BS.Col;

var NoAnalysisSelected = React.createClass({
    mixins: [ImmutableOptimizations([])],

    propTypes: {
    },

    render: function() {

        return (
            <h1>No analysis selected</h1>
        );

    }
});

module.exports = NoAnalysisSelected;