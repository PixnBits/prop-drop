const {Board, Servo} = require("johnny-five");
const Raspi = require("raspi-io").RaspiIO;
const board = new Board({ io: new Raspi() });

function random(min, max) {
  return Math.random() * (max - min) + min;
}

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

  var speedHistory = [0, 0];

  function newDirection() {
    console.log('speedHistory', speedHistory);
    var timeToRun;
    if (speedHistory[0] !== 0) {
      // pause at the current location
      speedHistory.unshift(0);
      timeToRun = Math.round(random(1, 10));
      console.log(`stopping for ${timeToRun}s`);
      motor.stop();
    } else {
      const newSpeed = (speed > 0) ? (
        // reverse
        -1 * random(0.005, 0.15)
      ) : (
        // forward
        random(0.005, 0.15)
      );
      // running at 0.15 for 5s gives us 50cm of length, 0.15 * 5 * x = 50cm, so x is about 67
      // but that's unmeasured, so adjusting from that guess
      timeToRun = Math.round(Math.abs(newSpeed) * 25);
      speedHistory.unshift(newSpeed);

      console.log(`running at ${speed} for ${timeToRun}s`);
      // johnny-five handles the direction for us
      motor.cw(speed);
    }
    setTimeout(newDirection, timeToRun * 1e3);
    while (speedHistory.length > 2) {
      speedHistory.pop();
    }
  }

  setTimeout(newDirection, 3e3);
});
