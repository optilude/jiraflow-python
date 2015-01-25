/*jshint globalstrict:true, devel:true, newcap:false */
/*global require, module, exports, document */
"use strict";

var React = require('react'),
    ImmutableOptimizations = require('react-cursor').ImmutableOptimizations,

    BS              = require('react-bootstrap'),
    Grid            = BS.Grid,
    Row             = BS.Row,
    Col             = BS.Col;

var NoInstanceSelected = React.createClass({
    mixins: [ImmutableOptimizations([])],

    propTypes: {
    },

    render: function() {

        return (
            <Grid fluid={true}>
                <Row>
                    <Col sm={3} md={2}>
                    </Col>
                    <Col sm={9} md={10}>
                        <h1>No instance selected</h1>
                    </Col>
                </Row>
          </Grid>
        );

    }
});

module.exports = NoInstanceSelected;