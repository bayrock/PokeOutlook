//pokescan.js

var pokegoScan = require('pokego-scanner');

//default to Central Park, NYC
var coords = {
    latitude: 40.785091,
    longitude: -73.968285
};

var Scanner = function () {};

var handleError = function(err, socket) {
    socket.emit('errorhandler', err); // emit the error to the client
    console.log(socket.id+" - Error: " + err.message);
    //throw err;
}

Scanner.prototype.setCoords = function(location) {
  coords.latitude = location.lat;
  coords.longitude = location.lng;
  console.log("Marker placed:");
  console.log(coords);
}

 Scanner.prototype.scan = function(socket) {
   // obtain an array of pokemon close to the given coordinates
   pokegoScan(coords, function(err, pokemon) {
    if (err) {
      handleError(err, socket);
      socket.emit('loading', false);
      return;
    }

    socket.emit('loading', false); //stop the loading indicator
    // emit the scan event and pass the array to the client
    console.log("Scan succeeded! Populating map...");
    socket.emit('scan',  pokemon);
   });
 }

 Scanner.prototype.printData = function(socket) {
   // obtain an array of pokemon close to the given coordinates
   pokegoScan(coords, function(err, pokemon) {
     if (err) {
       handleError(err, socket);
       return;
     }

     console.log(pokemon)
   });
 }

 module.exports = Scanner;
