'use strict';

angular.module('tviundApp')
  .controller('AdminOrgDetailsCtrl', function ($scope, $http, $stateParams, socket) {
    $http.get('/api/org/' + $stateParams.id).success(function (org) {
      $scope.org = org;
      console.log(org);
    });

    $scope.createGroup = function (form) {
      $http.post('/api/group', {name: form.name}).success(function (resGroup) {
        return $http.post('/api/org/' + $stateParams.id + '/' + resGroup._id).success(function (resOrg) {
          if (!$scope.org.groups) $scope.org.groups = [];
          $scope.org.groups.push(resGroup);
          form = '';
          $scope.addGroup = false;
        });
      });
    };

    $scope.removeGroup = function (groupId) {
      $http.delete('/api/group/' + groupId).success(function () {
        var index = _.indexOf($scope.org.groups, {_id: groupId});
        $scope.org.groups.splice(index, 1);
      })
    }
  });
