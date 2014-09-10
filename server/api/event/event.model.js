'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var EventSchema = new Schema({
  name: String,
  info: String,
  active: Boolean,
  startRegDate: Date,
  endRegDate: Date,
  startEventDate: Date,
  endEventDate: Date,
  createDate: Date,
  hosts: [{type: Schema.Types.ObjectId, ref: 'Org'}],
  groups: [{type: Schema.Types.ObjectId, ref: 'Group'}]
});

module.exports = mongoose.model('Event', EventSchema);
