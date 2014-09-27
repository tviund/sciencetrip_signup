'use strict';

angular.module('tviundApp')
	.controller('EventsDetailsCtrl', function ($scope, $http, socket, $stateParams, Auth) {
		$http.get('/api/events/' + $stateParams.id).success(function (event) {
			$scope.event = event;
			$scope.event.enableRegistration = false;
			$scope.event.showTimer = true;
			$scope.event.countdownInSec = moment(event.startEventDate).diff(moment(), 'seconds');
			if ($scope.event.countdownInSec < 0) {
				// To hide the timer
				$scope.event.showTimer = false;
				$scope.event.enableRegistration = true;
			}
			socket.syncUpdateOnObject('event:', $scope.event);
		});

		$scope.countdownFinished = function () {
			$scope.$apply(function () {
				$scope.event.enableRegistration = true;
			});
		};

		$scope.register = function () {
			$http.post('/api/events/' + $stateParams.id + '/attendee');
		};

		$scope.deRegister = function () {
			$http.delete('/api/events/' + $stateParams.id + '/attendee')
		};

		$scope.isRegistered = function () {
			if (!$scope.event) return false;
			if (_.some($scope.event.attending, {user: Auth.getCurrentUser()._id})) {
				return true;
			}
			else if (_.some($scope.event.queue, {user: Auth.getCurrentUser()._id})) {
				return true;
			}
			return false;
		}
	});
