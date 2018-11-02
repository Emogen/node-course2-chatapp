var socket = io();

socket.on('connect',function() {
	console.log('Connected to Server');

});

socket.on('disconnect',function() {
	console.log('Disconnect from server')
});


socket.on('newMessage',function(message){
	console.log('got new message ',message);
});