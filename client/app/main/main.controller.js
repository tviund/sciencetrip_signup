'use strict';

angular.module('tviundApp')
    .controller('MainCtrl', function ($scope, $http, socket) {
        $scope.awesomeThings = [];

        $http.get('/api/events').success(function (awesomeThings) {
            $scope.awesomeThings = awesomeThings;
            socket.syncUpdates('event', $scope.awesomeThings);
        });

        $scope.addThing = function () {
            if ($scope.newThing === '') {
                return;
            }
            $http.post('/api/events', { name: $scope.newThing });
            $scope.newThing = '';
        };

        $scope.deleteThing = function (event) {
            $http.delete('/api/events/' + event._id);
        };

        $scope.$on('$destroy', function () {
            socket.unsyncUpdates('event');
        });
    });
