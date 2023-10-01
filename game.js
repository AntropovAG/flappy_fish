import Background from "./Background.js";
import Fish from "./Fish.js";
import { globalOptions } from "./Options.js";
import Columns from "./Columns.js";

export default class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.context = canvas.getContext("2d");
        this.fish = new Fish(this.context);
        this.columns = new Columns();
        this.score = 0;
        this.frameId = 0;
        this.background = new Background('./assets/background.png', 600, 600);
        this.index = 0;
        this.speed = globalOptions.speedIndex;
        this.y = 0;
        this.timeStamp = 0;
        this.request;
        this.columnsArray = this.columns.columns;
        this.degree = 0;
    }

    gameStart() {
        this.background.loadBackground();
        this.background.setScaleFactors();
        console.log(globalOptions.background)
        this.fish.loadFish();
        this.columns.loadColumns();
        this.fish.drown();
        this.columns.createColumns();
        this.render();    
    }
    
    render(timeStamp) {
        if (!isNaN(timeStamp) && Math.floor((timeStamp / 180) % 4) !== this.time) {
            this.time = Math.floor((timeStamp / 180) % 4);
            this.frameId = this.time
        }
        
        this.timeStamp = timeStamp;

        this.index += .3;
        this.backgroundX = -((this.index * this.speed) % globalOptions.background.imgScaleWidth);

        this.clear();
        this.drawBackground()

        this.fish.move();
        this.drawFish();

        this.columns.createColumns();
        this.drawColumns();

        if (this.columnsArray.length > 0) this.columns.moveColumns();


        if((this.fish.y + globalOptions.fish.height) >= this.canvas.height) {
            // console.log("Game Over!");
        }

            this.request = window.requestAnimationFrame(this.render.bind(this));
    }

    drawBackground() {
        this.context.drawImage(this.background.Img, this.backgroundX + globalOptions.background.imgScaleWidth, 0, globalOptions.background.imgScaleWidth, globalOptions.background.imgScaleHeight);
        this.context.drawImage(this.background.Img, this.backgroundX,                                           0, globalOptions.background.imgScaleWidth, globalOptions.background.imgScaleHeight);
    }

    drawFish() {
        if(this.fish.falling) {
            this.context.save();
            this.context.translate(globalOptions.fish.x, this.fish.y);
            this.context.rotate(45 * Math.PI / 360);
            this.context.drawImage(
                this.fish.img, 
                globalOptions.fish.frames[this.frameId].x, 
                globalOptions.fish.frames[this.frameId].y, 
                globalOptions.fish.frames[this.frameId].width, 
                globalOptions.fish.frames[this.frameId].height, 
                0 - globalOptions.fish.height,
                0 - globalOptions.fish.width,
                globalOptions.fish.width, 
                globalOptions.fish.height)
            this.context.restore();
        } else {
            this.context.save();
            this.context.translate(globalOptions.fish.x, this.fish.y);
            this.context.rotate(-45 * Math.PI / 360);
            this.context.drawImage(
                this.fish.img, 
                globalOptions.fish.frames[this.frameId].x, 
                globalOptions.fish.frames[this.frameId].y, 
                globalOptions.fish.frames[this.frameId].width, 
                globalOptions.fish.frames[this.frameId].height, 
                0 - globalOptions.fish.height,
                0 - globalOptions.fish.width,
                globalOptions.fish.width, 
                globalOptions.fish.height)
            this.context.restore();
        }
        // this.context.drawImage(
        //     this.fish.img, 
        //     globalOptions.fish.frames[this.frameId].x, 
        //     globalOptions.fish.frames[this.frameId].y, 
        //     globalOptions.fish.frames[this.frameId].width, 
        //     globalOptions.fish.frames[this.frameId].height, 
        //     globalOptions.fish.x,
        //     this.fish.y,
        //     globalOptions.fish.width, 
        //     globalOptions.fish.height)
    }

    drawColumns() {
            for (let i=0; i < this.columnsArray.length; i++){ 
                this.context.drawImage(this.columns.img, 
                    globalOptions.columns.topColumn.x,
                    this.columnsArray[i].topColsy,
                    globalOptions.columns.topColumn.width,
                    this.columnsArray[i].topColsHeight, 
                    this.columnsArray[i].x,
                    0,
                    globalOptions.columns.width,
                    this.columnsArray[i].topColdHeight,)

                this.context.drawImage(this.columns.img, 
                    globalOptions.columns.bottomColumn.x,
                    this.columnsArray[i].bottomColsy,
                    globalOptions.columns.bottomColumn.width,
                    this.columnsArray[i].bottomColsHeight,
                    this.columnsArray[i].x,
                    this.canvas.height - this.columnsArray[i].bottomColdHeight,
                    globalOptions.columns.width,
                    this.columnsArray[i].bottomColdHeight);
        }

    }

    sweemUp() {
        this.fish.sweemUp()
    }

    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

}