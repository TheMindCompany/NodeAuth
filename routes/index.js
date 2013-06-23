exports.index = function (req, res) {
	res.render('index');
};

exports.login = function (req, res) {
    res.render('login');
};

exports.logout = function (req, res) {
    res.render('logout');
    console.log('User is leaving.');   
};

exports.getPost = function (req, res) {
    res.render('blog');
    console.log('Visitor is view all blog post');   
};

exports.getPostID = function (req, res) {
    res.render('blogID');
    console.log('Visitor is looking at a single post.');   
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

