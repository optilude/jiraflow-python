/*jshint globalstrict:true, devel:true, newcap:false */
/*global require, module, exports, document */
"use strict";

var React = require('react'),

    BS              = require('react-bootstrap'),
    Grid            = BS.Grid,
    Row             = BS.Row,
    Col             = BS.Col,

    Sidebar         = require('./navigation').Sidebar,
    Analysis        = require('./analysis').Analysis;

var Layout = React.createClass({
    render: function() {

        return (

            <Grid fluid={true}>
                <Row>
                    <Col sm={3} md={2}>
                        <Sidebar />
                    </Col>
                    <Col sm={9} md={10}>
                        <Analysis />
                    </Col>
                </Row>
          </Grid>
        );

    }
});

module.exports = {
  Layout: Layout
};
