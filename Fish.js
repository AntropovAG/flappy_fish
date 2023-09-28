import Options from "./Options.js";

export default class Fish {
    constructor() {
        this.options = new Options();
        this.img = new Image();
    }

    loadFish() {
        this.img.src = this.options.fish.src;
    }

}