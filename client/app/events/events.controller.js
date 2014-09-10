'use strict';

angular.module('tviundApp')
  .controller('EventsCtrl', function ($scope, $http, socket) {
    $http.get('/api/events').success(function (events) {
      $scope.events = events;
      socket.syncUpdates('event', $scope.events);
    });
  });
