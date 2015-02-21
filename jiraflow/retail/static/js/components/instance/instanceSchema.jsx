"use strict";

var React = require('react');
var ReactForms = require('react-forms');

var { Mapping, Scalar } = ReactForms.schema;

var schema = Mapping({

    title: Scalar({
        label: "Title",
        hint: "Enter a descriptive title for this instance",
        required: true
    }),

    url: Scalar({
        label: "URL",
        hint: "Full URL to the JIRA instance",
        required: true,
        validate: function(node, value) {
            if (!/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi.test(value)) {
              return new Error('not a URL');
            }
        }
    }),

    username: Scalar({
        label: "User name",
        hint: "User name to use to connect to JIRA",
        required: true
    }),

    password: Scalar({
        label: "Password",
        hint: "Password to use to connect to JIRA",
        required: true,
        input: <input type="password" />
    })

});

module.exports = schema;