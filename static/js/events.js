//events.js

var socket = io();

function Notify(msg, type, length) {
  var note = noty({layout: 'topCenter',text: msg, type: type,
    animation: {
      open: 'animated flipInX', // animate.css class names
      close: 'animated flipOutX' // animate.css class names
    },
    timeout: length || 4000
  });
}

//receive the scan results from the server
socket.on('scan', function(result){
  Notify('Scan succeeded!', 'success', 3000)

  for (id in result) {
    var pokemon = result[id];
    placePokeMarker(pokemon);
  }
});

//receive the error from the server
socket.on('error_handler', function(error){
  //console.log(error);
  Notify(error.message, error.type);
});

//receive the loading from the server
socket.on('loading', function(bool){
  if (bool) {
    document.getElementById("loading").innerHTML = "<img src='loading.gif' alt='Loading' style='margin:5px 0 0 5px;height: 30px'>";
  } else {
    document.getElementById("loading").innerHTML = "";
  }
});
