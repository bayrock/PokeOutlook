//index.js

//app and server logic
var app = require('express')();
var express = require('express');
var http = require('http').Server(app);
var io = require('socket.io')(http);

var pokescan = require('./pokescan.js');

app.use(express.static(__dirname + '/assets'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

//connect
io.on('connection', function(socket){
  console.log('a user connected');

  //scanning test
  var Scanner = new pokescan();
  socket.on('marker_placed', function(location){
    Scanner.setCoords(location);
    Scanner.scan(socket);
    console.log("Scanning for nearby pokemon at marker.");
  });

  //disconnect
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

http.listen(3000, function(){
  console.log('listening on port 3000');
});
