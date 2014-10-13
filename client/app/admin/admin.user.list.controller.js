(function () {
	'use strict';
	function adminUserListCtrl($scope, $http) {
		$http.get('/api/users').success(function (users) {
			$scope.users = users;
		});
	}

	angular.module('tviundApp')
		.controller('AdminUserListCtrl', adminUserListCtrl);
})();
