'use strict';

describe('Controller: AdminOrgDetailsCtrl', function () {

  // load the controller's module
  beforeEach(module('tviundApp'));

  var AdminOrgDetailsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AdminOrgDetailsCtrl = $controller('AdminOrgDetailsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
