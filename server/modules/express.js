var express = require('express');
var bodyParser = require('body-parser');
var compress = require('compression');
var methodOverride = require('method-override');
var helmet = require('helmet');
var flash = require('connect-flash');
var path = require('path');

var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

io.set('transports', ['websocket', 'xhr-polling', 'jsonp-polling', 'polling', 'flashsocket', 'htmlfile']);

//app.use(express.compress());

app.use(compress({
	filter: function (req, res) {
		return (/json|text|javascript|css/).test(res.getHeader('Content-Type'));
	},
	level: 9
}));

app.use(helmet.hsts({
	maxAge: 31536000000,
	includeSubdomains: true,
	force: true
}));

app.set('showStackError', true);

app.use(express.static('app'));

// Request body parsing middleware should be above methodOverride
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());
app.use(methodOverride());

// Enable jsonp
app.enable('jsonp callback');

// connect flash for flash messages
app.use(flash());

// Use helmet to secure Express headers
app.use(helmet.xframe());
app.use(helmet.xssFilter());
app.use(helmet.nosniff());
app.use(helmet.ienoopen());
app.disable('x-powered-by');

app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});

config.getGlobbedFiles('./server/routes/http/**/*.js').forEach(function (routePath) {
	require(path.resolve(routePath))(app, io);
});

io.on('connect', function (socket) {
	config.getGlobbedFiles('./server/routes/ws/**/*.js').forEach(function (routePath) {
		try {
			require(path.resolve(routePath))(app, io, socket);
		} catch (e) {}
	});
})

app.all('/*', function (req, res, next) {
	res.sendFile('index.html', {
		root: __dirname + '/../../app'
	});
});

server.listen(config.port);

module.exports = server;
