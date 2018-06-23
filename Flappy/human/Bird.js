const BIRDWIDTH = 20;
const BIRDHEIGHT = 20;
const BIRDXV = 2;
const GRAVITY = .5;
const BIRDMAXYV = 4;
const BIRDJUMPV = -10;
const BIRDDEATHCOLOR = '0x7c0a02';

class Bird extends PIXI.Sprite {
    constructor(x, y, color) {
        super(PIXI.Texture.WHITE)
        if (color != undefined) this.tint = color;
        this.x = x;
        this.y = y;
        this.width = BIRDWIDTH;
        this.height = BIRDHEIGHT;
        this.xv = BIRDXV;
        this.yv = 0;
        this.alive = true;
        this.walls_passed = 0;
        this.steps_taken = 0;
    }
    get_dist_from_target_wall(target_wall) {
        let gap_bottom = target_wall.get_gap_bottom();
        let h_dist = (target_wall.x + target_wall.width) - (this.x);
        let v_dist = (gap_bottom.y) - (this.y + this.height);
        return {
            "x": h_dist,
            "y": v_dist
        };
    }
    pass_wall() {
        ++this.walls_passed;
    }
    step() {
        this.x += this.xv;
        if (this.yv <= BIRDMAXYV) {
            this.yv += GRAVITY;
        } else {
            this.yv = BIRDMAXYV;
        }
        this.y += this.yv;
        ++this.steps_taken;
    }
    kill() {
        this.alive = false;
        this.tint = BIRDDEATHCOLOR;
        play_sound("game-over");
    }
    jump() {
        this.yv = BIRDJUMPV;
        play_sound("bird-jump");
    }
}
