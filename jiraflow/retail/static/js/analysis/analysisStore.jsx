/*jshint globalstrict:true, devel:true, newcap:false */
/*global require, module, exports, document, window */
"use strict";

var Immutable = require('immutable');
var Marty = require('marty');

var NavigationConstants = require('../navigation/navigationConstants');
var NavigationStore = require('../navigation/navigationStore');
var UserConstants = require('../user/userConstants');
var UserStore = require('../user/userStore');
var InstanceConstants = require('../instance/instanceConstants');
var InstanceStore = require('../instance/instanceStore');
var AnalysisConstants = require('./analysisConstants');
var AnalysisActionCreators = require('./analysisActionCreators');
var AnalysisAPI = require('./analysisAPI');

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

    updatePending: function() {
        return this.state.updatePending;
    },

    // Internal state management

    getInitialState: function () {
        return {
            updatePending: false,              // true during refresh
            analyses: Immutable.OrderedMap(),  // id -> Immutable.Map()
            selectedAnalysis: null             // id
        };
    },

    // Action handlers

    handlers: {
        _changeUser: UserConstants.RECEIVE_USER,
        _selectInstance: InstanceConstants.SELECT_INSTANCE,
        _receiveInstances: InstanceConstants.RECEIVE_INSTANCES,
        _navigate: NavigationConstants.NAVIGATE,
        _selectAnalysis: AnalysisConstants.SELECT_ANALYSIS,
        _receiveAnalyses: AnalysisConstants.RECEIVE_ANALYSES,
        _receiveAnalysis: AnalysisConstants.RECEIVE_ANALYSIS,
        _receiveAnalysisDelete: AnalysisConstants.RECEIVE_ANALYSIS_DELETE
    },

    _changeUser: function(user, refresh /* default: true */) {
        this.waitFor(UserStore);

        // Clear out existing data
        this.state.analyses = Immutable.OrderedMap();
        this.hasChanged();
    },

    _selectInstance: function(id) {
        this.waitFor(InstanceStore);

        this.state.updatePending = true;
        this.state.analyses = Immutable.OrderedMap();
        this.hasChanged();

        // force a re-fetch of everything
        AnalysisAPI.fetchAll()
        .then(function(result) {
            AnalysisActionCreators.receiveAnalyses(result);
            return result;
        })
        .catch(function(error) {
            console.error(error);
        });
    },

    _receiveInstances: function(instances, refresh /* default: true */) {
        this.waitFor(InstanceStore);

        this.state.updatePending = true;
        this.state.analyses = Immutable.OrderedMap();
        this.hasChanged();

        if(refresh !== false) { // true or undefined
            // force a re-fetch of everything
            AnalysisAPI.fetchAll()
            .then(function(result) {
                AnalysisActionCreators.receiveAnalyses(result);
                return result;
            })
            .catch(function(error) {
                console.error(error);
            });
        }
    },

    _navigate: function(action) {
        this.waitFor(NavigationStore);

        var analysisId = NavigationStore.getParams().analysisId;
        if(analysisId) {
            this._selectAnalysis(analysisId);
        }
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

        this.state.updatePending = false;
        this.state.analyses = Immutable.OrderedMap(analysisData);
        this.state.selectedAnalysis = null;
        this.hasChanged();
    },

    _receiveAnalysis: function(analysis) {
        if(!(analysis instanceof Immutable.Map)) {
            throw "Analysis must be an Immutable.Map";
        }

        if(!analysis.equals(this.state.analyses.get(analysis.get('id')))) {
            this.state.analyses = this.state.analyses.set(analysis.get('id'), analysis);
            this.hasChanged();
        }
    },

    _receiveAnalysisDelete: function(id) {
        if(!this.state.analyses.has(id)) {
            throw "Instance not found";
        }

        this.state.analyses = this.state.analyses.delete(id);

        if(this.state.id === id) {
            this.state.id = null;
        }

        this.hasChanged();
    }

});

module.exports = AnalysisStore;