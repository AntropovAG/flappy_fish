import { globalOptions } from "./Options.js";

export default class Score {
    constructor(storedScore, context) {
        this.maxScore = storedScore;
        this.context = context;
        this.score = 0;
        this.scoreArr = this.score.toString().split('');
        this.maxScoreArr = this.maxScore.toString().split('');
    }

    scoreIncrease() {
        this.score += 1;
        if (this.score > this.maxScore) {
            localStorage.setItem('max_score', this.score);
        }
        this.scoreArr = this.score.toString().split('');
    }

    resetScore() {
        this.score = 0;
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