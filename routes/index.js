exports.index = function (req, res) {
	res.render('index');
};

exports.register = function (req, res) {
		res.render('register');
};

exports.login = function (req, res) {
	if ( !req.session.user )
		res.render('login');
	else
		res.redirect('/');
};

exports.logout = function (req, res) {
    res.render('logout');
    console.log('User is leaving.');   
};

exports.startSurvey = function (req, res) {
    res.render('start');
    console.log('Starting a survey');   
};

exports.createSurvey = function (req, res) {
    res.render('create');
    console.log('Writing survey to db.');   
};

exports.addPost = function (req, res) {
    res.render('post');
    console.log('Visitor is going to add post!');   
};

exports.editPost = function (req, res) {
    res.render('edit');
    console.log('Visitor wants to edit post!');   
};

exports.deletePost = function (req, res) {
    res.render('delete');
    console.log('Visitor wants to delete post!');   
};

