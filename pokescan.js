//pokescan.js

var pokegoScan = require('pokego-scan');

var coords = {
    latitude: 40.4164737,
    longitude: -3.7042757
};

var Scanner = function () {};

 Scanner.prototype.scan = function(socket) {
   // obtain an array of pokemon close to the given coordinates
   pokegoScan(coords, function(err, pokemon) {
       if (err) throw err;
       //console.log(pokemon);

       // emit the scan event and pass the array to the client
       socket.emit('scan',  pokemon);
   });
 }

 Scanner.prototype.printNames = function() {
   // obtain an array of pokemon close to the given coordinates
   pokegoScan(coords, function(err, pokemon) {
       if (err) throw err;

       for (id in pokemon) {
         var poke = pokemon[id];
         console.log(poke.name);
       }
   });
 }

 module.exports = Scanner;
