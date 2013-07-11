var express = require('express');
var fs = require('fs');

var buffer = fs.readFileSync('index.html');
var string = buffer.toString();

var app = express.createServer(express.logger());
app.use(express.static(__dirname + '/assets'));
app.use(express.static(__dirname + '/assets/css'));
app.use(express.static(__dirname + '/assets/img'));
app.use(express.static(__dirname + '/assets/js'));

app.get('/', function(request, response) {
  response.send(string);
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Node Server  on port " + port);
});