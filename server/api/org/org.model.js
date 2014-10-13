'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var OrgSchema = new Schema({
	name: String,
	active: {type: Boolean, default: true},
	groups: [{type: Schema.Types.ObjectId, ref: 'Group'}]
});

module.exports = mongoose.model('Org', OrgSchema);
