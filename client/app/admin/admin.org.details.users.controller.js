(function () {
	'use strict';
	function adminOrgDetailsUsersCtrl($modal, $http, $stateParams) {
		var self = this;
		var id = $stateParams.id;
		$http.get('/api/org/' + id).success(function (org) {
			self.org = org;
		});
		// Get users associated with this organization
		$http.get('/api/org/' + id + '/user').success(function (users) {
			console.log(users);
			self.users = users;
		});

		this.importUsers = function () {
			$modal.open({
				templateUrl: 'importUserModal.html',
				controller: 'userImportModalCtrl as modal',
				size: 'lg',
				resolve: {
					orgId: function () {
						return id
					},
					groups: function () {
						return self.org.groups;
					}
				}
			});
		};

	}

	function userImportModalCtrl($scope, $modalInstance, $http, orgId, groups) {
		var self = this;
		this.groups = groups;
		this.loading = false;

		this.cancel = function () {
			$modalInstance.dismiss('cancel');
		};

		this.sendForPreview = function (file) {
			$scope.$apply(function () {
				self.loading = true;
			});
			// This is a bit of a hack for angular file uploads since its retarded.
			var formData = new FormData();

			formData.append('file', file);

			$http({
				method: 'POST',
				url: '/api/org/' + orgId + '/user/preview',
				headers: {
					'Content-Type': undefined
				},
				transformRequest: angular.identity,
				data: formData
			}).success(function (res) {
				self.preview = res;
				self.missing = _newGroups(res.groups);
				self.loading = false;
			})
		};

		this.ok = function () {
			self.saving = true;
			$http.post('/api/org/' + orgId + '/group', self.missing)
				.then(function () {
					return $http.post('/api/org/' + orgId + '/user', self.preview.persons);
				})
				.then(function(){
					self.saving = false;
					$modalInstance.close();
				});

		};


		function _newGroups(newGroupList) {
			var currentGroupsList = _.flatten(self.groups, 'name');
			return _.difference(newGroupList, currentGroupsList);
		}
	}

	function fileDirective() {
		return {
			restrict: 'E',
			scope: {
				model: '=',
				onFile: '&'
			},
			template: '<input type="file"/>',
			link: function (scope, $element) {
				$element.bind('change', function (e) {
					//console.log(e.target.files[0])
					scope.onFile({file: e.target.files[0]});
				});

				scope.$on('$destroy', function () {
					$element.unbind()
				});
			}
		}
	}

	angular.module('tviundApp')
		.controller('AdminOrgDetailsUsersCtrl', adminOrgDetailsUsersCtrl)
		.controller('userImportModalCtrl', userImportModalCtrl)
		.directive('file', fileDirective);
})();
