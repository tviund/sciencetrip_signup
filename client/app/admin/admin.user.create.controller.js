'use strict';

angular.module('tviundApp')
  .controller('AdminUserCreateCtrl', function ($scope) {
    $scope.model = {};
    $scope.model.orgs = ['Tvíund','Curator']
    $scope.model.groups = ['Nýnemar','Greitt']
  });
