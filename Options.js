export default class Options {
    constructor() {}

    initialize(canvasWidth, canvasHeight) {

    this.canvas = {
        width: canvasWidth,
        height: canvasHeight
    };

    this.canvasFreeSpaceHeight = this.canvas.height * 1/4;
    this.speedIndex = 2;
    this.drownSpeed = 2;


    this.fish = {
        src: './assets/whale.png',
        x: 100,
        y: 160,
        width: (this.canvasFreeSpaceHeight / 5) * 2,
        height: this.canvasFreeSpaceHeight / 5,
        sweemUpHeight: this.canvasFreeSpaceHeight / 2,
        frames: [
            {
                x: 76,
                y: 15,
                width: 1264,
                height: 615
            },
            {
                x: 31,
                y: 630,
                width: 1303,
                height: 584
            },
            {
                x: 22,
                y: 1214,
                width: 1318,
                height: 582
            },
            {
                x: 25,
                y: 1796,
                width: 1323,
                height: 580
            }
        ]
    };

    this.background = {
        src: './assets/background.png',
        x: 0,
        y: 0,
        imgheight: 1584,
        imgwidth: 4847
    };

    this.columns = {
        src: './assets/columns.png',
        speed: 3,
        aspectRatio: this.canvas.height / 728,
        width: this.fish.width * 2,
        height: 200,
        topColumn: {
            x: 334,
            y: 50,
            width: 152,
            height: 728
        },
        bottomColumn: {
            x: 103,
            y: 50,
            width: 152,
            height: 728
        }
    };

    this.menuAssets = {
        src: './assets/menu_assets.png',
        scorePanel: {
            x: 160,
            y: 18,
            width: 995,
            height: 1534
        },
        restartButton: {
            x: 1160,
            y: 316,
            width: 1188,
            height: 577
        }
    }

}

}

let globalOptions = new Options()
export { globalOptions }