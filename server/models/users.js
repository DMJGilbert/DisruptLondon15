var crypto = require('crypto');
var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true
	},
	provider: String,
	admin: Boolean,
	password: String,
	salt: Buffer,
	createdAt: Date,
	updatedAt: Date
});

userSchema.pre('save', function (next) {
	var user = this;
	var now = new Date();
	user.updatedAt = now;
	if (!user.createdAt) {
		user.createdAt = now;
		user.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
	}
	if (!user.isModified('password') || user.provider != 'local') {
		return next();
	} else {
		if (user.provider === 'local') {
			if (user.password && user.password.length >= 5) {
				user.password = crypto.pbkdf2Sync(user.password, user.salt, 10000, 64).toString('base64');
				next();
			}
		} else {
			next();
		}
	}
});

userSchema.methods.comparePassword = function (candidatePassword) {
	return crypto.pbkdf2Sync(candidatePassword, this.salt, 10000, 64).toString('base64') == this.password;
}

module.exports = mongoose.model('User', userSchema);
