//index.js

/*
Housekeeping
*/

var express = require('express');
var app = express()
var http = require('http').Server(app);
var io = require('socket.io')(http);

var pokescan = require('./pokescan.js');

//use assets folder for static files
app.use(express.static(__dirname + '/assets'));

//get index.html as homepage
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

/*
Events
*/

var session = 0;

//Connect event
io.on('connection', function(socket){
  session = session + 1
  socket.id = '[Session #'+session+']';

  console.log(socket.id+' - connected');

  //Marker event
  var Scanner = new pokescan();
  socket.on('marker_placed', function(location){
    Scanner.setCoords(location);
    Scanner.scan(socket);
    console.log('Scanning for nearby pokemon at marker.');
  });

  //Disconnect event
  socket.on('disconnect', function(){
    console.log(socket.id+' - disconnected');
  });
});

/*
Listen
*/

var port = 3000;

http.listen(port, function(){
  console.log('listening on port ' + port);
});
