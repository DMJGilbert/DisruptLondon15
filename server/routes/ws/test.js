
module.exports = function (app, io, socket) {
	socket.on('ping', function(data, cb) {
		cb('pong')
	});
};
