(function () {
	'use strict';

	function eventCreateCtrl($http) {
		var self = this;
		this.open = function ($event) {
			$event.preventDefault();
			$event.stopPropagation();

			self.opened = true;
		};

		this.dateOptions = {
			formatYear: 'yy',
			startingDay: 1
		};

		this.initDate = new Date();
		this.format = 'dd/MM/yyyy';

		this.createEvent = function (event) {
			if (!self.time) {
				self.time = new Date();
			}
			event.startEventDate = new Date(self.dt);
			event.startEventDate.setHours(self.time.getHours(), self.time.getMinutes(), self.time.getSeconds());

			$http.post('/api/events', event).success(function () {
				alert();
			})
		}
	}

	angular.module('tviundApp')
		.controller('EventsCreateCtrl',eventCreateCtrl)
})();
