export default class Score {
    constructor(scoreTable, maxScoreTable, storedScore) {
        // this.scoreTable = scoreTable;
        // this.maxScoreTable = maxScoreTable;
        // this.maxScore = storedScore;
        this.score = 0;
    }

    scoreIncrease() {
        this.score += 1;
        // if (this.score > this.maxScore) {
        //     localStorage.setItem('max_score', this.score);
        // }
    }

    resetScore() {
        this.score = 0;
    }

    displayScore() {
        if (this.score > this.maxScore) {
            this.maxScore = this.score;
        }
        this.scoreTable.textContent = `current score: ${this.score}`;
        this.maxScoreTable.textContent = `max score: ${this.maxScore}`;
    }


}