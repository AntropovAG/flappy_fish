import Options from "./Options.js";

export default class Fish {
    constructor(context) {
        this.options = new Options();
        this.y = this.options.fish.y;
        this.img = new Image();
        this.SweemUpDuration = 2000;
        this.fallingStartTime = Date.now();
        this.sqr = 1.3;
        this.quantizer = 800;
        this.FallingAcceleration = 1;
        this.JumpAcceleration = 0.5;
        this.context = context;
    }

    loadFish() {
        this.img.src = this.options.fish.src;
    }

    move() {
        let deltaDown = this.FallingAcceleration * Math.pow((Date.now() - this.fallingStartTime) / this.quantizer, this.sqr);
        this.y += deltaDown;
        if (!this.falling) {
            if(Date.now() > this.sweemUpEndTime) {
                this.drown();
                return
            }
            let deltaUp = this.JumpAcceleration * Math.pow((this.sweemUpEndTime - Date.now()) / this.quantizer, this.sqr);
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
        this.sweemUpEndTime = Date.now() + this.SweemUpDuration;
        this.fallingStartTime = Date.now();
    }

}