var users = require(config.root + '/models/users');

module.exports = function (app, io) {
	app.route('/api/login').post(function (req, res) {
		if (req.body.username && req.body.password) {
			users.findOne({
				username: {
					$regex: new RegExp('^' + req.body.username + '$', "i")
				},
				provider: "local"
			}).exec(function (err, user) {
				if (err || !user || !user.comparePassword(req.body.password)) {
					res.status(400).send('Invalid username/password');
				} else {
					var _user = user.toObject()
					delete _user.salt
					delete _user.password
					res.jsonp({
						user: _user
					});
				}
			});
		} else {
			return res.status(400).send('Invalid username/password');
		}
	});
};
