/*jshint globalstrict:true, devel:true, newcap:false */
/*global require, module, exports, document */
"use strict";

var React = require('react/addons');
var Marty = require('marty');
var Router = require('react-router');
var BS = require('react-bootstrap');
var RBS = require('react-router-bootstrap');

var InstanceStore = require('../../instance/instanceStore');

var { Grid, Row, Col } = BS;
var { Link } = Router;
var { ButtonLink } = RBS;

var InstanceState = Marty.createStateMixin({
    listenTo: [InstanceStore],
    getState: function() {
        return {
            instances: InstanceStore.getInstances(),
        };
    }
});

var InstanceNoneSelected = React.createClass({
    mixins: [InstanceState],

    render: function() {

        return (
            <Grid fluid={true}>
                <Row>
                    <Col sm={9} smOffset={3} md={10} mdOffset={2}>
                        <h1>Welcome to JIRA Flow</h1>
                        <p>
                            JIRA Flow is a tool to provide additional analysis
                            on the data in a JIRA instance.
                        </p>
                        {this.renderInstances()}
                        <hr />
                        <p>
                            <ButtonLink to="newInstance" bsStyle="success">Configure new instance</ButtonLink>
                        </p>
                    </Col>
                </Row>
          </Grid>
        );
    },


    renderInstances: function() {
        var instances = this.state.instances;
        var haveInstances = instances.size > 0;

        if(!haveInstances) {
            return;
        }

        return (
            <div>
                <p>
                    The following instances have been configured:
                </p>
                <ul>
                    {instances.map((i, idx) => <li key={idx}><Link to="instance" params={{instanceId: i.get('id')}}>{i.get('title')}</Link></li>).toArray()}
                </ul>
            </div>
        );

    }

});

module.exports = InstanceNoneSelected;