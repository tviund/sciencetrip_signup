'use strict';

angular.module('tviundApp')
  .controller('AdminOrgDetailsCtrl', function ($scope, $http, $stateParams, socket) {
    $http.get('/api/org/' + $stateParams.id).success(function (org) {
      $scope.org = org;
      socket.syncUpdates('org', $scope.org);
    });


    $scope.createGroup = function (form) {
      $http.post('/api/group', {name: form.name}).success(function (res) {
        if (!$scope.org.groups) {
          $scope.org.groups = [];
        }
        $scope.org.groups.push(res._id+'');
        return $http.put('/api/org/' + $stateParams.id, $scope.org);
      });
    };
  });
