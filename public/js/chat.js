var socket = io();

function scrollToBottom(){
	//selectors
	var messages = $('#messages');
	var newMessage = messages.children('li:last');
	//heights
	var clientHeight = messages.prop('clientHeight');
	var scrollTop = messages.prop('scrollTop');
	var scrollHeight = messages.prop('scrollHeight');

	var newMessageHeight = newMessage.innerHeight();
	var lastMessageHeight = newMessage.prev().innerHeight();

	if(clientHeight + scrollTop +newMessageHeight + lastMessageHeight>= scrollHeight){
		messages.scrollTop(scrollHeight);
	}
}

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
	scrollToBottom();

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
	scrollToBottom();
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
