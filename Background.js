import Options from "./Options.js";

export default class Background {
    constructor() {
        this.options = new Options();
        this.Img = new Image();
    }

    loadBackground() {
        this.Img.src = this.options.background.src;
    }


}