var users = {
		'brandon': { login: 'brandon', password: 'enter', role: 'admin' },
		'sonia': { login: 'sonia', password: 'enter2', role: 'user' }
};

module.exports.authenticate = function (login, password, cb) {
	var user = users[login],
		msg;
	
	if (!user) {
		msg = 'Invalid User';
		cb(null, msg);	
		return;
	}	
	if (user.password != password) {
		msg = 'Invalid Password';
		cb(null, msg);
		return;
	}
	cb(user, null);	
};

module.exports.requireLoggIn = function (req, res, next) {
	if (req.session.user) {
		next();
	} else {
		res.render('login');
	}
};