const {Board, Servo} = require("johnny-five");
const Raspi = require("raspi-io").RaspiIO;
const board = new Board({ io: new Raspi() });

console.log('starting');
board.on("ready", () => {
  console.log("Connected");

  // Initialize the servo instance
  const motor = new Servo.Continuous({
    controller: 'PCA9685',
    address: 0x40,
    pin: 1,
  });
  motor.stop();

  var speed = 0;

  function random(min, max) {
    return Math.random() * min + (max - min);
  }

  function newDirection() {
    var newSpeed = random(0.005, 0.15);
    // running at 0.15 for x gives us 50cm of length, so x is about 340
    var timeToRun = Math.round(newSpeed * 340);
    if (speed > 0) {
      newSpeed *= -1;
    }

    console.log(`running at ${speed} for ${timeToRun}ms`);
    setTimeout(newDirection, timeToRun);
    if (speed >= 0) {
      motor.cw(speed);
    } else {
      motor.ccw(speed);
    }
  }

  setTimeout(newDirection, 3e3);
});
