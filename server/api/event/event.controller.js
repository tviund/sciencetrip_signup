/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /events              ->  index
 * POST    /events              ->  create
 * GET     /events/:id          ->  show
 * PUT     /events/:id          ->  update
 * DELETE  /events/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Event = require('./event.model');
var Org = require('../org/org.model');
var q = require('q');
var mongoose = require('mongoose');

// Get list of events
exports.index = function (req, res) {
  Event.find(function (err, events) {
    if (err) {
      return handleError(res, err);
    }
    return res.json(200, events);
  });
};

// Get a single event
exports.show = function (req, res) {
  Event.findById(req.params.id).populate('attending').exec(function (err, event) {
    if (err) {
      return handleError(res, err);
    }
    if (!event) {
      return res.send(404);
    }
    return res.json(event);
  });
};

// Creates a new event in the DB.
exports.create = function (req, res) {
  Event.create(req.body, function (err, event) {
    if (err) {
      return handleError(res, err);
    }
    return res.json(201, event);
  });
};

// Updates an existing event in the DB.
exports.update = function (req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Event.findById(req.params.id, function (err, event) {
    if (err) {
      return handleError(res, err);
    }
    if (!event) {
      return res.send(404);
    }
    var updated = _.merge(event, req.body);
    updated.save(function (err) {
      if (err) {
        return handleError(res, err);
      }
      return res.json(200, event);
    });
  });
};

// Deletes a event from the DB.
exports.destroy = function (req, res) {
  Event.findById(req.params.id, function (err, event) {
    if (err) {
      return handleError(res, err);
    }
    if (!event) {
      return res.send(404);
    }
    event.remove(function (err) {
      if (err) {
        return handleError(res, err);
      }
      return res.send(204);
    });
  });
};


exports.createAttendee = function (req, res) {
  Event.findById(req.params.id).exec(function (err, event) {
    if (err) {
      return handleError(res, err);
    }
    if (!event) {
      return res.send(404);
    }

    if (indexOfInList(event.attending, req.user._id) !== -1 || indexOfInList(event.queue, req.user._id) !== -1) {
      return res.send(409);
    }

    if (event.limit >  event.attending.length) {
      event.attending.push({user: mongoose.Types.ObjectId(req.user.id), name: req.user.name, timestamp: new Date()});
    }
    else {
      event.queue.push({user: mongoose.Types.ObjectId(req.user.id), name: req.user.name, timestamp: new Date()});
    }

    event.save(function (err) {
      if (err) return handleError(res, err);
      return res.json(event)
    })
  });
};


exports.removeAttendee = function (req, res) {
  Event.findById(req.params.id).exec(function (err, event) {
    if (err) {
      return handleError(res, err);
    }
    if (!event) {
      return res.send(404);
    }
    var index;

    // Remove from queue
    if ((index = indexOfInList(event.queue, req.user.id)) !== -1) {
      event.queue.splice(index, 1);
    }
    // Remove from attending list
    else if ((index = indexOfInList(event.attending, req.user.id)) !== -1) {
      event.attending.splice(index, 1);
      if (event.queue.length > 0) {
        // If we have a queue we take the first one from the queue and add him to the attending list
        event.attending.push(event.queue.shift());
      }
    }

    event.save(function (err, event) {
      if (err) return handleError(res, err);
      return res.json(event);
    })

  });
};
/**
 * Helper function to which returns the index of a member in list and false if not found
 * @param list
 * @param userId
 * @returns {*}
 */
function indexOfInList(list, userId) {
  userId = userId.toString();
  list = list.toObject();
  var res = _.findIndex(list, function (listObj) {
    return listObj.user.toString() === userId
  });
  console.log(res);
  return res;
}

function handleError(res, err) {
  return res.send(500, err);
}
