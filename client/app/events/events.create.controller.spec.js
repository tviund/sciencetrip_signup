'use strict';

describe('Controller: EventsCreateCtrl', function () {

	// load the controller's module
	beforeEach(module('tviundApp'));

	var EventsCreateCtrl, scope;

	// Initialize the controller and a mock scope
	beforeEach(inject(function ($controller, $rootScope) {
		scope = $rootScope.$new();
		EventsCreateCtrl = $controller('EventsCreateCtrl', {
			$scope: scope
		});
	}));

	it('should ...', function () {
		expect(1).toEqual(1);
	});
});
