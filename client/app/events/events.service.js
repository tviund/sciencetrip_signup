(function () {
	'use strict';
	function eventService($http, Event) {
		return {
			/**
			 * fetches all available events
			 * @returns {Promise}
			 */
			all: function () {
				return $http.get('/api/events').then(function (res) {
					return _.map(res.data, function (eventObj) {
						return new Event(eventObj);
					})
				});
			},
			/**
			 * Fetches an event by id
			 * @param id
			 * @returns {Promise}
			 */
			byId: function (id) {
				return $http.get('/api/events/' + id).then(function (res) {
					return new Event(res.data);
				});
			}
		}
	}

	function eventFactory($http, Auth) {
		var Event = function (obj) {
			_.extend(this, obj);
			determineRegistrationStatus.call(this);
		};


		function determineRegistrationStatus() {
			console.log('here');
			if (_.some(this.attending, {user: Auth.getCurrentUser()._id})) {
				this.isAttending = true;
				return this.registered = true;
			}
			else if (_.some(this.queue, {user: Auth.getCurrentUser()._id})) {
				this.isInQueue = true;
				return this.registered = true;
			}
			this.isInQueue = false;
			this.isAttending = false;
			this.registered = false;
			return false;
		}

		/**
		 * Registers the current user to the event and returns an updated event.
		 * @returns {Promise}
		 */
		Event.prototype.register = function () {
			var self = this;
			return $http.post('/api/events/' + this._id + '/attendee')
				.then(function (res) {
					_.extend(self, res.data);
					determineRegistrationStatus.call(self);
					return self;
				});
		};
		/**
		 * DeRegisters current user from event and returns an updated event.
		 * @returns {Promise}
		 */
		Event.prototype.deRegister = function () {
			var self = this;
			return $http.delete('/api/events/' + this._id + '/attendee')
				.then(function (res) {
					_.extend(self, res.data);
					determineRegistrationStatus.call(self);
					return self;
				});
		};
		/**
		 * Returns if the user is registered or not.
		 * @returns {boolean}
		 */
		Event.prototype.isRegistered = function () {
			return this.registered || this.isInQueue;
		};

		/**
		 * Returns if the user can register or not
		 * @returns {boolean}
		 */
		Event.prototype.canRegister = function () {
			self.countdownInSec = moment(event.startEventDate).diff(moment(), 'seconds');
			return self.countdownInSec < 0;
		};

		return Event;
	}

	angular.module('tviundApp')
		.factory('events', eventService)
		.factory('Event', eventFactory);
})();
