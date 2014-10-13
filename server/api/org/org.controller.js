'use strict';

var _ = require('lodash');
var Org = require('./org.model');
var User = require('../user/user.model');
var Group = require('../group/group.model');
var mongoose = require('mongoose');
var xls = require('xlsjs');
var randomString = require("randomstring");
var mailer = require('../../components/mail/mail');
var q = require('q');

// Get list of orgs
exports.index = function (req, res) {
	Org.find(function (err, orgs) {
		if (err) {
			return handleError(res, err);
		}
		return res.json(200, orgs);
	});
};

exports.getOrgUsers = function (req, res) {
	User.find({orgs: req.params.id})
		.select('-hashedPassword -salt')
		.populate('groups')
		.exec(function (err, users) {
			if (err) return handleError(res, err);
			res.json(users);
		})
};

// Get a single org
exports.show = function (req, res) {
	Org.findById(req.params.id).populate('groups').exec(function (err, org) {
		if (err) {
			return handleError(res, err);
		}
		if (!org) {
			return res.send(404);
		}
		return res.json(org);
	});
};

// Creates a new org in the DB.
exports.create = function (req, res) {
	Org.create(req.body, function (err, org) {
		if (err) {
			return handleError(res, err);
		}
		return res.json(201, org);
	});
};


// Creates groups for specific org note
exports.createGroupsInBulk = function (req, res) {

	var groupList = req.body.map(function (name) {
		return new Group({
			name: name
		})
	});

	Org.findById(req.params.id, function (err, org) {
		if (err) {
			return handleError(res, err);
		}
		// Create groups
		Group.create(groupList, function (err) {
			if (err) return handleError(res, err);
			for (var i = 1; i < arguments.length; ++i) {
				// Add them to the existing list
				org.groups.push(arguments[i]._id);
			}
			// Save the org with the new groups
			org.save(function (err) {
				if (err) return handleError(res, err);
				return res.json(org);
			});
		});
	});

};

exports.createUserInBulk = function (req, res) {

	Org.findById(req.params.id)
		.populate('groups')
		.exec(function (err, org) {
			if (err) return handleError(res, err);
			_createNewUser(req.body, org)
				.then(function () {
					//TODO: Should probably send a list of created users
					return res.send(200);
				}, function (err) {
					return handleError(res, err);
				});
		});

};

// Updates an existing org in the DB.
exports.update = function (req, res) {
	if (req.body._id) {
		delete req.body._id;
	}
	Org.findById(req.params.id, function (err, org) {
		if (err) {
			return handleError(res, err);
		}
		if (!org) {
			return res.send(404);
		}
		var updated = _.merge(org, req.body);
		updated.save(function (err) {
			if (err) {
				return handleError(res, err);
			}
			return res.json(200, org);
		});
	});
};

// Deletes a org from the DB.
exports.destroy = function (req, res) {
	Org.findById(req.params.id, function (err, org) {
		if (err) {
			return handleError(res, err);
		}
		if (!org) {
			return res.send(404);
		}
		org.remove(function (err) {
			if (err) {
				return handleError(res, err);
			}
			return res.send(204);
		});
	});
};

exports.addGroup = function (req, res) {
	Org.findById(req.params.id, function (err, org) {
		if (err) {
			return handleError(res, err);
		}
		if (!org) {
			return res.send(404);
		}
		if (!org.groups) {
			org.groups = [];
		}
		org.groups.push(mongoose.Types.ObjectId(req.params.groupId));
		org.save(function (err) {
			if (err) {
				return handleError(res, err);
			}
			return res.json(200, org);
		});
	});
};

/**
 * Create users and send mails from a comma delimited file
 * @param req
 * @param res
 * @param next
 */
exports.parseBulkImportFile = function (req, res, next) {
	var persons = [];
	var groups = [];
	var workbook = xls.readFile(req.files.file.path);
	var sheet = workbook.Sheets[workbook.SheetNames[0]];
	var range = sheet['!range'].e.r;
	// Get each user information from an excel row
	for (var i = 2; i < range; ++i) {
		persons.push({name: sheet['A' + i].v, email: sheet['B' + i].v, group: sheet['C' + i].v.toLowerCase()});
		if (!_.contains(groups, persons[persons.length - 1].group)) {
			groups.push(persons[persons.length - 1].group)
		}
	}

	res.json({
		groups: groups,
		persons: persons
	});
};


// TODO: update existing users
function _createNewUser(persons, org) {
	// This call will return a promise
	var deferred = q.defer();
	var newPersons = [];
	var updatePersons = [];
	// Find if there are any existing persons in the list
	User.find({
		email: {$in: _.flatten(persons, 'email')}
	}, function (err, foundPersons) {
		if (err) {
			deferred.reject(err);
		}
		// Go through all the persons in the creation request and check if they exist if not create them
		_.forEach(persons, function (person) {
			var foundPerson = false;
			if (!(foundPerson = _.find(foundPersons, {email: person.email}))) {
				// Create a random 7 letter password
				var tempPassword = randomString.generate(7);
				// Find group of user
				var group = _.find(org.groups, {name: person.group});
				// Create a user object that will finally be inserted into the database
				// Note: you might be wondering why this call is taking so long
				// that is because of PBKDF2 key derivation process and is normal.

				newPersons.push(new User({
					provider: 'local',
					role: 'user',
					email: person.email,
					name: person.name,
					orgs: [org._id],
					groups: [group._id],
					password: tempPassword
				}));
				mailer.sendNewUserEmail(person.email, tempPassword);
			}
			else {
				// If user exists we need to check if he is in the same organization if not we add a new org to the user.
				if (!_.find(foundPerson.orgs, org._id)) {
					foundPerson.orgs.push(org._id);
				}
				if (!_.find(foundPerson.groups, group._id)) {
					foundPerson.groups.push(org._id);
				}
				updatePersons.push(foundPerson);
			}
		});
		var updates = [];
		_.forEach(updatePersons, function (update) {
			var deferred = q.defer();
			updates.push(deferred.promise);
			update.save(function (err) {
				if (err) {
					return deferred.reject(err);
				}
				return deferred.resolve();
			})
		});
		q.all(updates).then(function () {
			// Bulk creation of users
			User.create(newPersons, function (err) {
				if (err) {
					deferred.reject(err);
				}
				// Return the newly created users
				// TODO: improve return
				deferred.resolve(_.rest(arguments, 1));
			})
		}, function(){
			deferred.reject();
		});
	});
	return deferred.promise;
}

function handleError(res, err) {
	return res.send(500, err);
}
