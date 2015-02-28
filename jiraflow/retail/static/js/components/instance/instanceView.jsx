"use strict";

var Immutable = require('immutable');
var React = require('react/addons');

var InstanceView = React.createClass({
    mixins: [React.addons.PureRenderMixin],

    propTypes: {
        instance: React.PropTypes.instanceOf(Immutable.Map)
    },

    render: function() {

        var instance = this.props.instance;

        return (
            <div>
                <h1>JIRA Instance: {instance.get('title')}</h1>
                <p>
                    <em><a href={instance.get('url')} target="_new">{instance.get('url')}</a></em>
                </p>
                <p>
                    Please choose an analysis from the list on the left, or
                    click <em>New analys</em> to configure a new one.
                </p>
            </div>
        );
    }

});

module.exports = InstanceView;