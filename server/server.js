require('./config/config');

const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

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

	//socket.emit from Admin text Welcome to chat App
	io.emit('greetings',{
		from: 'Admin',
		text: 'Welcome to the chat App',
		createdAt: new Date().getTime()
	});
	socket.broadcast.emit('greetings',{
		from: 'Admin',
		text: 'New user has joined the party',
		createdAt: new Date().getTime()
	});
	//socket.broadcast.emit from text new User joined

	socket.on('createMessage',(message)=>{
		console.log('Message',message);
		io.emit('newMessage',{
			from: message.from,
			text: message.text,
			createdAt: new Date().getTime()
		});

		// socket.broadcast.emit('newMessage',{
		// 	from: message.from,
		// 	text:message.text,
		// 	createdAt: new Date().getTime()
		// });
	});
});

const port = process.env.PORT;

server.listen(port,()=>{
	console.log(`Started on port ${port}`);
});

module.exports = {app};


