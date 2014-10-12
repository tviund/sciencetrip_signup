'use strict';

angular.module('tviundApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('admin', {
        url: '/admin',
        templateUrl: 'app/admin/admin.html',
        controller: 'AdminCtrl'
      })
      .state('createUser', {
        url: '/admin/createUser',
        templateUrl: 'app/admin/admin.user.create.html',
        controller: 'AdminUserCreateCtrl'
      })
      .state('listUsers', {
        url: '/admin/listUsers',
        templateUrl: 'app/admin/admin.user.list.html',
        controller: 'AdminUserListCtrl'
      })
      .state('org', {
        url: '/admin/org',
        templateUrl: 'app/admin/admin.org.html',
        controller: 'AdminOrgCtrl'
      })
      .state('org.details', {
        url: '/:id',
        templateUrl: 'app/admin/admin.org.details.html',
        controller: 'AdminOrgDetailsCtrl'
      });
  });
