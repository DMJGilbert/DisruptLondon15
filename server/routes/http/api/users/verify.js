module.exports = function (app, io) {
	app.route('/api/verify').get(function (req, res) {
		res.redirect('/');
	});
};
