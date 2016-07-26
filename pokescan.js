//pokescan.js

var pokegoScan = require('./scripts/pokego-scan');

//default to Central Park, NYC
var coords = {
    latitude: 40.785091,
    longitude: -73.968285
};

var Scanner = function () {};

var handleError = function(err, socket) {
    var error = err.message || "Error scanning pokemon; try again later!"
    socket.emit('errorhandler', error); // emit the error to the client
    console.log("Error: " + error);
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
      return;
    }

    //console.log(pokemon);

    // emit the scan event and pass the array to the client
    console.log("Scan succeeded! Populating map...");
    socket.emit('scan',  pokemon);
   });
 }

 Scanner.prototype.printNames = function(socket) {
   // obtain an array of pokemon close to the given coordinates
   pokegoScan(coords, function(err, pokemon) {
     if (err) {
       handleError(err, socket);
       return;
     }

     for (id in pokemon) {
       var poke = pokemon[id];
       console.log(poke.name);
     }
   });
 }

 module.exports = Scanner;
