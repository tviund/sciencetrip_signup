var config = require('../../config/environment');
var mailgun = require('mailgun-js')({apiKey: config.MAILGUN_API_KEY, domain: config.MAILGUN_DOMAIN});
var q = require('q');

exports.sendNewUserEmail = function(to, password) {
	console.log('mail sent: ' + to + ' password: ' + password);
	/*
	var deferred = q.defer();
	var data = {
		from: 'Vísindaferðaskráning <donotreply@tviund.org>',
		to: to,
		subject: 'Nýr notandi vísindaferðaskráning',
		text: 'Hér er lykilorðið þitt inná vísindaferðaskráninguna. Lykilorð : ' + password
	};

	mailgun.messages().send(data, function (error, body) {
		if (error) return deferred.reject();
		deferred.resolve();
	});

	return deferred.promise();
	*/
};


