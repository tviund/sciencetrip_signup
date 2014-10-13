(function () {
	'use strict';
	function accountConfig($stateProvider) {
		$stateProvider
			.state('login', {
				url: '/login',
				templateUrl: 'app/account/login/login.html',
				controller: 'LoginCtrl',
				controllerAs: 'vm'
			})
			.state('settings', {
				url: '/settings',
				templateUrl: 'app/account/settings/settings.html',
				controller: 'SettingsCtrl',
				controllerAs: 'vm',
				authenticate: true
			});
	}

	angular.module('tviundApp')
		.config(accountConfig);
})();
