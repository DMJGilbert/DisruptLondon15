var users = require(config.root + '/models/users');
var client = require('twilio')("AC699ee47ad1524d0ae55ad31144028aa7", "2cfbe8bd99a9033f8db336cc38427c42");

module.exports = function (app, io) {
	app.route('/api/register').get(function (req, res) {
		var data = req.query
		console.log('User', data)
		users.findOne({
			username: new RegExp('^' + data.username + '$', 'i'),
			provider: 'local'
		}, function (err, user) {
			if (err) {
				res.send(400, {
					message: 'Failed'
				})
			} else if (!user) {
				data.provider = "local";
				var newUser = new users(data);
				console.log(newUser)
				newUser.save(function (err, _user) {
					console.log(err, _user)
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
								body: 'Please verify your account via: http://ec2-52-31-164-82.eu-west-1.compute.amazonaws.com:3000/api/verfiy/' + _user.activationKey
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
				console.log(err, user)
				res.send(400, {
					message: 'Failed (User already exists)'
				})
			}
		});
	});
};
