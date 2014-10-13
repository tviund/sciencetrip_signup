(function () {
	'use strict';

	function eventsDetailsController($scope, event, socket) {
		var ctrl = this;
		ctrl.event = event;
		console.log(event.isRegistered());
		this.countdownFinished = function () {
			$scope.$apply(function () {
				ctrl.enableRegistration = true;
			});
		};
	}


	angular.module('tviundApp')
		.controller('EventsDetailsCtrl', eventsDetailsController);
})();

