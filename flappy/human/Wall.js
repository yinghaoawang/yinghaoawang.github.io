class Wall extends MultiPart {
    // constructor for the x position and gap starting y position
    constructor(x, gy) {
        super(x, 0);
        this.topwall = new PIXI.Sprite(PIXI.Texture.WHITE);
        this.bottomwall = new PIXI.Sprite(PIXI.Texture.WHITE);

        this.topwall.tint = WALLCOLOR;
        this.bottomwall.tint = WALLCOLOR;

        this.parts.push(this.topwall);
        this.parts.push(this.bottomwall);

        this.topwall.x = 0;
        this.topwall.y = 0;
        this.topwall.width = WALLWIDTH;
        this.topwall.height = gy - WALLGAPHEIGHT;

        this.bottomwall.x = 0;
        this.bottomwall.y = gy;
        this.bottomwall.width = WALLWIDTH;
        this.bottomwall.height = APPHEIGHT - gy;
        this.addChild(this.topwall);
        this.addChild(this.bottomwall);
    }

    /* Returns x and y coords of the top of the gap, where the gap ends */
    get_gap_top() {
        return {
            "x": this.topwall.x + this.x +this.topwall.width,
            "y": this.topwall.y + this.y + this.topwall.height
        };
    }

    /* Returns x and y coords of the bottom of the gap, where the gap ends */
    get_gap_bottom() {
        return {
            "x": this.bottomwall.x + this.x + this.bottomwall.width,
            "y": this.bottomwall.y + this.y
        }
    }
}