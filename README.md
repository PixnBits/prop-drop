# Prop Drop

A small, one-day project for running a continuous servo to control the height of [a spider](https://www.homedepot.com/p/Home-Accents-Holiday-10-in-Skeleton-Spider-8342-10571BL/308468102).

# Hardware

## Purchases

(Purchased before the "one day" countdown was started.)

* [Raspberry Pi Zero W](https://www.raspberrypi.org/products/raspberry-pi-zero-w/)
* [I2C Interface PWM Servo Motor Driver for Raspberry Pi](https://www.amazon.com/gp/product/B07H9ZTWNC)
* [Servo Winch Drum, Cable, and Hook](https://www.amazon.com/gp/product/B07TV5N1GV)
* [Continuous rotation servo](https://www.amazon.com/gp/product/B01HSX1IDE)
* 5 volt (USB) power supply, I used one rated for 2 amps
* small zip ties

I needed to open the servo via the four screw at the bottom to access the trim potentiometer (pot) to [set the stop target](https://github.com/rwaldron/johnny-five/issues/521#issuecomment-65911630). It might be that I should have [adjusted the `pwmRange` instead](http://johnny-five.io/api/servo/#parameters) but as a one-day project the pot being quicker won.

## Printed

As part of the "one-day" I designed and printed [a mount for the pi and servo](prints/prop-drop.stl). The servo mounted in with its supplied screws and the pi used zip ties in the two holes not occupied by the PWM board risers. I skipped the top finish layers to save 30-ish minutes on the 2hr+ print.

# Software

I installed [`nvm`](https://github.com/nvm-sh/nvm) and then Node.js 10.something. `$ npm install` and then `$ npm start`.
