var socket = io();

socket.on('connect',function() {
	console.log('Connected to Server');

});

socket.on('disconnect',function() {
	console.log('Disconnect from server')
});


socket.on('newMessage',function(message){
	var formattedTime = moment(message.createdAt).format('h:mm a');
	var template = $('#message-template').html();
	var html = Mustache.render(template,{
		text: message.text,
		from: message.from,
		createdAt: moment(message.createdAt).format('h:mm a')
	});

	$('#messages').append(html);


});

socket.on('newLocationMessage',function(message){
	var formattedTime = moment(message.createdAt).format('h:mm a');
	var template = $('#location-message-template').html();
	var html = Mustache.render(template,{
		url: message.url,
		from: message.from,
		createdAt: moment(message.createdAt).format('h:mm a')
	});

	$('#messages').append(html);
});

var messageTextBox = $('[name=message]')

$('#message-form').on('submit',function(e){
	e.preventDefault();

	socket.emit('createMessage',{
		from: 'User',
		text: messageTextBox.val()
	}, function(data){
		messageTextBox.val('');
	});
});

var locationButton = $('#send-location');

locationButton.on('click',function(e){
	if(!navigator.geolocation){
		return alert('Geolocation not supported by your browser.');
	}
	locationButton.attr('disabled','disabled').text('Sending Location....');
	navigator.geolocation.getCurrentPosition(function(position){
		socket.emit('createLocationMessage',{
			latitude: position.coords.latitude,
			longitude: position.coords.longitude
		});
		locationButton.removeAttr('disabled').text('Send Location');
	},function(){
		alert('Unable to fetch location');
		locationButton.removeAttr('disabled').text('Send Location');
	});
});
