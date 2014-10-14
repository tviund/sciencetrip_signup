(function () {
    'use strict';
    function navbar(Auth, $location) {
        return {
            templateUrl: 'components/navbar/navbar.html',
            restrict: 'EA',
            link: function (scope, element, attrs) {
                scope.menu = [{
                    'title': 'Home',
                    'link': '/'
                }, {
                    'title': 'Events',
                    'link': '/events'
                },
                    {
                        'title': 'Create event',
                        'link': '/events/create'
                    }, {
                        'title': 'System Admin',
                        'link': '/admin'
                    }];

                scope.isCollapsed = true;
                scope.isLoggedIn = Auth.isLoggedIn;
                scope.isAdmin = Auth.isAdmin;
                scope.getCurrentUser = Auth.getCurrentUser;

                scope.logout = function () {
                    Auth.logout();
                    $location.path('/login');
                };

                scope.isActive = function (route) {
                    return route === $location.path();
                };
            }
        };
    }

    angular.module('tviundApp')
        .directive('navbar', navbar);

})();
