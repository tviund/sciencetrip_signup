'use strict';

angular.module('tviundApp')
  .controller('AdminOrgCtrl', function ($scope, $http, socket) {

    $scope.create = {};

    $http.get('/api/org').success(function (orgs) {
      $scope.orgs = orgs;
      socket.syncUpdates('org', $scope.orgs);
    });


    $scope.createOrg = function (form) {
      $http.post('/api/org', {name: form.name});
    };

    $scope.deleteOrg = function(id){
      $http.delete('/api/org/'+id);
      socket.syncUpdates('org', $scope.orgs);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('org');
    });
  });
