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
  board.on("exit", () => { motor.stop(); });

  var speed = 0;

  function random(min, max) {
    return Math.random() * (max - min) + min;
  }

  function newDirection() {
    const newSpeed = (speed > 0) ? (
      // reverse
      -1 * random(0.005, 0.15)
    ) : (
      // forward
      random(0.005, 0.15)
    );
    // running at 0.15 for 5s gives us 50cm of length, 0.15 * 5 * x = 50cm, so x is about 67
    // but that's unmeasured, so adjusting from that guess
    const timeToRun = Math.round(Math.abs(newSpeed) * 25);
    speed = newSpeed;

    console.log(`running at ${speed} for ${timeToRun}s`);
    setTimeout(newDirection, timeToRun * 1e3);
    // johnny-five handles the direction for us
    motor.cw(speed);
  }

  setTimeout(newDirection, 3e3);
});
