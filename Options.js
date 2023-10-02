export default class Options {
    constructor() {}

    canvas = {
        width: 600,
        height: 406
    };

    canvasFreeSpaceHeight = this.canvas.height * 1/4;
    speedIndex = 2;
    drownSpeed = 2;


    fish = {
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

    background = {
        src: './assets/background.png',
        x: 0,
        y: 0,
        imgheight: 1584,
        imgwidth: 4847
    };

    columns = {
        src: './assets/columns.png',
        speed: 3,
        aspectRatio: this.canvas.width / 728,
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

    menuAssets = {
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

let globalOptions = new Options()
export { globalOptions }