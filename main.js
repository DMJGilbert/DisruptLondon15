var glob = require('glob');

var environmentFiles = glob(__dirname + '/config/env/' + process.env.NODE_ENV + '.js', {
	mark: true,
	sync: true
});

global.config = require(__dirname + '/server/config/config.js');

require(__dirname + '/server/modules/mongodb');

var app = require('./server/modules/express');
require('./server/modules/passport');
