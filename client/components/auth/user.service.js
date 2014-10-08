(function () {
	'use strict';
	function user($resource) {
		return $resource('/api/users/:id/:controller', {
				id: '@_id'
			},
			{
				changePassword: {
					method: 'PUT',
					params: {
						controller: 'password'
					}
				},
				get: {
					method: 'GET',
					params: {
						id: 'me'
					}
				}
			});
	}

	angular.module('tviundApp')
		.factory('User', user);
})();
