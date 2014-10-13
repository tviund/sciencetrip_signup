(function () {
	'use strict';
	function adminUserListCtrl($scope, $http, $log) {
		$http.get('/api/users').success(function (users) {
			$scope.users = users;
		});

        $scope.blackList = function(user) {
            $http.put('/api/users/' + user._id + '/blacklist').success(function(data) {
                $log.log(data);
                user.onBlackList = true;
            });
        };
	};

	angular.module('tviundApp')
		.controller('AdminUserListCtrl', adminUserListCtrl);
})();
