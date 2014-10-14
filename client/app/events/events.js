'use strict';

(function () {
    function eventsConfig($stateProvider) {
        $stateProvider
            .state('events', {
                url: '/events',
                templateUrl: 'app/events/events.html',
                controller: 'EventsCtrl',
                controllerAs: 'vm'
            })
            .state('create', {
                url: '/events/create',
                templateUrl: 'app/events/events.create.html',
                controller: 'EventsCreateCtrl',
                controllerAs: 'vm',
                authenticate: true

            })
            .state('edit', {
                url: '/events/edit/:id',
                templateUrl: 'app/events/events.edit.html',
                controller: 'EventsEditCtrl',
                authenticate: true
            })
            .state('events-details', {
                url: '/events/:id',
                templateUrl: 'app/events/events.details.html',
                controller: 'EventsDetailsCtrl',
                controllerAs: 'vm'
            })
    };

    angular.module('tviundApp')
        .config(eventsConfig);
})();
