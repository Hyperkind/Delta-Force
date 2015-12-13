var EventEmitter = require('events');

function Timer (maxTimer) {
  EventEmitter.call(this);
  var self = this;
  var intervalID = null;

  var interval = 0;
  maxTimer = maxTimer || 10;
  // if (interval > maxTimer) {
  //   self.stop();
  // }


  this.start = function () {
    // var interval = 0;
    // tickCount = tickCount || 10;
    var startTime = Date.now();
    self.emit('start', {startTime: startTime});

    this.intervalID = setInterval(function () {
      if (interval >= maxTimer) {
        self.stop();
      } else {
    // if (interval > tickCount) {
    //   self.stop();
    //   } else {
        self.emit('tick', { interval : ++interval });
      }
    },  1000);
  };

  this.stop = function () {
    var endTime = Date.now();
    self.emit('stop', {endTime: endTime});

    clearInterval(this.intervalID);
  };
}

Timer.prototype = new Object(EventEmitter.prototype, {
  constructor: {
    value: EventEmitter
  }
});

function tickHandler(event) {
  console.log(event);
}

// Timer.prototype.start = function (tickCount) {
//   var self = this;
//   this.i = 0;
//   tickCount = tickCount || 60;
//   var startTime = Date.now();
//   self.emit('start', {startTime: startTime});

//   setInterval(function () {
//     self.emit('tick', { interval : self.i++ });
//   }, 1000);

// };

// Timer.prototype.stop = function () {
//   var endTime = Date.now();
//   self.emit('stop', {endTime: endTime});
// };

var basicTimer = new Timer(15);

basicTimer.addListener('tick', tickHandler);
basicTimer.addListener('start', tickHandler);
basicTimer.addListener('stop', tickHandler);

basicTimer.start();
