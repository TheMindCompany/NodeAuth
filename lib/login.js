var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UsersSchema =  new Schema({
    user:       {type: String, lowercase: true, required: true, sparse: true, unique:true},
    password:   {type: String, required: true}, 
    first_name: String,
    middle_name:String,
    last_name:  String,
    birth_date: Date,
    gender_type:String,
    user_type:  {type: String, default:'User'},
    join_date:  {type: Date, default: Date.now}
});

var UserModel = mongoose.model('users', UsersSchema);

function isUser(login, callback){
	mongoose.model('users', UsersSchema);
    mongoose.connect('mongodb://localhost/identity');
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error: '));
    db.once('open', function cb () {    
        UserModel.findOne({'user': login}, callback);
    });
};

module.exports.authenticate = function (login, password, cb) {	
	isUser(login, function(err, user) {
		mongoose.disconnect();
		if (err) {
	        cb(null, err);
	        return;
	    }
	    if (!user || (user.user != login)) {
	        cb(null, 'Invalid User'); 
	        return; 
	    }   
	    if (user.password === password) {
			cb(user, null);
		    return;
		} 
	    cb(null, 'Invalid Password'); 
	        return;
    });
};

module.exports.createAccount = function (login, password, first, middle, last, birth, gender, cb) {	
	mongoose.model('users', UsersSchema);
    mongoose.connect('mongodb://localhost/identity');
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error: '));
	var User = new UserModel({user: login, password: password, first_name: first, middle_name: middle, 
							  last_name: last, birth_date: birth, gender_type: gender});	
	User.save(function(err, user) {
		if (err) {
			console.log(err);
	    	cb(null, err);
		} else {
			console.log(user);
			cb(user, null);
		}
		mongoose.disconnect();
	});
};

module.exports.requireLoggIn = function (req, res, next) {
	if (req.session.user) {
		next();
	} else { 
		res.render('login');
	}
};