(function () {
    'use strict';
    function adminUserListCtrl($scope, $http, $log) {
        $http.get('/api/users').success(function (users) {
            $scope.users = users;
        });
        
        $scope.delete = function(user_id) {
            $http.delete('/api/users/' + user_id).success(function() {
                $log.log($scope.users);
                $scope.users = _.reject($scope.users, function(user) { return user._id === user_id; }); 
                $log.log($scope.users);
            });
        };
    };

    angular.module('tviundApp')
        .controller('AdminUserListCtrl', adminUserListCtrl);
})();
