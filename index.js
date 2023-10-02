import Game from "./game.js"
import { globalOptions } from "./Options.js";

const canvas = document.getElementById("canvas");
// canvas.width = globalOptions.canvas.width;
// canvas.height = globalOptions.canvas.height;
const visibleScreenWidth = document.documentElement.clientWidth;
canvas.width = visibleScreenWidth - 200;
canvas.height = visibleScreenWidth / 2;
globalOptions.initialize(visibleScreenWidth - 200, visibleScreenWidth / 2);

const game = new Game(canvas);

game.createLoadScreen();

const startGame = () => {
    console.log('startGame_from_index');
    canvas.removeEventListener('mousedown', startGame)
    game.gameStart();
}

document.addEventListener('keydown', (evt) => {
    if(evt.key === " " || evt.key === "Spacebar") {
        game.sweemUp();
    }
});



canvas.addEventListener('mousedown', startGame);
