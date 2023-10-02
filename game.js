import Background from "./Background.js";
import Fish from "./Fish.js";
import { globalOptions } from "./Options.js";
import Columns from "./Columns.js";
import Score from "./Score.js";
import DrawLogic from "./DrawLogic.js";


export default class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.context = canvas.getContext("2d");
        this.drawLogic = new DrawLogic();
        this.frameId = 0;
        this.storedScore = localStorage.getItem('max_score') ? localStorage.getItem('max_score') : 0;
        this.index = 0;
        this.speed = globalOptions.speedIndex;
        this.y = 0;
        this.timeStamp = 0;
        this.request;
        this.columnsArray;
        this.resetGameListener = this.newGame.bind(this);
    }

    gameStart() {
        this.resetGame();
        this.isLost = false;
        this.score.score = 0;
        this.background.loadBackground();
        this.background.setScaleFactors();
        this.fish.loadFish();
        this.columns.loadColumns();
        this.score.loadScoreAssets();
        this.fish.drown();
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
        this.checkCollision();
        if(!this.isLost && this.checkFishPassed()){
            this.score.scoreIncrease();
            console.log(this.score.score)
        };
        this.score.displayScore();

        if (this.columnsArray.length > 0) this.columns.moveColumns();

        this.request = window.requestAnimationFrame(this.render.bind(this));

        if(this.isLost) {
            window.cancelAnimationFrame(this.request);
            this.context.drawImage(
                this.score.image, 
                globalOptions.menuAssets.restartButton.x,  
                globalOptions.menuAssets.restartButton.y, 
                globalOptions.menuAssets.restartButton.width, 
                globalOptions.menuAssets.restartButton.height,
                (this.canvas.width / 2) - 100, 
                (this.canvas.height / 2) - 50,
                200,
                100);
            this.canvas.addEventListener('mousedown',  this.resetGameListener)
        }
    }

    newGame() {
        this.canvas.removeEventListener('mousedown', this.resetGameListener);
        this.gameStart();
    }

    resetGame() {
        this.fish = new Fish(this.context);
        this.columns = new Columns();
        this.background = new Background();
        this.score = new Score(this.storedScore, this.context);
        this.columnsArray = this.columns.columns;
    }

    drawBackground() {
        this.context.drawImage(
            this.background.Img, 
            this.backgroundX + globalOptions.background.imgScaleWidth, 
            0, 
            globalOptions.background.imgScaleWidth, 
            globalOptions.background.imgScaleHeight);

        this.context.drawImage(
            this.background.Img, 
            this.backgroundX,
            0, 
            globalOptions.background.imgScaleWidth, 
            globalOptions.background.imgScaleHeight);
    }

    drawFish() {
        if(this.fish.falling) {
            this.context.save();
            this.context.translate(globalOptions.fish.x + globalOptions.fish.width / 2, this.fish.y + globalOptions.fish.height / 2);
            this.context.rotate(this.fish.rotationAngle * Math.PI / 360);
            this.context.drawImage(
                this.fish.img, 
                globalOptions.fish.frames[this.frameId].x, 
                globalOptions.fish.frames[this.frameId].y, 
                globalOptions.fish.frames[this.frameId].width, 
                globalOptions.fish.frames[this.frameId].height,
                -(globalOptions.fish.width / 2),
                -(globalOptions.fish.height / 2),
                globalOptions.fish.width, 
                globalOptions.fish.height)
            this.context.restore();
        } else {
            this.context.save();
            this.context.translate(globalOptions.fish.x + globalOptions.fish.width / 2, this.fish.y + globalOptions.fish.height / 2);
            this.context.rotate(this.fish.rotationAngle * Math.PI / 360);
            this.context.drawImage(
                this.fish.img,   
                globalOptions.fish.frames[this.frameId].x, 
                globalOptions.fish.frames[this.frameId].y, 
                globalOptions.fish.frames[this.frameId].width, 
                globalOptions.fish.frames[this.frameId].height, 
                -(globalOptions.fish.width  / 2),
                -(globalOptions.fish.height / 2),
                globalOptions.fish.width, 
                globalOptions.fish.height)
            this.context.restore();
        }
        
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
                    this.columnsArray[i].topColdHeight)

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

    checkCollision() {
        const fishTop = this.fish.y;
        const fishBottom = this.fish.y + globalOptions.fish.height;
        const fishLeft = globalOptions.fish.x;
        const fishRight = globalOptions.fish.x + globalOptions.fish.width;

        if((this.fish.y + globalOptions.fish.height) >= this.canvas.height){
            this.isLost = true;
        }
        
        for(let i = 0; i < this.columnsArray.length; i++){
            const columnLeft = this.columnsArray[i].x;
            const columnRight = this.columnsArray[i].x + globalOptions.columns.width;
            const topColumnTop = 0;
            const topColumnBottom = this.columnsArray[i].topColdHeight;
            const bottomColumnTop = globalOptions.canvas.height - this.columnsArray[i].bottomColdHeight;
            const bottomColumnBottom = globalOptions.canvas.height;

            if(fishRight > columnLeft && 
                fishLeft < columnRight && 
                fishTop < topColumnBottom && 
                fishBottom > topColumnTop) {
                this.isLost = true;
            }

            if(fishRight > columnLeft && 
                fishLeft < columnRight && 
                fishTop < bottomColumnBottom && 
                fishBottom > bottomColumnTop) {
                this.isLost = true;
            }
        }
    }

    checkFishPassed() {
        const fishRight = globalOptions.fish.x + globalOptions.fish.width;
        let result = false;
        for(let i = 0; i < this.columnsArray.length; i++){
    
            if (!this.columnsArray[i].passed) {
                if(fishRight > this.columnsArray[i].x) {
                    const columnMiddle = this.columnsArray[i].x + (globalOptions.columns.width / 2);
                    if(fishRight > columnMiddle) {
                        this.columnsArray[i].passed = true;
                        result = true;
                    }
                }
            }
        }
        return result;
    }

    sweemUp() {
        this.fish.sweemUp()
    }

    createLoadScreen() {
        const startButtonImage = new Image();
        startButtonImage.src = globalOptions.menuAssets.src;

        startButtonImage.onload = () => {
            this.context.drawImage(
                startButtonImage, 
                globalOptions.menuAssets.restartButton.x,  
                globalOptions.menuAssets.restartButton.y, 
                globalOptions.menuAssets.restartButton.width, 
                globalOptions.menuAssets.restartButton.height,
                (this.canvas.width / 2) - 100, 
                (this.canvas.height / 2) - 50,
                200,
                100)};
    }


    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

}