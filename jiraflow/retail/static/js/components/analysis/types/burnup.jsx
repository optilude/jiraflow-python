"use strict";

var Immutable = require('immutable');
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
        return super.serialize(value).set('parameters', Immutable.fromJS([
            {key: 'scopeLine', value: value.get('scopeLine')}
        ]));
    }

    deserialize(value) {
        return super.deserialize(value).merge({
            scopeLine: this.extractParameter(value, 'scopeLine')
        });
    }

}

module.exports = Burnup;