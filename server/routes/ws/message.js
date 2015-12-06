module.exports = function (app, io, socket) {
	socket.on('message', function (data, cb) {
		io.emit('message', data)
	});
	socket.on('help', function (data, cb) {
		io.emit('help', data)
	});
};
