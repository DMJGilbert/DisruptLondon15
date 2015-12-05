var users = require(config.root + '/models/users');
var client = require('twilio')("AC699ee47ad1524d0ae55ad31144028aa7", "2cfbe8bd99a9033f8db336cc38427c42");

module.exports = function (app, io) {
	app.route('/api/register').get(function (req, res) {
		var data = req.query
		users.findOne({
			$or: [{
				username: new RegExp('^' + data.username + '$', 'i'),
			}, {
				phoneNumber: data.phoneNumber
			}],
			provider: 'local'
		}, function (err, user) {
			if (err) {
				res.send(400, {
					message: 'Failed'
				})
			} else if (!user) {
				data.provider = "local";
				var newUser = new users(data);
				newUser.save(function (err, _user) {
					console.log(err)
					if (_user) {
						_user.salt = undefined;
						_user.password = undefined;
						delete _user.salt;
						delete _user.password;
						if (err) {
							res.send(400, {
								message: 'Failed (Server error)'
							})
						} else {
							client.messages.create({
								to: '+447955585777',
								from: '+441992351017',
								body: 'Please verify your account via: http://10.11.21.203:3000/api/verfiy/' + _user.activationKey
							}, function (err, responseData) {
								console.log(err, responseData)
							});
							res.send(200, {
								message: 'Success'
							})
						}
					} else {
						res.send(400, {
							message: 'Failed (Cant save user)'
						})
					}
				});
			} else {
				res.send(400, {
					message: 'Failed (User already exists)'
				})
			}
		});
	});
};
