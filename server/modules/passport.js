var passport = require('passport');
var path = require('path');
var users = require('../models/users');
// Serialize sessions
passport.serializeUser(function (user, done) {
	done(null, user.id);
});

// Deserialize sessions
passport.deserializeUser(function (id, done) {
	users.findById(id, function (err, user) {
		done(err, user);
	});
});
// Initialize strategies
config.getGlobbedFiles('./server/modules/strategies/**/*.js').forEach(function (strategy) {
	require(path.resolve(strategy));
});
