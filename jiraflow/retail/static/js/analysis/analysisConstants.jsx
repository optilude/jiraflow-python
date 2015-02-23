"use strict";

var Marty = require('marty');

var AnalysisConstants = Marty.createConstants([
    'FETCH_ANALYSES',           // e.g. user refreshes list of analyses
    'CREATE_ANALYSIS',          // e.g. user instigates creation of new analysis
    'UPDATE_ANALYSIS',          // e.g. user instigates change to existing analysis
    'DELETE_ANALYSIS',          // e.g. user instigates deletion of existing analysis
    'SELECT_ANALYSIS',          // e.g. user selects an analysis

    'RECEIVE_ANALYSES',         // e.g. after a full list of analyses received from the server
    'RECEIVE_ANALYSIS',         // e.g. after a single analysis has been received from the server
    'RECEIVE_ANALYSIS_UPDATE',  // e.g. after a single analysis has been changed on the server
    'RECEIVE_ANALYSIS_DELETE'   // e.g. after server has deleted an analysis
]);

module.exports = AnalysisConstants;