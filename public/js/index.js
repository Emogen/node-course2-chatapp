var socket = io();

socket.on('connect',function() {
	console.log('Connected to Server');

	socket.emit('createMessage',{
		to: 'Andrew',
		text: 'Yup, thats work for me'
	});

});

socket.on('disconnect',function() {
	console.log('Disconnect from server')
});


socket.on('newMessage',function(message){
	console.log('got new message ',message);
});