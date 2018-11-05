require('./config/config');

const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {generateMessage,generateLocationMessage} = require('./utils/message');

var publicPath = path.join(__dirname,'../public');
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection',(socket)=>{
	console.log('New user connected');

	socket.on('disconnect',()=>{
		console.log('User was disconnected');
	});

	socket.on('createLocationMessage',(coords)=>{
		io.emit('newLocationMessage',generateLocationMessage('Admin',coords.latitude,coords.longitude));
	});

	//socket.emit from Admin text Welcome to chat App
	io.emit('newMessage',generateMessage('Admin','Welcome to the chat app'));
	socket.broadcast.emit('newMessage',generateMessage('Admin','New user joined'));
	//socket.broadcast.emit from text new User joined

	socket.on('createMessage',(message,callback)=>{
		console.log('Message',message);
		io.emit('newMessage',generateMessage(message.from,message.text));
		callback('This is from the server');
	});
});

const port = process.env.PORT;

server.listen(port,()=>{
	console.log(`Started on port ${port}`);
});

module.exports = {app};
