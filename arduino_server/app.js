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
        default: 0,
        type: 'number',
    },
    {
        name: 'maxWind',
        description: 'Maximum wind',
        default: 0,
        type: 'number',
    },
    {
        name: 'minFire',
        description: 'Minimum fire',
        default: 0,
        type: 'number',
    },
    {
        name: 'maxFire',
        description: 'Maximum fire',
        default: 0,
        type: 'number',
    },
    {
        name: 'minWater',
        description: 'Minimum water',
        default: 0,
        type: 'number',
    },
    {
        name: 'maxWater',
        description: 'Maximum water',
        default: 0,
        type: 'number',
    }
];

var options = {};

function saveOption(option){
    var name = Object.keys(option)[0];
    options[name] = option[name];
    console.log(options);
}

function saveOptions(options){
    for(var i = 0; i < options.length; i++){
        saveOption(options[i]);
    }
}

// prompt.get(questions, function (err, result) {
//     if (err) { return onErr(err); }
//     if(result.etalonner == "non")
//         start();
//     else {
//         saveOption(result);
//         continuerQuestions1();
//     }
// });

continuerQuestions1();

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
            // console.log(result);
            saveOption(result);
            continuerQuestions2();
        });
    });
}

function continuerQuestions2(){
    function measure(question, next){
        var count = 0;
        var interval = setInterval(function(){
            //TODO LOG MEASURE
            console.log(count);
            if(count > 20){
                clearInterval(interval);
                // next();
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