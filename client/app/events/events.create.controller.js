'use strict';

angular.module('tviundApp')
	.controller('EventsCreateCtrl', function ($scope, $http) {

		$scope.model = {};
		$scope.open = function ($event) {
			$event.preventDefault();
			$event.stopPropagation();

			$scope.opened = true;
		};

		$scope.dateOptions = {
			formatYear: 'yy',
			startingDay: 1
		};

		$scope.initDate = new Date();
		$scope.format = 'dd/MM/yyyy';

		$scope.$watch('time', function (val) {
			console.log(val);
		});

		$scope.createEvent = function (form) {
			if (!$scope.time) {
				$scope.time = new Date();
			}
			form.startEventDate = new Date($scope.dt);
			form.startEventDate.setHours($scope.time.getHours(), $scope.time.getMinutes(), $scope.time.getSeconds());
			console.log(form);
			$http.post('/api/events', form).success(function () {
				alert();
			})
		}

	});
