(function () {
	'use strict';
	function loginCtrl(Auth, $location, $window) {
		var self = this;
		this.user = {};
		this.errors = {};

		this.login = function (form) {
			self.submitted = true;

			if (form.$valid) {
				Auth.login({
					email: self.user.email,
					password: self.user.password
				})
					.then(function () {
						// Logged in, redirect to home
						$location.path('/');
					})
					.catch(function (err) {
						self.errors.other = err.message;
					});
			}
		};

		this.loginOauth = function (provider) {
			$window.location.href = '/auth/' + provider;
		};
	}

	angular.module('tviundApp')
		.controller('LoginCtrl', loginCtrl)

})();
