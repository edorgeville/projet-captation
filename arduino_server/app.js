console.log('1');
// Connect to server
var io = require('socket.io-client');
var socket = io.connect('http://localhost:8080', {reconnect: true});
// var socket = io.connect('http://projet-captation.herokuapp.com', {reconnect: true});

console.log('2');

// Add a connect listener
socket.on('connect', function(socket) { 
  console.log('Connected!');
});

setInterval(function(){
    var value = Math.floor(Math.random() * 100);
    console.log(value);
    var e = {};
    e.type = "wind";
    e.value = value;
    // socket.emit('ping', value);
    socket.emit('event', e);
}, 1000);

console.log('3');