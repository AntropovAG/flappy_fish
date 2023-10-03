import { globalOptions } from "./Options.js";

export default class Fish {
    constructor(context) {
        this.y = globalOptions.fish.y;
        this.SweemUpDuration = 200;
        this.sweemUpHeight = globalOptions.fish.sweemUpHeight;
        this.fallingStartTime = Date.now();
        this.sqr = 1.3;
        this.quantizer = 800;
        this.FallingAcceleration = 2  ;
        this.JumpAcceleration = 0.5;
        this.context = context;
        this.rotationAngle = 0;
        this.rotationSpeed = 45 / this.SweemUpDuration;
    }

    move() {
        let deltaDown = this.FallingAcceleration * Math.pow((Date.now() - this.fallingStartTime) / this.quantizer, this.sqr);
        this.y += deltaDown;
        this.rotationAngle += (this.rotationSpeed * deltaDown) * 2;
        if(this.rotationAngle > 45) {
            this.rotationAngle = 45;
        }
        if (!this.falling) {
            if(Date.now() > this.sweemUpEndTime) {
                this.drown();
                return
            }
            let deltaUp = (Date.now() - this.sweemUpTime) * (this.sweemUpHeight / this.SweemUpDuration);
            this.sweemUpTime = Date.now();
            this.y -= deltaUp;
            this.rotationAngle -= (this.rotationSpeed * deltaUp) * 2;
            if(this.rotationAngle < -45) {
                this.rotationAngle = -45;
            }
        }
        if(this.y < 0) {
            this.y = 0;
        }
    }

    drown() {
        this.falling = true;
    }

    sweemUp() {
        this.falling = false;
        this.sweemUpTime = Date.now();
        this.sweemUpEndTime = Date.now() + this.SweemUpDuration;
        this.fallingStartTime = Date.now();
    }

}