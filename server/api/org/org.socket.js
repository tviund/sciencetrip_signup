/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Org = require('./org.model');

exports.register = function(socket) {
  Org.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Org.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
};

function onSave(socket, doc, cb) {
  socket.emit('org:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('org:remove', doc);
}
