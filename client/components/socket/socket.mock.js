(function () {
	'use strict';
	function socket() {
		return {
			socket: {
				connect: function () {
				},
				on: function () {
				},
				emit: function () {
				},
				receive: function () {
				}
			},

			syncUpdates: function () {
			},
			unsyncUpdates: function () {
			}
		};
	}

	angular.module('socketMock', [])
		.factory('socket', socket)
})();
