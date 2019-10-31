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
    return Math.random() * (max - min) + min;
  }

  function newDirection() {
    var newSpeed = random(0.005, 0.15);
    // running at 0.15 for 5s gives us 50cm of length, 0.15 * 5 * x = 50cm, so x is about 67
    var timeToRun = Math.round(newSpeed * 67);
    if (speed > 0) {
      newSpeed *= -1;
    }
    speed = newSpeed;

    console.log(`running at ${speed} for ${timeToRun}ms`);
    setTimeout(newDirection, timeToRun * 1e3);
    if (speed >= 0) {
      motor.cw(speed);
    } else {
      motor.ccw(speed);
    }
  }

  setTimeout(newDirection, 3e3);
});
