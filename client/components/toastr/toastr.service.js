(function () {
	'use strict';
	/**
	 * Displays a toastr message at the bottom of the screen when appropriate functions are called.
	 * if a message is only defined the toastr will appear with a generic title message.
	 * @returns {{error: Function, success: Function}}
	 */
	function toastrService() {
		return {
			error: function (title, msg) {
				if (arguments.length > 1) {
					return toastr.error(title, msg);
				}
				return toastr.error('Úps!', title);
			},
			success: function (title, msg) {
				if (arguments.length > 1) {
					return toastr.success(title, msg);
				}
				return toastr.success('Tókst!', title);
			}
		}
	}

	angular.module('tviundApp')
		.service('toastr', toastrService);
})();
