var users = require(config.root + '/models/users');
var client = require('twilio')("AC699ee47ad1524d0ae55ad31144028aa7", "2cfbe8bd99a9033f8db336cc38427c42");

module.exports = function (app, io) {
	app.route('/api/call').get(function (req, res) {
		client.makeCall({
			to: '+447955585777', // Any number Twilio can call
			from: '+441992351017', // A number you bought from Twilio and can use for outbound communication
			url: 'http://www.example.com/twiml.php' // A URL that produces an XML document (TwiML) which contains instructions for the call

		}, function (err, responseData) {
			console.log(err);
			//executed when the call has been initiated.
			console.log(responseData); // outputs "+14506667788"

		});
	});
};
