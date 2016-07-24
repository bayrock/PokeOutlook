//pokescan.js

var pokegoScan = require('pokego-scan');

//default to Central Park, NYC
var coords = {
    latitude: 40.785091,
    longitude: -73.968285
};

var Scanner = function () {};

Scanner.prototype.setCoords = function(location) {
  coords.latitude = location.lat;
  coords.longitude = location.lng;
  console.log(coords);
}

 Scanner.prototype.scan = function(socket) {
   // obtain an array of pokemon close to the given coordinates
   pokegoScan(coords, function(err, pokemon) {
       if (err) throw err;
       //console.log(pokemon);

       // emit the scan event and pass the array to the client
       socket.emit('scan',  pokemon);
   });
 }

 Scanner.prototype.printNames = function(socket) {
   // obtain an array of pokemon close to the given coordinates
   pokegoScan(coords, function(err, pokemon) {
       if (err) {
         socket.emit('errorhandler', "Error scanning pokemon; try again later!");
         //throw err;
         return;
       }

       for (id in pokemon) {
         var poke = pokemon[id];
         console.log(poke.name);
       }
   });
 }

 module.exports = Scanner;
