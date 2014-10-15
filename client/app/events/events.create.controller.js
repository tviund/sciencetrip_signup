(function () {
  'use strict';
  
  function eventCreateCtrl($scope, $http, $filter, $state) {
    $scope.format = 'dd/MM/yyyy';
    $scope.model = {
      date: $filter('date')(new Date, 'dd/MM/yyyy'),
    };
  
    $scope.open = function ($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.opened = true;
    };
  
    $scope.submitEvent = function ($event) {
      $http.post('/api/events', $scope.model).success(function(data) {
        $state.go('events');
      });
    };
  };
  angular.module('tviundApp')
    .controller('EventsCreateCtrl', eventCreateCtrl);
})();
