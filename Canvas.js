export default class Canvas {
    constructor(canvas, width, height) {
        this.canvas = canvas;
        this.width = width;
        this.height = height;
    }

    setCanvasDimentions() {
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    }

}