'use strict';

// Set up media stream constant and parameters.

// You will be streaming video only: "video: true".
// Audio will not be streamed because it is set to "audio: false" by default.
const mediaStreamConstraints = {
  video: true,
};

// Video element where stream will be placed.
const localVideo =  document.getElementById('localVideo');

// local stream that will be reproduced on the video.
let localStream;

// Sets the MediaStream as the video element src.
function gotLocalMediaStream(mediaStream) {
  localVideo.srcObject = mediaStream;
  localStream = mediaStream;
  trace('Received local stream.');
  callButton.disabled = false;  // Enable call button.
}

// Handles error by logging a message to the console with the error message.
function handleLocalMediaStreamError(error) {
  trace(`navigator.getUserMedia error: ${error.toString()}.`);
}

// Define and add behavior to buttons.

// Define action buttons.
const startButton = document.getElementById('startButton');
const callButton = document.getElementById('callButton');
const hangupButton = document.getElementById('hangupButton');

// Set up initial action buttons status: disable call and hangup.
callButton.disabled = true;
hangupButton.disabled = true;

// Handles start button action: creates local Media Stream
function startAction() {
  startButton.disabled = true;
  navigator.mediaDevices.getUserMedia(mediaStreamConstraints).then(gotLocalMediaStream).catch(handleLocalMediaStreamError);
}

// Handles call button action: creates peer connection.
function callAction() {

}

// Handles hangup action: ends up call, closes connections and resets peers.
function hangupAction() {

}

// Add click event handlers for buttons.
startButton.addEventListener('click', startAction);
callButton.addEventListener('click', callAction);
hangupButton.addEventListener('click', hangupAction);

// Logs an action (text) and the time when it happened on the console.
function trace(text) {
  text = text.trim();
  const now = (window.performance.now() / 1000).toFixed(3);

  console.log(now, text);
}

var isInitiator = true;

window.room = prompt('Enter room name:');

var socket = io.connect();

if (room !== '') {
  console.log(`message from client: Asking to join room ${room}`)   // #1, #5
  socket.emit('create or join', room);
}

socket.on('created', function (room, clientId) {
  isInitiator = true;
  socket.emit('ipaddr');
});

socket.on('full', function (room) {
  console.log(`Message from client: Room ${room} is full :^(`);
});

socket.on('ipaddr', function (ipaddr) {
  console.log(`Message from client: Server IP address is ${ipaddr}`);
});

socket.on('joined', function (room, clientId) {
  isInitiator = false;
});

socket.on('log', function (array) {
  // merging array elements
  console.log.apply(console, array);
});

socket.on('join', function () {
  console.log('join');
});

socket.on('ready', function () {
  console.log('ready');
});
