(function () {
	'use strict';

	function eventsDetailsController($scope, $http, socket, $stateParams, Auth) {
		var self = this;
		$http.get('/api/events/' + $stateParams.id).success(function (event) {
			self.event = event;
			self.enableRegistration = false;
			self.showTimer = true;
			self.countdownInSec = moment(event.startEventDate).diff(moment(), 'seconds');
			if (self.countdownInSec < 0) {
				// To hide the timer
				self.showTimer = false;
				self.enableRegistration = true;
			}
			//socket.syncUpdateOnObject('event:', $scope.event);
		});

		this.countdownFinished = function () {
			$scope.$apply(function () {
				self.enableRegistration = true;
			});
		};

		this.register = function () {
			$http.post('/api/events/' + $stateParams.id + '/attendee');
		};

		this.deRegister = function () {
			$http.delete('/api/events/' + $stateParams.id + '/attendee')
		};

		this.isRegistered = function () {
			if (!self.event) return false;
			if (_.some(self.event.attending, {user: Auth.getCurrentUser()._id})) {
				return true;
			}
			else if (_.some(self.event.queue, {user: Auth.getCurrentUser()._id})) {
				return true;
			}
			return false;
		}
	}


	angular.module('tviundApp')
		.controller('EventsDetailsCtrl', eventsDetailsController);
})();

