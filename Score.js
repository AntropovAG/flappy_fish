import { globalOptions } from "./Options.js";

export default class Score {
    constructor(storedScore, context) {
        this.maxScore = storedScore;
        this.context = context;
        this.score = 0;
    }

    scoreIncrease() {
        this.score += 1;
        if (this.score > this.maxScore) {
            localStorage.setItem('max_score', this.score);
        }
    }

    resetScore() {
        this.score = 0;
    }

    displayScore() {
        if (this.score > this.maxScore) {
            this.maxScore = this.score;
        }

        this.context.drawImage(
            this.img,
            globalOptions.menuAssets.scorePanel.x,
            globalOptions.menuAssets.scorePanel.y,
            globalOptions.menuAssets.scorePanel.width,
            globalOptions.menuAssets.scorePanel.height,
            10,
            10,
            globalOptions.canvasFreeSpaceHeight / 1.5, 
            globalOptions.canvasFreeSpaceHeight);
            
            this.context.fillStyle = 'brown';
            this.context.font = "1.8em bold";
            this.context.textAlign = 'center';
            this.context.fillText(this.score, 45, 53);
            this.context.fillText(this.maxScore, 45, 83);
    }


}