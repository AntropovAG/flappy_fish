import Background from "./Background.js";
import Fish from "./Fish.js";
import Options from "./Options.js";

export default class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.context = canvas.getContext("2d");
        this.fish = new Fish();
        this.score = 0;
        this.frameId = 0;
        this.background = new Background('./assets/background.png', 600, 600);
        this.options = new Options();
        this.index = 0;
        this.speed = this.options.speedIndex;
    }

    gameStart() {
        this.background.loadBackground();
        this.fish.loadFish();
        this.render();
    }
    
    render() {
        this.index += .3;
        this.backgroundX = -((this.index * this.speed) % 1224);
        this.frameId = Math.floor((this.index % 16) / 4);
        this.context.drawImage(this.background.Img, this.backgroundX + 1224, 0, 1224, 406)
        this.context.drawImage(this.background.Img, this.backgroundX, 0, 1224, 406)
        this.context.drawImage(
            this.fish.img, 
            this.options.fish.frames[this.frameId].x, 
            this.options.fish.frames[this.frameId].y, 
            this.options.fish.frames[this.frameId].width, 
            this.options.fish.frames[this.frameId].height, 
            this.options.fish.x,
            this.options.fish.y, 
            this.options.fish.width, 
            this.options.fish.height)
        window.requestAnimationFrame(this.render.bind(this));
    }
    
    KeybEvent() {
        

    }

}