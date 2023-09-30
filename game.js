import Background from "./Background.js";
import Fish from "./Fish.js";
import Options from "./Options.js";
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
        this.options = new Options();
        this.index = 0;
        this.speed = this.options.speedIndex;
        this.y = 0;
        this.timeStamp = 0;
        this.request;
        this.columnsArray = this.columns.columns;
    }

    gameStart() {
        this.background.loadBackground();
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
        this.backgroundX = -((this.index * this.speed) % 1224);
        this.context.drawImage(this.background.Img, this.backgroundX + 1224, 0, 1224, 406);
        this.context.drawImage(this.background.Img, this.backgroundX, 0, 1224, 406);

        this.fish.move();
        this.drawFish();

        this.columns.createColumns();
        this.drawColumns();
        if (this.columnsArray.length > 0) this.columns.moveColumns();


        if((this.fish.y + this.options.fish.height) >= this.canvas.height) {
            console.log("Game Over!");
        }

            this.request = window.requestAnimationFrame(this.render.bind(this));
        
    }

    drawFish() {
        this.context.drawImage(
            this.fish.img, 
            this.options.fish.frames[this.frameId].x, 
            this.options.fish.frames[this.frameId].y, 
            this.options.fish.frames[this.frameId].width, 
            this.options.fish.frames[this.frameId].height, 
            this.options.fish.x,
            this.fish.y,
            this.options.fish.width, 
            this.options.fish.height)
    }

    drawColumns() {
            for (let i=0; i < this.columnsArray.length; i++){ 
                this.context.drawImage(this.columns.img, 
                    this.options.columns.topColumn.x, // sx
                    this.columnsArray[i].topColsy, // sy
                    /* Source width*/  this.options.columns.topColumn.width,
                    /* Source height*/ this.columnsArray[i].topColsHeight, 
                    this.columnsArray[i].x,
                    0,
                    this.options.columns.width,
                    /* Canvas height*/ this.columnsArray[i].topColdHeight,)
                this.context.drawImage(this.columns.img, 
                    this.options.columns.bottomColumn.x,
                    this.columnsArray[i].bottomColsy,
                    this.options.columns.bottomColumn.width,
                    this.columnsArray[i].bottomColsHeight,
                    this.columnsArray[i].x,
                    this.canvas.height - this.columnsArray[i].bottomColdHeight,
                    this.options.columns.width,
                    this.columnsArray[i].bottomColdHeight);
        }

    }

    sweemUp() {
        this.fish.sweemUp()
    }

}