window.onload = function() {
	var status = document.getElementById('status');
	

	
	socket.on('loginFail', function(msg) {
		status.innerHTML = msg;
	});
};