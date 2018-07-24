'use strict';

var isInitiator = true;

window.room = prompt('Enter room name:');

var socket = io.connect();

if (room !== '') {
  console.log(`message from client: Asking to join room ${room}`)
  socket.emit('create or join', room);
}

socket.on('created', function(room, clientId) {
  isInitiator = true;
});

socket.on('log', function (array) {
  // merging array elements
  console.log.apply(console, array);
});