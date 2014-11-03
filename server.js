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

var values = {
    wind: 0,
    fire: 100,
    water: 0,
};

app.use(express.static(__dirname + "/public/"));

http.listen(port, function(){
    console.log('listening on port ' + port);
});

// Add a connect listener
io.on('connection', function(socket)
{
    console.log('Client connected.');
    socket.emit('init', values);
    console.log(values);

    socket.on('ping', function(value){
        // console.log('ping: ' + value);
        socket.broadcast.emit('ping', value);
    });

    socket.on('event', function(e){
        // console.log('event- type: ' + e.type + ', value: ' + e.value);
        setValues(e.type, e.value);
        socket.broadcast.emit('event', e);
    });

    socket.on('disconnect', function() {
        console.log('Client disconnected.');
    });
});

var timer;
var intervalRandom;

startTimer();

function startTimer(){
    timer = setTimeout(startRandom,5000);
}

function setValues(type, value){
    values[type] = value;
    timerReset();
}

function timerReset(){
    clearTimeout(timer);
    clearIntervalRandom();
    startTimer();
}

function startRandom(){
    clearIntervalRandom();
    intervalRandom = setInterval(randomValues, 100);
}

function clearIntervalRandom(){
    clearInterval(intervalRandom);
}

function randomValues(){
    values.wind += Math.random() * 4 - 2;
    if(values.wind < 0) values.wind = 0;
    if(values.wind > 100) values.wind = 100;
    io.sockets.emit('event', {type: 'wind', value: values.wind});

    values.fire += Math.random() * 2 - 1;
    if(values.fire < 0) values.fire = 0;
    if(values.fire > 100) values.fire = 100;
    io.sockets.emit('event', {type: 'fire', value: values.fire});

    if(values.water < 0) values.water = 0;
    if(values.water > 100) values.water = 100;
    values.water += Math.random() * 4 - 2;
    io.sockets.emit('event', {type: 'water', value: values.water});
}