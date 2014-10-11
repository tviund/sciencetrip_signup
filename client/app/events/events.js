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
      })
      .state('edit', {
        url: '/events/edit/:id',
        templateUrl: 'app/events/events.edit.html',
        controller: 'EventsEditCtrl'
      })
      .state('events-details', {
        url: '/events/:id',
        templateUrl: 'app/events/events.details.html',
        controller: 'EventsDetailsCtrl'
      })
  });
