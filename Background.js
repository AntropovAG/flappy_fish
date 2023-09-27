export default class Background {
    constructor(imageUrl, width, height) {
        this.imageUrl = imageUrl;
        this.width = width;
        this.height = height;
    }

    createBackground() {
        const backgroundImage = new Image(this.width, this.height);
        backgroundImage.src = this.imageUrl;
    }

}