import Canvas from './Canvas.js';
import Background from './Background.js';

const canvas = document.getElementById('canvas');

const newCanvas = new Canvas(canvas, 650, 500);
const background = new Background(".assets/background.png", 4847, 1584);
console.log(background);
newCanvas.setCanvasDimentions()

const context = canvas.getContext('2d');

context.drawImage(backgroundImage, 0, 0);