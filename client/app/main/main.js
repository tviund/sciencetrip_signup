(function () {
	'use strict';
	function mainConfig($stateProvider) {
		$stateProvider
			.state('main', {
				url: '/',
				templateUrl: 'app/main/main.html',
				controller: 'MainCtrl'
			});
	}

	angular.module('tviundApp')
		.config(mainConfig);
})();
