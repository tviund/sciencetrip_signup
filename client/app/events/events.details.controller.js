'use strict';

angular.module('tviundApp')
  .controller('EventsDetailsCtrl', function ($scope, $http, socket, $stateParams) {
    $http.get('/api/events/' + $stateParams.id).success(function (event) {
      $scope.event = event;
      $scope.event.enableRegistration = false;
      $scope.event.showTimer = true;
      $scope.event.countdownInSec = moment(event.startEventDate).diff(moment(),'seconds');
      if($scope.event.countdownInSec < 0){
        // To hide the timer
        $scope.event.showTimer = false;
        $scope.event.enableRegistration = true;
      }
      socket.syncUpdates('event', $scope.event);
    });

    $scope.countdownFinished = function(){
      $scope.$apply(function(){
        $scope.event.enableRegistration = true;
      });
    };

    $scope.register = function(){
      $http.post('/api/events/'+$stateParams.id+'/attendee');
    }
  });
