'use strict';

var os = require('os');
var nodeStatic = require('node-static');
var http = require('http');
var socketIO = require('socket.io');

var fileServer = new (nodeStatic.Server)();
var app = http.createServer(function (req, res) {
  fileServer.serve(req, res);
}).listen(8080);

var io = socketIO.listen(app);
io.sockets.on('connection', function (socket) {

  // convenience function to log server message on the client
  function log() {

  }

  socket.on('message', function (message) {
    socket.broadcast.emit('message', message);
  });

  socket.on('create on join', function (room) {

  });

  socket.on('ipaddr', function () {

  });

});