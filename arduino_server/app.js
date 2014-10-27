// console.log('1');
// Connect to server
var io = require('socket.io-client');
var socket = io.connect('http://localhost:8080', {reconnect: true});
// var socket = io.connect('http://projet-captation.herokuapp.com', {reconnect: true});

var prompt = require('prompt');
var serialport = require('serialport');

prompt.start();
prompt.message = "";
prompt.delimiter = "";

var questions = [
    {
        name: 'etalonner',
        // required: true,
        description: 'Souhaitez-vous étalonner ? (oui/NON)',
        default: 'non',
        // message: 'Veuillez répondre par oui ou par non',
    },
]; 

var questions2 = [
    {
        name: 'port',
        description: 'Quel port utiliser ?',
        // type: '',
    }
];

var questions3 = [
    {
        name: 'minWind',
        description: 'Minimum wind',
        default: '',
        // type: '',
    },
    {
        name: 'maxWind',
        description: 'Maximum wind',
        default: '',
        // type: '',
    },
    {
        name: 'minFire',
        description: 'Minimum fire',
        default: '',
        // type: '',
    },
    {
        name: 'maxFire',
        description: 'Maximum fire',
        default: '',
        // type: '',
    },
    {
        name: 'minWater',
        description: 'Minimum water',
        default: '',
        // type: '',
    },
    {
        name: 'maxWater',
        description: 'Maximum water',
        default: '',
        // type: '',
    }
];

var options = {};

prompt.get(questions, function (err, result) {
    if (err) { return onErr(err); }
    if(result.etalonner == "non")
        start();
    else
        continuerQuestions1();
});

function continuerQuestions1(){
    serialport.list(function (err, ports) {
        var first = true;
        ports.forEach(function(port) {
            console.log(port.comName);
            if(first){
                questions2[0].default = port.comName;
                first = false;
            }
        });
        prompt.get(questions2, function (err, result) {
            if (err) { return onErr(err); }
            continuerQuestions2();
        });
    });
}

function continuerQuestions2(){
    start();
}

function start(){
    // console.log('2');

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
        socket.emit('event', e);
    }, 1000);

    // console.log('3');
}