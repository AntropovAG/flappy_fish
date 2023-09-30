import Options from "./Options.js" 

export default class Columns {
    constructor() {
        this.options = new Options();
        this.img = new Image();
        this.x = 0;
        this.width = this.options.columns.width;
        this.speed = this.options.columns.speed
        this.columns = [];
        this.startTime = Date.now();
    }

    loadColumns() {
        this.img.src = this.options.columns.src;
    }

    createColumns() {
        if ((Date.now() - this.startTime) > 1000) {
            let topColumndHeight = Math.random() * (this.options.canvas.height - this.options.canvasFreeSpaceHeight);
            let topColumnSHeight = topColumndHeight / this.options.columns.aspectRatio;
            
            let bottomColumndHeight = (this.options.canvas.height - this.options.canvasFreeSpaceHeight) - topColumndHeight;
            let bottomColumnSHeight = bottomColumndHeight / this.options.columns.aspectRatio;

            let newColumn = {
                topColsy: this.options.columns.topColumn.height - topColumnSHeight + this.options.columns.topColumn.y,
                topColsHeight: topColumnSHeight,
                topColdHeight: topColumndHeight,

                bottomColsy: this.options.columns.bottomColumn.y,
                bottomColsHeight: bottomColumnSHeight,
                bottomColdHeight: bottomColumndHeight,
            }
            newColumn.x = this.options.canvas.width;
            this.columns.push(newColumn);
            this.startTime = Date.now();
        }

    }
    
    moveColumns() {
        for (let i = this.columns.length - 1; i >= 0; i--){
            this.columns[i].x -= (this.options.columns.width * 4)/145;
            if((this.columns[i].x + this.options.columns.width) < 0) {
                this.columns.shift();
            }
        }
    }


}