'use strict';

angular.module('tviundApp')
  .controller('AdminUserCreateCtrl', function ($scope, $http) {
    $scope.model = {
      selectedGroups: []
    };
    $http.get('/api/org').success(function (res) {
      console.log(res);
      $scope.orgs = res;
    });

    $scope.addGroup = function (group) {
      $scope.model.selectedGroups.push(group);
      _removeFromGroup($scope.groups, group._id);
    };

    $scope.removeGroup = function (group) {
      _removeFromGroup($scope.model.selectedGroups, group._id);
      $scope.groups.push(group);
    };

    function _removeFromGroup(list, id) {
      var index = _.indexOf(list, {_id: id});
      if (index) {
        list.splice(index, 1);
      }
    }

    $scope.createUser = function (form) {
      form.orgs = _.map(form.selected, function(org){
        return org._id;
      });
      delete form.selected;
      form.groups = _.map(form.selectedGroups, function(group){
        return group._id;
      });
      delete form.selectedGroups;


      $http.post('/api/users', form).success(function(){
        form = {};
        alert('success');
      });
    };

    $scope.$watch('model.selected', function (val, oldVal) {
      // If we remove a value we remove them from the lists
      if (val && oldVal && val.length < oldVal.length) {
        _.forEach(_.difference(oldVal, val), function (org) {
          _.forEach(org.groups, function (group) {
            _removeFromGroup($scope.groups, group._id);
            _removeFromGroup($scope.model.selectedGroups, group._id);
          })
        });
      }

      if (val && oldVal && val.length > oldVal.length && val.length > 0) {

        $http.get('/api/org/' + $scope.model.selected[$scope.model.selected.length - 1]._id).success(function (res) {

          if (!res.groups) return;
          if (!$scope.groups) $scope.groups = [];
          // Add name of org to the group so that the user has an idea on what he is clicking;
          _.forEach(res.groups, function (group) {
            group.ownerId = res._id;
            group.owner = res.name;
          });
          $scope.groups = $scope.groups.concat(res.groups);
          $scope.showGroups = true;
        })
      }
    });
  });
