"use strict";

var ReactForms = require('react-forms');

var { Mapping, Scalar } = ReactForms.schema;

var schema = Mapping({

    name: Scalar({
        label: "Name",
        hint: "Enter your full name",
        required: true
    }),

    email: Scalar({
        label: "Email address",
        hint: "Enter your email address. This will be used as your login name.",
        required: true,
        validate: function(node, value) {
            if(!/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gi.test(value)) {
              return new Error('not an email address');
            }
        }
    })

});

module.exports = schema;