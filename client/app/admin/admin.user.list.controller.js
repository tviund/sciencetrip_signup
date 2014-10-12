'use strict';

angular.module('tviundApp')
  .controller('AdminUserListCtrl', function ($scope, $http) {
    $http.get('/api/users').success(function (users) {
      $scope.users = users;
    });
  });
