// Load requirements
var app = require('express')(),
http = require('http').Server(app),
io = require('socket.io')(http);
var port = process.env.PORT || 8080;

// Create server & socket
app.get('/', function(req, res){
  res.send('<script src="/socket.io/socket.io.js"></script><script>var socket = io(); socket.on("event", function(e){console.log("event: " + e); });</script>');
});
http.listen(port, function(){
    console.log('listening on port ' + port);
});

// Add a connect listener
io.on('connection', function(socket)
{
    console.log('Client connected.');

    socket.on('ping', function(value){
        console.log('ping: ' + value);
        socket.broadcast.emit('ping', value);
    });

    socket.on('event', function(e){
        console.log('event: ' + e);
        socket.broadcast.emit('event', e);
    });

    socket.on('disconnect', function() {
        console.log('Client disconnected.');
    });
});