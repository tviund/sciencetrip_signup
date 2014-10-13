(function () {
	'use strict';

	function eventsCtrl(events) {
		var ctrl = this;
		ctrl.events = events;
		console.log(events);
	}

	angular.module('tviundApp')
		.controller('EventsCtrl', eventsCtrl);
})();
