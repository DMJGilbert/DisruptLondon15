module.exports = function (app, io, socket) {
	socket.on('message', function (data, cb) {
		io.emit('message', data)
	});
};
