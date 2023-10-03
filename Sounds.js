export default class Sounds {
    constructor() {
        this.impactSound;
        this.scoreGained;
        this.gameTheme;
    }

    playGameTheme() {
        this.gameTheme.loop = true;
        this.gameTheme.volume = .5;
        this.gameTheme.play();
    }

    

}