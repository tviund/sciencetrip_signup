'use strict';

angular.module('tviundApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('events', {
        url: '/events',
        templateUrl: 'app/events/events.html',
        controller: 'EventsCtrl'
      })
        .state('create', {
            url: '/events/create',
            templateUrl: 'app/events/events.create.html',
            controller: 'EventsCreateCtrl'
        });
  });