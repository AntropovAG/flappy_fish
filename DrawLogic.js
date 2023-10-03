import Background from "./Background.js";
import Fish from "./Fish.js";
import { globalOptions } from "./Options.js";
import Columns from "./Columns.js";

export default class DrawLogic {
    constructor() {
        this.fish = new Fish(this.context);
        this.columns = new Columns();
        this.frameId = 0;
        this.background = new Background('./assets/background.png');
        this.index = 0;
        this.speed = globalOptions.speedIndex;
        this.y = 0;
        this.timeStamp = 0;
        this.request;
        this.columnsArray = this.columns.columns;
    }

    drawBackground() {
        this.context.drawImage(
            this.background.img, 
            this.backgroundX + globalOptions.background.imgScaleWidth, 
            0, 
            globalOptions.background.imgScaleWidth, 
            globalOptions.background.imgScaleHeight);

        this.context.drawImage(
            this.background.img, 
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

    displayScore() {
        if (this.score > this.maxScore) {
            this.maxScore = this.score;
            this.maxScoreArr = this.maxScore.toString().split('');
        }

        this.context.drawImage(
            this.img,
            globalOptions.menuAssets.scorePanel.x,
            globalOptions.menuAssets.scorePanel.y,
            globalOptions.menuAssets.scorePanel.width,
            globalOptions.menuAssets.scorePanel.height,
            10,
            10,
            globalOptions.menuAssets.scorePanel.dislayWidth, 
            globalOptions.menuAssets.scorePanel.dislayHeight);

        let currentScoreX = globalOptions.menuAssets.scoreNumbers.current.x;

        for(let i = 0; i < this.scoreArr.length; i++){
            let number = this.scoreArr[i];
            this.context.drawImage(
                this.img,
                globalOptions.numbers[number].sx,
                globalOptions.numbers[number].sy,
                globalOptions.numbers[number].sWidth,
                globalOptions.numbers[number].sheight,
                currentScoreX,
                globalOptions.menuAssets.scoreNumbers.current.y,
                globalOptions.menuAssets.scoreNumbers.current.width,
                globalOptions.menuAssets.scoreNumbers.current.height,);

                currentScoreX += globalOptions.menuAssets.scoreNumbers.current.width;
        }

        let maxScoreX = globalOptions.menuAssets.scoreNumbers.max.x;

        for(let i = 0; i < this.maxScoreArr.length; i++){
            let number = this.maxScoreArr[i];
            this.context.drawImage(
                this.img,
                globalOptions.numbers[number].sx,
                globalOptions.numbers[number].sy,
                globalOptions.numbers[number].sWidth,
                globalOptions.numbers[number].sheight,
                maxScoreX,
                globalOptions.menuAssets.scoreNumbers.max.y,
                globalOptions.menuAssets.scoreNumbers.max.width,
                globalOptions.menuAssets.scoreNumbers.max.height,);

                maxScoreX += globalOptions.menuAssets.scoreNumbers.max.width;
        }
    }

}