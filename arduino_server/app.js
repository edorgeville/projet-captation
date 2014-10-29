
// Connect to server
var io = require('socket.io-client');
var socket = io.connect('http://localhost:8080', {reconnect: true});
// var socket = io.connect('http://projet-captation.herokuapp.com', {reconnect: true});

var prompt = require('prompt');
var serialport = require('serialport');

prompt.start();
prompt.message = "";
prompt.delimiter = "";

var questions2 = [
    {
        name: 'port',
        description: 'Quel port utiliser ?',
    }
];

var questions3 = [
    {
        name: 'minWind',
        oriName: 'wind',
        description: 'Minimum wind',
        default: 0,
        type: 'number',
    },
    {
        name: 'maxWind',
        oriName: 'wind',
        description: 'Maximum wind',
        default: 5,
        type: 'number',
    },
    {
        name: 'minFire',
        oriName: 'fire',
        description: 'Minimum fire',
        default: 7000,
        type: 'number',
    },
    {
        name: 'maxFire',
        oriName: 'fire',
        description: 'Maximum fire',
        default: 11000,
        type: 'number',
    },
    {
        name: 'minWater',
        oriName: 'water',
        description: 'Minimum water',
        default: 0,
        type: 'number',
    },
    {
        name: 'maxWater',
        oriName: 'water',
        description: 'Maximum water',
        default: 50,
        type: 'number',
    }
];

var options = {};

function saveOption(option){
    var name = Object.keys(option)[0];
    options[name] = option[name];
}

function saveOptions(options){
    for(var i = 0; i < options.length; i++){
        saveOption(options[i]);
    }
}

console.log('');
console.log('');
console.log('--------> Début de l\'étalonnage...');
console.log('');

continuerQuestions2();

function continuerQuestions2(){
    serialport.list(function (err, ports) {
        console.log('Available serial ports :')
        ports.forEach(function(port) {
            console.log(" " + port.comName);
            questions2[0].default = port.comName;
        });
        console.log('');
        prompt.get(questions2, function (err, result) {
            if (err) { return onErr(err); }
            saveOption(result);
            startSerial();
            continuerQuestions3();
        });
    });
}

var serial;

var lastReceived = {};

function startSerial() {
    // Connect to Arduino
    // Look for newline delimiter
    console.log("ARDUINO > Connecting to port: "+ options.port);
    serial = new serialport.SerialPort( options.port, {parser: serialport.parsers.readline( '\n' )  } );
    
    serial.on('data', function(data) {
        try{
            var splitted = data.split(' ');
            var name = splitted[0].replace("\r", "");
            var content = Number(splitted[1].replace("\r", ""));
            lastReceived[name] = content;
            // console.log(lastReceived);
            if(started)
                sendData(name);
        }
        catch(err){}
    });
}

function sendData(name){
    socket.emit('event', {
        type: name,
        value: filter(name, lastReceived[name]),
    });
    if(name == "wind")
        console.log(name + ": " + filter(name, lastReceived[name]));
}

function filter(name, data){
    var min = options["min" + capitaliseFirstLetter(name)] || 0;
    var max = options["max" + capitaliseFirstLetter(name)] || 0;

    if(data < min){
        data = min;
    }else if(data > max){
        data = max;
    }

    var newMin = 0;
    var newMax = 100;

    var mapped = (data - min) / (max - min) * (newMax - newMin) + newMin;

    return mapped;
}

function capitaliseFirstLetter(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function continuerQuestions3(){
    function measure(question, next){
        var count = 0;
        var interval = setInterval(function(){
            console.log(lastReceived[question.oriName]);
            if(count > 0){
                clearInterval(interval);
                prompt.get(question, function (err, result) {
                    if (err) { return onErr(err); }
                    saveOption(result);
                    next();
                });
            }
            count++;
        }, 100);
    }

    measure(questions3[0], function(){
        measure(questions3[1], function(){
            measure(questions3[2], function(){
                measure(questions3[3], function(){
                    measure(questions3[4], function(){
                        measure(questions3[5], function(){
                            start();
                        })
                    });
                });
            })
        });
    });
}

var started = false;

function start(){
    started = true;
    console.log('');
    console.log('--------> Étalonnage terminé');
    console.log('');
    console.log('');

    // Add a connect listener
    socket.on('connect', function(socket) { 
      console.log('Connected!');
    });
}