class Bird extends PIXI.Sprite {
    constructor(x, y, color, brain) {
        super(PIXI.Texture.WHITE);
        //super(new PIXI.Texture.fromImage('bird.png'));
        if (color != undefined) {
            this.tint = hash_to_hex(color);
            this.color = color;
        } else {
            this.color = "#ffffff";
        }
        this.x = x;
        this.y = y;
        this.width = BIRDWIDTH;
        this.height = BIRDHEIGHT;
        this.accelerating_jump = ACCELERATING_JUMP;
        this.xv = BIRDXV;
        this.yv = 0;
        this.alive = true;
        this.walls_passed = 0;
        this.steps_taken = 0;
        this.fitness = 0;
        this.score = 0;
        this.brain = brain;
        this.alpha = 1;//.8;
    }
    get_dist_from_target_wall(target_wall) {
        if (target_wall == undefined) {
            console.error("Target wall does not exist.");
            return {
                "x": 0,
                "y": 0
            };
        }
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
        ++this.score;
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
    }
    jump() {
        if (this.accelerating_jump) {
            this.yv += BIRDJUMPACC;
        } else {
            this.yv = BIRDJUMPV;
        }
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

    /* cross over with a partner bird, returns child's brain */
    cross_over(partner) {
        //console.log(this.brain.input_weights);
        let child_brain = this.brain.clone(this.brain.index);
        let ih = this.brain.input_weights.dataSync();
        let partner_ih = partner.brain.input_weights.dataSync();
        for (let i = 0; i < ih.length; ++i) {
            if (Math.random() < .5) {
                ih[i] = partner_ih[i];
            }
        }
        let oh = this.brain.output_weights.dataSync();
        let partner_oh = partner.brain.output_weights.dataSync();
        for (let i = 0; i < oh.length; ++i) {
            if (Math.random() < .5) {
                oh[i] = partner_oh[i];
            }
        }
        child_brain.input_weights.dispose();
        child_brain.output_weights.dispose();
        let ih_shape = child_brain.input_weights.shape;
        let oh_shape = child_brain.output_weights.shape;
        child_brain.input_weights = tf.tensor(ih, ih_shape);
        child_brain.output_weights = tf.tensor(oh, oh_shape);
        return child_brain;
    }
}
