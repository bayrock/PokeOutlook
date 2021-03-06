//maps.js

//Initialize the google map
var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    //default to Central Park, NYC
    center: {lat: 40.785091, lng: -73.968285},
    zoom: 12,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  google.maps.event.addListener(map, 'click', function(event) {
    placeScanMarker(event.latLng);
    socket.emit('marker_placed',  event.latLng); // send location to the server
  });
}

var scanMarker;
function placeScanMarker(location) {
  if (scanMarker != null) {
    scanMarker.setMap(null);
  }

  scanMarker = new google.maps.Marker({
    position: location,
    map: map
  });
}

function placePokeMarker(pokemon) {

  var pokeMarker = new google.maps.Marker({
    position: {lat: pokemon.latitude, lng: pokemon.longitude},
    map: map,
    name: pokemon.name || "Unknown",
    icon: pokemon.image,
    animation: google.maps.Animation.DROP
  });

  pokeMarker.infowindow = new google.maps.InfoWindow({
    content: "<div><b>"+pokemon.name+"</b><br>Despawn:  "+pokemon.despawns_in_str+"</div>"
  });

  pokeMarker.addListener('mouseover', function() {
    this.infowindow.open(map, this);
  });

  pokeMarker.addListener('mouseout', function() {
      this.infowindow.close();
  });

  createDespawnTimer(pokemon.despawns_in, pokeMarker);
}

function createDespawnTimer(duration, marker) {
  var start = Date.now(),
    diff,
    minutes,
    seconds;
  function timer() {
    // get the number of seconds that have elapsed since
    // startTimer() was called
    diff = duration - (((Date.now() - start) / 1000) | 0);

    // does the same job as parseInt truncates the float
    minutes = (diff / 60) | 0;
    seconds = (diff % 60) | 0;

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    var despawn = minutes+":"+seconds
    marker.infowindow.setContent("<div><b>"+marker.name+"</b><br>Despawn:  "+despawn+"</div>");

    //if the timer has ended
    if (diff <= 0) {
      //destroy the timer
      clearInterval(marker.interval);
      //destroy the marker
      marker.setMap(null);
    }
  }
  // we don't want to wait a full second before the timer starts
  timer();
  marker.interval = setInterval(timer, 1000);
}

google.maps.event.addDomListener(window, "load", initMap);
