(function () {
	'use strict';

	function adminConfig($stateProvider) {
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
			.state('org', {
				url: '/admin/org',
				templateUrl: 'app/admin/admin.org.html',
				controller: 'AdminOrgCtrl'
			})
			.state('org.details', {
				url: '/:id',
				templateUrl: 'app/admin/admin.org.details.html',
				controller: 'AdminOrgDetailsCtrl'
			})
			.state('org.details.groups', {
				url: '/groups',
				templateUrl: 'app/admin/admin.org.details.groups.html',
				controller: 'AdminOrgDetailsGroupsCtrl'
			})
			.state('org.details.users', {
				url: '/users',
				templateUrl: 'app/admin/admin.org.details.users.html',
				controller: 'AdminOrgDetailsUsersCtrl',
				controllerAs: 'um'
			});
	}

	angular.module('tviundApp')
		.config(adminConfig)

})();
