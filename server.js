// All rights reserved 2013 | Brandon Clark and The Mind Company

var address = 'localhost';

// Configure server dependecies.
var express = require('express'),
    app = express(),
    http = require('http').createServer(app),
    io = require('socket.io').listen(http),
    routes = require('./routes'),
    path = require('path'),
    util = require('util');
http.listen(3000, address);
console.log('Litening to: ');

var connect = require('connect'),
	cookie = require('cookie');
var LoggIn = require('./lib/login.js');

var store = new express.session.MemoryStore();
// Configure express.
app.configure(function() {
	
	// Set view directory.
	app.set('views', __dirname + '/views');
	
	// Set template engine. (Optional)
	app.set('view engine', 'jade');
	
	// Set session features.
	app.use(express.cookieParser('thisIsASecret'));
	app.use(express.session({ store: store, secret: 'thisIsASecret', key: 'something'}));
	
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	
	// Set express to use router. (Must be placed after session control)
	app.use(app.router);
	
	// Static public path.
	app.use(express.static(path.join(__dirname, 'public')));
});

// Define express routes.
app.get('/', LoggIn.requireLoggIn, routes.index);
app.get('/register', routes.register);
app.post('/register', function(req, res) {
	LoggIn.createAccount (req.body.user,req.body.password,req.body.first,req.body.middle,
						  req.body.last,req.body.birth,req.body.gender,function (user, err){
		if (user) {
			req.session.user = user;
			res.redirect('/');
			console.log('Logging in.');
		} else {
			res.render('register');
		}
	});
});
app.get('/login', routes.login);
app.post('/login', function (req, res){
	LoggIn.authenticate(req.body.user, req.body.password, function(user, msg) {
		if (user) {
			req.session.user = user;
			res.redirect('/');
		} else {
			res.render('login', {msg: 'You have entered a invalid user / password!'});
			console.log('Login Failed! : ' + msg);
		}
	});
});
app.get('/logout', LoggIn.requireLoggIn, routes.logout);
app.get('/survey', LoggIn.requireLoggIn, routes.startSurvey);
app.post('/survey', LoggIn.requireLoggIn, routes.createSurvey);
app.get('/survey/:id', LoggIn.requireLoggIn, routes.getPostID);
app.put('/survey/:id', LoggIn.requireLoggIn, routes.editPost);
app.delete('/survey/:id', LoggIn.requireLoggIn, routes.deletePost);


// Configure socket.io. 
io.configure(function() {
	
	// Set preferred transports
	io.set('transports', [ 'websocket', 'xhr-polling' ]); // TODO Is another method needed for non browser applications?
	
	// Check to see if user is authorized to create a server session.
	io.set('authorization', function(handshake, cb) {
		
		// TODO Check to see if user is authorized.
		// If user is authenticated assign socket send (cb)	
		// to true and assign user data to handshake.
		// Else do not authorize socket and 
		// assign (cb) false.  
		
		// Check to see if there are any cookie header from client.
		if (handshake.headers.cookie){ // Browser based session management.

			// Thanks to blog.bigpanda.io and its writer Shahar Kedar the following
			// allows users to have a persistent connection to socket.	
			// It parses the cookie and decrypts it. This is assigned to the header
			// to keep the identity of the user active. User can close and re-open browser 
			// or refresh page, have multiple windows open without loosing track of 
			// the assigned session connection.
			handshake.cookie = cookie.parse(handshake.headers.cookie);
			handshake.sessionID = connect.utils.parseSignedCookie(handshake.cookie['something'], 'thisIsASecret');
			
			// Make sure the session isn't fake.
			if (handshake.cookie['something'] === handshake.sessionID){
				return cb('Your a cookie faker.', false);
			}
		} else if (true === false){ // Application based session management.
			
			//TODO Find a way to approve application connections without browser support.
			
		} else { // 

			return cb('Unable to establish session.', false);
		}
		
		// If we made it this far, approve connection.
		cb(null, true);
	});
});

// When socket is authorized allow a connection to it
// and continue desired rout.
io.sockets.on('connection', function(socket){
	
	// Lets see who is connecting.
	console.log('Connected: ' + socket.handshake.address.address + ':' + socket.handshake.address.port);	
});	