/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
var Event = require('../api/event/event.model');
var User = require('../api/user/user.model');
Event.find({}).remove(function () {
	Event.create({
		"attending": [],
		"createDate": "2014-09-24T23:48:14.221Z",
		"groups": [],
		"hosts": [],
		"info": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur lacus quam, vulputate at tempor vel, dictum nec leo. Integer semper luctus fermentum. Duis et velit a velit auctor ultrices non at nulla. Morbi fringilla malesuada enim vitae placerat. Morbi hendrerit felis vitae ex molestie ornare. Aliquam sed dolor in lectus rutrum ultrices at in odio. Vestibulum sit amet turpis non est maximus semper. Etiam elit nisl, blandit sit amet pulvinar ac, vestibulum sit amet tortor. Nam eros augue, aliquam et faucibus ac, pretium vitae felis.\n\nQuisque at purus varius, volutpat nisl vitae, auctor nulla. Mauris ornare lectus at malesuada porttitor. Mauris quis dolor urna. Nam consequat mi at bibendum finibus. In iaculis, nulla et rutrum sagittis, neque lacus tempus diam, vel euismod ipsum massa in orci. Aliquam imperdiet vel magna id mattis. Quisque in elementum odio. Etiam id quam purus. Nunc nunc quam, elementum ut imperdiet et, suscipit et felis. Integer non sem aliquam, ornare felis sodales, aliquam odio. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
		"limit": 1,
		"location": "Dúfnahólum 10",
		"name": "Nýnemaball",
		"queue": [],
		"startEventDate": "2014-09-13T02:36:33.000Z"
	});
});

User.find({}).remove(function () {
	User.create({
			provider: 'local',
			name: 'Test User',
			email: 'test@test.com',
			password: 'test'
		}, {
			provider: 'local',
			role: 'admin',
			name: 'Admin',
			email: 'admin@admin.com',
			password: 'admin'
		}, function () {
			console.log('finished populating users');
		}
	);

});
