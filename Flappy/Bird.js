const BIRDWIDTH = 20;
const BIRDHEIGHT = 20;
const BIRDXV = 2;
const GRAVITY = .8;
const BIRDMAXYV = 90;
//const BIRDJUMPV = -8;
const BIRDJUMPACC = -2;
const BIRDDEATHCOLOR = '0x7c0a02';
const WALLPASSFITNESSMULT = 100;

class Bird extends PIXI.Sprite {
    constructor(x, y, color, brain) {
        super(PIXI.Texture.WHITE)
        if (color != undefined) {
            this.tint = '0x' + color.substring(1);
            this.color = color;
        } else {
            this.color = "#ffffff";
        }
        this.x = x;
        this.y = y;
        this.width = BIRDWIDTH;
        this.height = BIRDHEIGHT;
        this.xv = BIRDXV;
        this.yv = 0;
        this.alive = true;
        this.walls_passed = 0;
        this.steps_taken = 0;
        this.fitness = 0;
        this.brain = brain;
        this.alpha = 1;//.8;
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
        this.fitness += WALLPASSFITNESSMULT;
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
        //this.tint = BIRDDEATHCOLOR;
        //play_sound("game-over");
    }
    jump() {
        //this.yv = BIRDJUMPV;
        this.yv += BIRDJUMPACC;
        //play_sound("bird-jump");
    }

    // for genetics, mutates brain
    mutate() {
        // mutation function
        function fn(x) {
			if (Math.random() < 0.05) {
				let offset = random_gaussian() * 0.5;
                let newx = x + offset;
				return newx;
			}
			return x;
        }
        // mutate input->hidden weights
        let new_ih = this.brain.input_weights.dataSync().map(fn);
        let ih_shape = this.brain.input_weights.shape;
        this.brain.input_weights.dispose();
        this.brain.input_weights = tf.tensor(new_ih, ih_shape);

        // mutate hidden->output weights
        let new_oh = this.brain.output_weights.dataSync().map(fn);
        let oh_shape = this.brain.output_weights.shape;
        this.brain.output_weights.dispose();
        this.brain.output_weights = tf.tensor(new_oh, oh_shape);
    }

    cross_over(partner) {
        console.log(this.brain.input_weights);
        let child_brain = this.brain.clone(this.brain.index);
        for (let i = 0; i < this.brain.input_weights.length; ++i) {
            if (Math.random() < .5) {
                console.log("mutated index: " + i);
                child_brain.input_weights[i] = partner.input_weights[i];
            }
        }
        return child_brain;
    }
}
