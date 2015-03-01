"use strict";

var ReactForms = require('react-forms');

var Common = require('./common');

var { Mapping, Scalar } = ReactForms.schema;

var BurnupSchema = Mapping({

    scopeLine: Scalar({
        label: "Scope line",
        hint: "",
        required: true
    })

});

/**
 * Advanced burn-up chart
 */
class Burnup extends Common {

    constructor() {
        this.type = "burnup";
        this.schema = this.mergeSchema(BurnupSchema);
    }

    serialize(value) {

    }

    deserialize(value) {

    }

}

module.exports = Burnup;