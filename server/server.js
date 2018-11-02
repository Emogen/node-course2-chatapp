require('./config/config');

const path = require('path');
const express = require('express');

var publicPath = path.join(__dirname,'../public');

var app = express();

app.use(express.static(publicPath));

const port = process.env.PORT;

app.listen(port,()=>{
	console.log(`Started on port ${port}`);
})

module.exports = {app};


