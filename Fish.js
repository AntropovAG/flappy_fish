import { globalOptions } from "./Options.js";

export default class Fish {
    constructor(context) {
        this.y = globalOptions.fish.y;
        this.img = new Image();
        this.SweemUpDuration = 200;
        this.sweemUpHeight = globalOptions.fish.sweemUpHeight;
        this.fallingStartTime = Date.now();
        this.sqr = 1.3;
        this.quantizer = 800;
        this.FallingAcceleration = 2  ;
        this.JumpAcceleration = 0.5;
        this.context = context;
    }

    loadFish() {
        this.img.src = globalOptions.fish.src;
    }

    move() {
        let deltaDown = this.FallingAcceleration * Math.pow((Date.now() - this.fallingStartTime) / this.quantizer, this.sqr);
        this.y += deltaDown;
        if (!this.falling) {
            if(Date.now() > this.sweemUpEndTime) {
                this.drown();
                return
            }
            let deltaUp = (Date.now() - this.sweemUpTime) * (this.sweemUpHeight / this.SweemUpDuration);
            this.sweemUpTime = Date.now();
            this.y -= deltaUp;       
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