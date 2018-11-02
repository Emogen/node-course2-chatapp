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

	socket.on('createMessage',(message)=>{
		console.log('Message',message);
	});

	socket.emit('newMessage',{
		from: 'Mike',
		text: 'See You then',
		createdAt: 123445
	});
});

const port = process.env.PORT;

server.listen(port,()=>{
	console.log(`Started on port ${port}`);
});

module.exports = {app};


