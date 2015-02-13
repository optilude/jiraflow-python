/*jshint globalstrict:true, devel:true, newcap:false */
/*global require, module, exports, document */
"use strict";

var React = require('react/addons');
var BS = require('react-bootstrap');

var { Grid, Row, Col } = BS;

var AnalysisNoneSelected = React.createClass({
    mixins: [React.addons.PureRenderMixin],

    render: function() {
        return (
            <h1>No analysis selected</h1>
        );
    }

});

module.exports = AnalysisNoneSelected;