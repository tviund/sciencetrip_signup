'use strict';

describe('Controller: AdminUserCreateCtrl', function () {

  // load the controller's module
  beforeEach(module('tviundApp'));

  var AdminUserCreateCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AdminUserCreateCtrl = $controller('AdminUserCreateCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
