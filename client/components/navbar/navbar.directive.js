'use strict';

(function () {
    function navbar(Auth, $location) {
        return {
            templateUrl: 'components/navbar/navbar.html',
            restrict: 'EA',
            link: function (scope, element, attrs) {
                scope.menu = [{
                  'title': 'Home',
                  'link': '/',
                  'canSee': true
                }, {
                  'title': 'Events',
                  'link': '/events',
                  'canSee': true
                }, {
                  'title': 'Create event',
                  'link': '/events/create',
                  'canSee': Auth.isAdmin
                }, {
                  'title': 'System Admin',
                  'link': '/admin',
                  'canSee': Auth.isAdmin
                }];

                scope.isCollapsed = true;
                scope.isLoggedIn = Auth.isLoggedIn;
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
    };

    angular.module('tviundApp')
        .directive('navbar', navbar);
})();
