var path = require('path'),
	rootPath = path.normalize(__dirname + '/../..');

module.exports = {
	root: rootPath,
	port: process.env.PORT || 3000,
	mongodb: process.env.MONGODB || 'mongodb://localhost:27017/disrupt',
	secret: ''
};
