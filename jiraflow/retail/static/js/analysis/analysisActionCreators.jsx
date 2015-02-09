/*jshint globalstrict:true, devel:true, newcap:false */
/*global require, module, exports, document, window */
"use strict";

var Marty = require('marty');

var Exception = require('../exception');
var AnalysisConstants = require('./analysisConstants');
var AnalysisAPI = require('./analysisAPI');

/**
 * First order actions for analysis CRUD operations
 */
var AnalysisActionCreators = Marty.createActionCreators({

    fetchAnalyses: AnalysisConstants.FETCH_ANALYSES(function(instanceId) {
        return AnalysisAPI.fetchAll(instanceId)
        .then(result => {
            // inform stores analyses have been received
            this.receiveAnalyses(result);
            return result;
        })
        .catch(error => {
            throw new Exception(500, "Server request failed", error);
        });
    }),

    createAnalysis: AnalysisConstants.CREATE_ANALYSIS(function(instanceId, analysis) {
        return AnalysisAPI.create(instanceId, analysis)
        .then(result => {
            // inform stores an analysis has been received
            this.receiveAnalysis(result);

            // dispatch action with the analysis returned from the server

            var action = this.dispatch(analysis);
            return result;
        })
        .catch(error => {
            throw new Exception(500, "Server request failed", error);
        });
    }),

    updateAnalysis: AnalysisConstants.UPDATE_ANALYSIS(function(instanceId, id, analysis) {
        // optimistically dispatch
        var action = this.dispatch(id, analysis);

        return AnalysisAPI.update(instanceId, id, analysis)
        .then(result => {
            // inform stores an analysis has been received
            this.receiveAnalysis(result);
            return result;
        })
        .catch(error => {
            // roll back action if AJAX operation failed
            action.rollback();
            throw new Exception(500, "Server request failed", error);
        });
    }),

    deleteAnalysis: AnalysisConstants.DELETE_ANALYSIS(function(instanceId, id) {
        // optimistically dispatch
        var action = this.dispatch(id);

        return AnalysisAPI.delete(instanceId, id)
        .then(id => {
            // inform stores an analysis has been deleted
            this.receiveAnalysisDelete(id);
            return id;
        })
        .catch(error => {
            // roll back action if AJAX operation failed
            action.rollback();
            throw new Exception(500, "Server request failed", error);
        });
    }),

    selectAnalysis: AnalysisConstants.SELECT_ANALYSIS(),
    receiveAnalysis: AnalysisConstants.RECEIVE_ANALYSIS(),
    receiveAnalyses: AnalysisConstants.RECEIVE_ANALYSES(),
    receiveAnalysisDelete: AnalysisConstants.RECEIVE_ANALYSIS_DELETE()

});

module.exports = AnalysisActionCreators;