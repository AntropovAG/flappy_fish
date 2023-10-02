import { globalOptions } from "./Options.js";

export default class Canvas {
    constructor(canvas, width, height) {
        this.canvas = canvas;
        this.width = width;
        this.height = height;
        this.globalOptions = globalOptions;
    }

    setCanvasDimentions() {
        this.globalOptions.canvas.width = this.width;
        this.globalOptions.canvas.height = this.height;
    }

}