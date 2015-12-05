module.exports = function (app, io) {
	app.route('/example').get(function (req, res) {
		return res.status(418).json({
			message: "I am a teapot"
		});
	});
};
