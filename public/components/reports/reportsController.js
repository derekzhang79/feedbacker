/*
 * Controller search for connection, uploading bulk connections and for sending connection/invitation requests
 */
fbControllers.controller('ReportsCtrl', ['$log', 'Model', 'Nomination', function($log, Model, Nomination) {

	var ctrl = this;

    ctrl.error = undefined;
    ctrl.reports = [];

    Model.getReports().then(function(response) {
        ctrl.reports = response;
    }, function(response) {
        ctrl.error = response;
    });

}]);
