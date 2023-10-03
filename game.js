import Background from "./main/Background.js";
import Fish from "./main/Fish.js";
import { globalOptions } from "./utils/Options.js";
import Columns from "./main/Columns.js";
import Score from "./main/Score.js";
import DrawEngine from "./engines/DrawEngine.js";
import PhysEngine from "./engines/PhysEngine.js";
import Sounds from "./utils/Sounds.js";

export default class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.context = canvas.getContext("2d");
        this.drawEngine = new DrawEngine(this.context);
        this.frameId = 0;
        this.storedScore = localStorage.getItem('max_score') ? localStorage.getItem('max_score') : 0;
        this.score = new Score(this.storedScore, this.context);
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
        this.speed = globalOptions.speedIndex;
        this.loadGameAssets().then(([background, fish, columns, menu, impactSound, scoreGainedSound, gameTheme]) => {
            this.background.img = background;
            this.fish.img = fish;
            this.columns.img = columns;
            this.score.img = menu;
            this.sounds.impactSound = impactSound;
            this.sounds.scoreGained = scoreGainedSound;
            this.sounds.gameTheme = gameTheme;
            this.sounds.playGameTheme();
            this.background.setScaleFactors();
            this.fish.drown();
            this.render();
        })
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
        this.drawEngine.drawBackground(this.background.img, this.backgroundX);
        this.physEngine.moveFish(this.fish);
        this.drawEngine.drawFish(this.fish, this.frameId);
        this.columns.createColumns();
        this.drawEngine.drawColumns(this.columnsArray, this.columns.img);
        this.checkCollision();

        if (!this.isLost && this.checkFishPassed()) {
            this.score.scoreIncrease();
            this.sounds.scoreGained.play();
            this.increaseGameDifficulty();
        };

        
        this.drawEngine.displayScore(this.score);

        if (this.columnsArray.length > 0) this.columns.moveColumns();

        this.request = window.requestAnimationFrame(this.render.bind(this));

        if (this.isLost) {
            this.sounds.impactSound.play();
            this.sounds.gameTheme.pause();
            window.cancelAnimationFrame(this.request);
            this.drawEngine.drawButton(this.score.img, globalOptions.menuAssets.restartButton, this.canvas);
            this.canvas.addEventListener('mousedown', this.resetGameListener)
        }
    }

    newGame() {
        this.canvas.removeEventListener('mousedown', this.resetGameListener);
        this.gameStart();
    }

    resetGame() {
        this.fish = new Fish();
        this.physEngine = new PhysEngine();
        this.columns = new Columns();
        this.background = new Background();
        this.score.resetScore();
        this.sounds = new Sounds();
        this.columnsArray = this.columns.columns;
    }

    checkCollision() {
        const fishTop = this.fish.y;
        const fishBottom = this.fish.y + globalOptions.fish.height;
        const fishLeft = globalOptions.fish.x;
        const fishRight = globalOptions.fish.x + globalOptions.fish.width;

        if ((this.fish.y + globalOptions.fish.height) >= this.canvas.height) {
            this.isLost = true;
        }

        for (let i = 0; i < this.columnsArray.length; i++) {
            const columnLeft = this.columnsArray[i].x;
            const columnRight = this.columnsArray[i].x + globalOptions.columns.width;
            const topColumnTop = 0;
            const topColumnBottom = this.columnsArray[i].topColdHeight;
            const bottomColumnTop = globalOptions.canvas.height - this.columnsArray[i].bottomColdHeight;
            const bottomColumnBottom = globalOptions.canvas.height;

            if (fishRight > columnLeft &&
                fishLeft < columnRight &&
                fishTop < topColumnBottom &&
                fishBottom > topColumnTop) {
                this.isLost = true;
            }

            if (fishRight > columnLeft &&
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
        for (let i = 0; i < this.columnsArray.length; i++) {

            if (!this.columnsArray[i].passed) {
                if (fishRight > this.columnsArray[i].x) {
                    const columnMiddle = this.columnsArray[i].x + (globalOptions.columns.width / 2);
                    if (fishRight > columnMiddle) {
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

    loadGameAssets() {
        const backgroundPromise = globalOptions.loadImgAsset(globalOptions.background.src);
        const fishPromise = globalOptions.loadImgAsset(globalOptions.fish.src);
        const columnsPromise = globalOptions.loadImgAsset(globalOptions.columns.src);
        const menuPromise = globalOptions.loadImgAsset(globalOptions.menuAssets.src);
        const impactSoundPromise = globalOptions.loadAudioAsset(globalOptions.sounds.impactSound.src);
        const scoreGainedPromise = globalOptions.loadAudioAsset(globalOptions.sounds.scoreGained.src);
        const gameThemePromise = globalOptions.loadAudioAsset(globalOptions.sounds.gameTheme.src);

        return Promise.all([backgroundPromise, fishPromise, columnsPromise, menuPromise, impactSoundPromise, scoreGainedPromise, gameThemePromise])
    }

    createLoadScreen() {
        const startButtonImage = new Image();
        startButtonImage.src = globalOptions.menuAssets.src;

        startButtonImage.onload = () => {
            this.drawEngine.drawButton(startButtonImage, globalOptions.menuAssets.startButton, this.canvas);
        }
    }

    increaseGameDifficulty() {
        if (this.score.score === 10) {
            this.columns.columnCreationPeriod -= 100;
        }
        if (this.score.score === 20) {
            this.columns.columnCreationPeriod -= 100;
        }
        if (this.score.score === 50) {
            this.columns.columnCreationPeriod -= 100;
        }
    }

    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

}