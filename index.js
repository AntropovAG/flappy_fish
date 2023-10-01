import Game from "./game.js"
import { globalOptions } from "./Options.js";

const canvas = document.getElementById("canvas");
const panel = document.getElementById("panel");
canvas.width = globalOptions.canvas.width;
canvas.height = globalOptions.canvas.height;
panel.width = globalOptions.panel.width;
panel.height = globalOptions.panel.height;

const game = new Game(canvas, panel);

document.addEventListener('keydown', (evt) => {
    if(evt.key === " " || evt.key === "Spacebar") {
        game.sweemUp();
    }
});

game.gameStart();