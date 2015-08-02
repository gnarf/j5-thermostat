var five = require('johnny-five');
var BeagleBone = require('beaglebone-io');
var newrelic = require('newrelic');

var board = new five.Board({ 
  io: new BeagleBone(),
  repl: false,
});

board.on('ready', function () {
  var temp = new five.Sensor({
    pin: "A0",
    freq: 2000,
  });

  temp.scale(-58, 266).on('data', function() {
    var tempF = this.scaled;
    newrelic.recordMetric('Custom/Temp/F', tempF);
  });
});
