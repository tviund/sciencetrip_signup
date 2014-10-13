(function () {
	'use strict';
	function settingsCtrl(User, Auth) {
		var self = this;
		this.errors = {};

		this.changePassword = function (form) {
			self.submitted = true;
			if (form.$valid) {
				Auth.changePassword(self.user.oldPassword, self.user.newPassword)
					.then(function () {
						self.message = 'Password successfully changed.';
					})
					.catch(function () {
						form.password.$setValidity('mongoose', false);
						self.errors.other = 'Incorrect password';
						self.message = '';
					});
			}
		};
	}

	angular.module('tviundApp')
		.controller('SettingsCtrl', settingsCtrl);

})();
