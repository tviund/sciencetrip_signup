(function () {
	'use strict';
	function adminOrgDetailsCtrl($scope, $http, $stateParams, socket) {
		$http.get('/api/org/' + $stateParams.id).success(function (org) {
			$scope.org = org;
		});
	}

	angular.module('tviundApp')
		.controller('AdminOrgDetailsCtrl', adminOrgDetailsCtrl);
})();
