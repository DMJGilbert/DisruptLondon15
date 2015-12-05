var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var users = require('../../models/users');

passport.use(new LocalStrategy({
		usernameField: 'username',
		passwordField: 'password'
	},
	function (username, password, done) {
		users.findOne({
			username: {
				$regex: new RegExp('^' + username + '$', "i")
			},
			provider: "local"
		}, function (err, user) {
			if (err) {
				return done(err, null, {
					error: 'Invalid username/password'
				});
			}
			if (!user) {
				return done(null, false, {
					error: 'Invalid username/password'
				});
			}
			if (!user.comparePassword(password)) {
				return done(null, false, {
					error: 'Invalid username/password'
				});
			}
			return done(null, user);
		});

	}
));
