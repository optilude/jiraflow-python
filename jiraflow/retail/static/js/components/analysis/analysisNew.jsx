"use strict";

var React = require('react/addons');
var BS = require('react-bootstrap');

var AnalysisForm = require('./analysisForm');

var { Button, Alert } = BS;

/**
 * Form to create a new analysis
 */
var AnalysisNew = React.createClass({
    mixins: [React.addons.PureRenderMixin],

    getInitialState: function() {
        return {
            invalid: false,
            exists: false,
            error: false
        };
    },

    render: function () {

        return (
            <div>
                {this.state.invalid? <Alert bsStyle="danger">Please fill in all required fields</Alert> : ""}
                {this.state.exists? <Alert bsStyle="danger">You have already configured an analysis with this title.</Alert> : ""}
                {this.state.error? <Alert bsStyle="danger">An unexpected error occurred saving the new analysis. Please try again later.</Alert> : ""}

                <h1>Create new analysis</h1>
                <p className="help-block">
                    Pick a type and then configure the new analysis
                </p>
                <form onSubmit={this.onSubmit}>
                    <AnalysisForm ref="form" />
                    <Button type="submit" bsStyle="primary">Create</Button>
                </form>
            </div>
        );

    },

    onSubmit: function(e) {
        e.preventDefault();

        var form = this.refs.form;
        if(!form.isValid()) {
            this.setState({invalid: true, exists: false, error: false});
            return;
        } else {
            this.setState({invalid: false, exists: false, error: false});
        }

        var value = this.refs.form.getValue();

        // TODO: Handle conversion to params and submission

        // InstanceActionCreators.createInstance(value)
        // .then(instance => {
        //     NavigationActionCreators.navigateToInstance(instance.get('id'));
        // })
        // .catch(error => {
        //     if(error.status === 409) {
        //         this.setState({invalid: false, exists: true, error: false});
        //     } else {
        //         console.error(error);
        //         this.setState({invalid: false, exists: false, error: true});
        //     }
        // });
    }
});

module.exports = AnalysisNew;