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
            throw new Exception(error.status, "Server request failed", error);
        });
    }),

    createAnalysis: AnalysisConstants.CREATE_ANALYSIS(function(instanceId, analysis) {
        return AnalysisAPI.create(instanceId, analysis)
        .then(result => {
            // inform stores an analysis has been received
            this.receiveAnalysis(result);

            // dispatch action with the analysis returned from the server

            this.dispatch(analysis);
            return result;
        })
        .catch(error => {
            throw new Exception(error.status, "Server request failed", error);
        });
    }),

    updateAnalysis: AnalysisConstants.UPDATE_ANALYSIS(function(instanceId, id, analysis) {
        return AnalysisAPI.update(instanceId, id, analysis)
        .then(result => {
            // inform stores an instance has been received
            this.receiveAnalysisUpdate(id, result);

            // dispatch action with the instance as returned by the server
            this.dispatch(id, result);
            return result;
        })
        .catch(error => {
            throw new Exception(error.status, "Server request failed", error);
        });
    }),

    deleteAnalysis: AnalysisConstants.DELETE_ANALYSIS(function(instanceId, id) {
        return AnalysisAPI.deleteAnalysis(instanceId, id)
        .then(id => {
            // inform stores an analysis has been deleted
            this.receiveAnalysisDelete(id);

            // dispatch this action
            this.dispatch(id);
            return id;
        })
        .catch(error => {
            throw new Exception(error.status, "Server request failed", error);
        });
    }),

    // TODO: Support update via separate operation in case id changes

    selectAnalysis: AnalysisConstants.SELECT_ANALYSIS(),
    receiveAnalysis: AnalysisConstants.RECEIVE_ANALYSIS(),
    receiveAnalyses: AnalysisConstants.RECEIVE_ANALYSES(),
    receiveAnalysisUpdate: AnalysisConstants.RECEIVE_ANALYSIS_UPDATE(),
    receiveAnalysisDelete: AnalysisConstants.RECEIVE_ANALYSIS_DELETE()

});

module.exports = AnalysisActionCreators;