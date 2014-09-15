'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var EventSchema = new Schema({
  name: String,
  info: String,
  active: Boolean,
  location: String,
  startRegDate: Date,
  endRegDate: Date,
  startEventDate: Date,
  endEventDate: Date,
  createDate: Date,
  limit: Number,
  hosts: [{type: Schema.Types.ObjectId, ref: 'Org'}],
  groups: [{type: Schema.Types.ObjectId, ref: 'Group'}],
  attending: [{type: Schema.Types.ObjectId, ref: 'User'}],
  queue: [{type: Schema.Types.ObjectId, ref: 'User'}]
});



EventSchema.pre('save', function(next){
	this.createDate = new Date();
	if ( !this.createDate ) {
		this.createDate = now;
	}
	next();
});

module.exports = mongoose.model('Event', EventSchema);
