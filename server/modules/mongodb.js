var mongoose = require('mongoose');

mongoose.connect(config.mongodb);
mongoose.connection.on('error', function () {
	console.error('MongoDB Connection Error. Please make sure that MongoDB is running.');
});

module.exports = mongoose;
