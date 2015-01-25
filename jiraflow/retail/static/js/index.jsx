/*jshint globalstrict:true, devel:true, newcap:false */
/*global require, module, exports, document, window */
"use strict";

var React = require('react'),
    Router = require('./router');

Router.run(function (Handler, state) {
    React.render(<Handler {...state.params} />, document.body);
});
