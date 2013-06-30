var address = 'localhost';
var socket = io.connect('http://' + address + ':3000');

socket.emit('hello');

socket.on('error', function(err) {
	console.error('Not Connected', err);
});

socket.on('connect', function() {
	
});
