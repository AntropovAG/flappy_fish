import Game from "./game.js"
import Options from "./Options.js";

const options = new Options();
const canvas = document.getElementById("canvas");
canvas.width = options.canvas.width;
canvas.height = options.canvas.height;
const game = new Game(canvas);

document.addEventListener('keydown', (evt) => {
    if(evt.key === " " || evt.key === "Spacebar") {
        game.sweemUp();
    }
});

game.gameStart();