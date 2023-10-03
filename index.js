import Game from "./game.js"
import { globalOptions } from "./Options.js";

const canvas = document.getElementById("canvas");
const visibleScreenWidth = document.documentElement.clientWidth;
globalOptions.initialize(visibleScreenWidth, visibleScreenWidth / 2.5);
canvas.width = globalOptions.canvas.width;
canvas.height = globalOptions.canvas.height;

const game = new Game(canvas);

game.createLoadScreen();

const startGame = () => {
    canvas.removeEventListener('mousedown', startGame)
    game.gameStart();
}

document.addEventListener('keydown', (evt) => {
    if (evt.key === " " || evt.key === "Spacebar") {
        game.sweemUp();
    }
});

canvas.addEventListener('click', () => {
    game.sweemUp();
});

canvas.addEventListener('mousedown', startGame);
