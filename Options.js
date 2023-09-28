export default class Options {
    constructor() {}

    canvas = {
        width: 640,
        height: 406
    }

    speedIndex = 3;

    fish = {
        src: './assets/whale.png',
        x: 100,
        y: 100,
        width: 60,
        height: 30,
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
    }

    // fish = {
    //     src: './assets/fish.png',
    //     x: 100,
    //     y: 150,
    //     frames: [
    //         {
    //             x: 0,
    //             y: 0,
    //             width: 100,
    //             height: 100
    //         },
    //         {
    //             x: 0,
    //             y: 0,
    //             width: 100,
    //             height: 100
    //         },
    //         {
    //             x: 0,
    //             y: 0,
    //             width: 100,
    //             height: 100
    //         },
    //         {
    //             x: 0,
    //             y: 0,
    //             width: 100,
    //             height: 100
    //         },
    //         {
    //             x: 0,
    //             y: 0,
    //             width: 100,
    //             height: 100
    //         },
    //         {
    //             x: 0,
    //             y: 0,
    //             width: 100,
    //             height: 100
    //         },
    //         {
    //             x: 0,
    //             y: 0,
    //             width: 100,
    //             height: 100
    //         }
    //     ]
    // }

    background = {
        src: './assets/background.png',
        x: 0,
        y: 0,
        imgheight: 1584,
        imgwidth: 4847
    }
}