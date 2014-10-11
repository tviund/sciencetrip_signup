angular.module('tviundApp')
  .controller('EventsEditCtrl', function ($stateParams, $scope, $log, $http, $location) {
    $http.get('/api/events/' + $stateParams.id).success(function (event) {
      $scope.event = event;
    });

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

    $scope.submitForm = function() {
      $http.put('/api/events/' + $scope.event._id, $scope.event)
        .success(function() {
          $log.error('here');
          $location.path('/events/' + $scope.event._id).replace();
        });
    };
  });
