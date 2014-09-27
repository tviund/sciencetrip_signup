'use strict';

var _ = require('lodash');
var Org = require('./org.model');
var mongoose = require('mongoose');

// Get list of orgs
exports.index = function (req, res) {
	Org.find(function (err, orgs) {
		if (err) {
			return handleError(res, err);
		}
		return res.json(200, orgs);
	});
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

function handleError(res, err) {
	return res.send(500, err);
}
