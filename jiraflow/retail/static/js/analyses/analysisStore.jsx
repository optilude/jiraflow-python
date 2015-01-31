/*jshint globalstrict:true, devel:true, newcap:false */
/*global require, module, exports, document, window */
"use strict";

var Immutable = require('immutable');

var Marty = require('marty');
var InstanceConstants = require('instance/instanceConstants');
var InstanceStore = require('instance/instanceStore');
var AnalysisConstants = require('./analysisConstants');
var AnalysisActionCreators = require('./analysisActionCreators');

/**
 * Stores a list of analyses available to the current user, plus the currently
 * selected analysis.
 */
var AnalysisStore = Marty.createStore({
    displayName: 'analyses',

    getAnalyses: function () {
        return this.state.analyses.valueSeq();
    },

    getSelectedAnalysis: function () {
        return this.state.selectedAnalysis? this.state.analyses.get(this.state.selectedAnalysis) : null;
    },

    // Internal state management

    getInitialState: function () {
        return {
            analyses: Immutable.OrderedMap(), // id -> Immutable.Map()
            selectedAnalysis: null             // id
        };
    },

    // Action handlers

    handlers: {
        _selectInstance: InstanceConstants.SELECT_INSTANCE,
        _selectAnalysis: AnalysisConstants.SELECT_ANALYSIS,
        _receiveAnalyses: AnalysisConstants.RECEIVE_ANALYSES,
        _receiveAnalysis: AnalysisConstants.RECEIVE_ANALYSIS,
        _receiveAnalysisDelete: AnalysisConstants.RECEIVE_ANALYSIS_DELETE
    },

    _selectInstance: function(id) {
        this.waitFor(InstanceStore);

        // force a re-fetch of everything
        // TODO: Is this right? see http://stackoverflow.com/questions/28257724/ajax-in-flux-refreshing-stores-when-dependent-state-changes
        AnalysisActionCreators.fetchAnalyses(id);
    },

    _selectAnalysis: function(id) {
        if(!this.state.analyses.has(id)) {
            throw "Analysis with id " + id + " not known";
        }

        if(id !== this.state.id) {
            this.state.selectedAnalysis = id;
            this.hasChanged();
        }
    },

    _receiveAnalyses: function(analyses) {

        var analysisData = analyses.map(function(analysis) {
            if(!(analysis instanceof Immutable.Map)) {
                throw "Each analysis must be an Immutable.Map";
            }

            return [analysis.get('id'), analysis];
        });

        this.state.analyses = Immutable.OrderedMap(analysisData);
        this.state.selectedAnalysis = null;
        this.hasChanged();
    },

    _receiveAnalysis: function(analysis) {
        if(!(analysis instanceof Immutable.Map)) {
            throw "Analysis must be an Immutable.Map";
        }

        if(!analysis.equals(this.state.analyses.get(analysis.id))) {
            this.state.analyses = this.state.analyses.set(analysis.id, analysis);
            this.hasChanged();
        }
    },

    _receiveAnalysisDelete: function(id) {

        if(!this.state.analyses.has(id)) {
            throw "Instance not found";
        }

        this.state.analyses = this.state.analysis.delete(id);

        if(this.state.id === id) {
            this.state.id = null;
        }

        this.hasChanged();
    }

});

module.exports = AnalysisStore;