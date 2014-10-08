(function () {
	'use strict';

	function eventsCtrl($http, socket) {
		var self = this;
		$http.get('/api/events').success(function (events) {
			self.events = events;
			socket.syncUpdates('event', self.events);
		});
	}

	angular.module('tviundApp')
		.controller('EventsCtrl', eventsCtrl);
})();
