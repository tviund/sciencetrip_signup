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



EventSchema.pre('save', function(next){
	now = new Date();
	this.createDate = now;
	if ( !this.createDate ) {
		this.createDate = now;
	}
	next();
});

module.exports = mongoose.model('Event', EventSchema);
