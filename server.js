//index.js

/*
Housekeeping
*/

var express = require('express');
var app = express()
var http = require('http').Server(app);
var io = require('socket.io')(http);

var pokescan = require('./pokescan.js');

//use static folder for static files
app.use(express.static(__dirname + '/static'));

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

  console.log(socket.id+' - Connected');

  //Marker event
  var Scanner = new pokescan();
  socket.on('marker_placed', function(location){
    Scanner.setCoords(location);
    socket.emit('loading', true); // emit load to client
    Scanner.scan(socket);
    console.log(socket.id+" - Marker placed: latitude: " + location.lat + " longitude: " + location.lng);
    console.log(socket.id+' - Scanning for nearby pokemon at marker.');
  });

  //Disconnect event
  socket.on('disconnect', function(){
    console.log(socket.id+' - Disconnected');
  });
});

/*
Listen
*/

var port = process.env.PORT || 5000; //Heroku port

http.listen(port, function(){
  console.log('listening on port ' + port);
});
