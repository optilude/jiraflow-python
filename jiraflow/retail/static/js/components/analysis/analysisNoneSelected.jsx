/*jshint globalstrict:true, devel:true, newcap:false */
/*global require, module, exports, document */
"use strict";

var React = require('react');
var BS = require('react-bootstrap');

var Grid = BS.Grid;
var Row = BS.Row;
var Col = BS.Col;

var AnalysisNoneSelected = React.createClass({

    render: function() {
        return (
            <h1>No analysis selected</h1>
        );
    }

});

module.exports = AnalysisNoneSelected;