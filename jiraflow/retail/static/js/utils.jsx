/*jshint globalstrict:true, devel:true, newcap:false */
/*global require, module, exports, document, window */
"use strict";

var _ = require('lodash');

module.exports = {

    /**
     * Like _.find(), but operates on a cursor of an array and visits a cursor
     * with fn(), returning a refined cursor.
     */
    find: function(cursor, fn) {
        var idx = _.findIndex(cursor.value, function(item, index) {
            return fn(cursor.refine(index), index, cursor);
        });

        if(idx < 0) {
            return undefined;
        }

        return cursor.refine(idx);
    },

    /**
     * Like _.findIndex(), but operates on a cursor of an array and visits a
     * cursor with fn().
     */
    findIndex: function(cursor, fn) {
        return _.findIndex(cursor.value, function(item, index) {
            return fn(cursor.refine(index), index, cursor);
        });
    },

    /**
     * Like _.map(), but operates on a cursor of an array and visits a cursor
     * with fn(). Returns a native array (not a cursor).
     */
    map: function(cursor, fn) {
        return _.map(cursor.value, function(item, index) {
            return fn(cursor.refine(index), index, cursor);
        });
    },

    /**
     * Like _.filter(), but operates on a cursor of an array and visits a cursor
     * with fn(). Returns a native array (not a cursor).
     */
    filter: function(cursor, fn) {
        var r = [];
        _.forEach(cursor.value, function(item, index) {
            var c = cursor.refine(index);
            if(fn(c, index, cursor)) {
                r.push(c);
            }
        });
        return r;
    },

    /**
     * Like _.forEach(), but operates on a cursor of an array and visits a cursor
     * with fn(). Returns cursor.
     */
    forEach: function(cursor, fn) {
        _.forEach(cursor.value, function(item, index) {
            return fn(cursor.refine(index), index, cursor);
        });
        return cursor;
    }

};