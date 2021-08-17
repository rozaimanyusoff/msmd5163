var express = require('express');
var app = express();

app.use('/api', require('./api/index'));

var server = app.listen(9090, function () {
	var host = server.address().address;
	var port = server.address().port;
    console.log("Server listening at http://%s:%s", host, port);
 });