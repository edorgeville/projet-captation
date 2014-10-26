// Load requirements
var express = require('express'),
app = express(),
http = require('http').Server(app),
io = require('socket.io')(http);
var port = process.env.PORT || 8080;

// Create server & socket
// app.get('/', function(req, res){
//   res.send('<script src="/socket.io/socket.io.js"></script><script>var socket = io(); socket.on("event", function(e){console.log("event: " + e); });</script>');
// });

var values = [];

app.use(express.static(__dirname + "/public/"));

http.listen(port, function(){
    console.log('listening on port ' + port);
});

// Add a connect listener
io.on('connection', function(socket)
{
    console.log('Client connected.');
    socket.emit('init', values);

    socket.on('ping', function(value){
        console.log('ping: ' + value);
        socket.broadcast.emit('ping', value);
    });

    socket.on('event', function(e){
        console.log('event- type: ' + e.type + ', value: ' + e.value);
        setValues(e.type, e.value);
        socket.broadcast.emit('event', e);
    });

    socket.on('disconnect', function() {
        console.log('Client disconnected.');
    });
});

function setValues(type, value){
    values[type] = value;
}