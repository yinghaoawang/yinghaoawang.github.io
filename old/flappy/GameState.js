class GameState extends State {
  constructor() {
    super();
  }
  on_enter() {
    // set up main container
    this.game_container = new PIXI.Container();
    app.stage.addChild(this.game_container);

    // game state
    this.is_paused = false;
    this.is_muted = false;

    // set up simulation stage
    this.sim_stage = new PIXI.Container();
    this.sim_stage.width = SIMWIDTH;
    this.sim_stage.height = SIMHEIGHT;
    this.game_container.addChild(this.sim_stage);
    this.sim_stage.x = app.renderer.width / 2;
    this.sim_stage.y = 0;

    // globals
    this.target_marker = null;
    this.target_wall = null;
    this.wall_man = new WallManager(this.sim_stage);
    this.bird_man = new BirdManager(this.sim_stage);
    this.other_man = new ObjectManager(this.sim_stage);
    this.score = 0;
    this.generation = 1;
    this.history = [];

    // load random colors and init neural nets
    this.set_colors = [];
    this.neural_nets = [];
    for (let i = 0; i < BIRDCOUNT; ++i) {
      this.neural_nets[i] = new BirdNeuralNetwork(i);
      this.set_colors[i] = get_random_hex_color();
    }

    // set up info stage
    this.info_stage = new PIXI.Container();
    this.info_table = null;
    this.init_info_stage();

    this.init();
  }
  
  on_exit() {
    this.target_marker = null;
    this.target_wall = null;
    this.wall_man = null;
    this.bird_man = null;
    this.other_man = null;
    if (this.bird_man) this.bird_man.clear();
    if (this.wall_man) this.wall_man.clear();
    if (this.other_man) this.other_man.clear();
    this.score = 0;
    this.generation = 1;
    this.history = [];
    this.unbind_keys();
    app.stage.removeChild(this.game_container);
  }

  update() {
    if (!this.is_paused) this.step();
  }

  init() {
    rkey.press = () => this.reset();
    pkey.press = () => this.pause();
    esckey.press = () => this.pause();
    mkey.press = () => this.toggle_mute();

    for (let i = 0; i < BIRDCOUNT; ++i) {
      this.bird_man.add(
        10,
        SIMHEIGHT / 2,
        this.set_colors[i],
        this.neural_nets[i]
      );
    }

    this.sim_stage.pivot.x = CAMERAOFFSET;
    this.add_initial_walls();
    this.target_wall = this.wall_man.get(0);

    this.init_marker();
    this.other_man.add(this.target_marker);

    if (this.target_wall) {
      this.set_target_marker_pos(this.target_wall);
    }

    this.score = 0;
    this.update_text();
  }

  // game loop
  step() {
    // if all birds are dead then do stuff
    if (!this.bird_man.has_living_bird()) {
      this.do_on_dead_birds();
      return;
    }

    // all birds step
    this.bird_man.step_all();

    // pans stage
    this.sim_stage.pivot.x += BIRDXV;

    // adds wall if reach set distance interval
    this.step_add_walls();

    // remove the leftmost wall if not on stage
    let wall = this.wall_man.get(0);
    if (
      wall &&
      !is_on_stage(this.sim_stage, wall) &&
      this.wall_man.size() > 1
    ) {
      this.wall_man.remove(0);
    }

    /* checks if any bird is off stage or crashing into the nearest wall or passes a wall */
    let target_passed = false; // used to move target marker later
    for (let i = 0; i < this.bird_man.size(); ++i) {
      let bird = this.bird_man.get(i);
      if (!bird.alive) continue;
      bird.fitness += 0.005;

      // checks if bird hits ground or target wall (dies)
      if (this.check_bird_fatal(bird)) {
        bird.kill();
        if (this.target_wall) {
          bird.fitness -= this.get_fitness_penalty(bird);
        }
        if (!this.bird_man.has_living_bird()) return;
      }

      // checks if bird passes target wall (+score)
      if (
        this.target_wall &&
        bird.x > this.target_wall.x + this.target_wall.width
      ) {
        target_passed = true;
        bird.pass_wall();
        if (!this.is_muted) sounds['bird-score'].play();
      }
    }

    // moves the target marker to next target wall
    if (!this.target_wall || target_passed) {
      let bird = this.bird_man.get_living_bird();
      this.target_wall = this.get_next_object_ahead(
        bird,
        this.wall_man.get_all()
      );

      if (this.target_wall) {
        this.set_target_marker_pos(this.target_wall);
      }
    }

    if (target_passed) {
      ++this.score;
      this.update_text();
      //play_sound("bird-score");
    }

    // use bird's neural network to determine actions
    for (let i = 0; i < this.bird_man.size(); ++i) {
      let bird = this.bird_man.get(i);
      if (!bird.alive) continue;
      this.bird_nn_step(bird);
    }

    let current_data = this.get_current_data();
    this.info_table.update_gen(this.generation, current_data);
  }

  get_current_data() {
    let res = [];
    let birds = this.bird_man.get_all();
    for (let i = 0; i < birds.length; ++i) {
      let bird = birds[i];
      res[i] = {
        fitness: bird.fitness,
        score: bird.score
      };
    }
    return res;
  }

  bird_nn_step(bird) {
    let nn = bird.brain;
    let alpha = nn.predict(
      bird.yv,
      bird.get_dist_from_target_wall(this.target_wall)
    );
    if (alpha > 0.5) {
      bird.jump();
    }
  }

  // completely removes everything and reinits everything from scratch
  hard_reset() {
    this.on_exit();
    this.on_enter();
  }

  // resets the stage (neural nets, etc. stay)
  reset() {
    stop_all_sounds();
    this.update_history();
    this.evolve_birds();

    ++this.generation;
    this.update_text();

    this.wall_man.clear();
    this.bird_man.clear();
    this.other_man.clear();

    this.reset_ticker();
    this.unbind_keys();

    this.init();
  }

  evolve_birds() {
    function compare(a, b) {
      return b.fitness - a.fitness;
    }

    let kill_cutoff = 0.8;
    let untouched_cutoff = 0.25;

    let birds = this.bird_man.get_all();
    birds.sort(compare);

    // selection
    let mating_pool = [];
    for (let i = 0; i < birds.length; ++i) {
      let bird = birds[i];
      for (let f = 0; f < bird.fitness; ++f) mating_pool.push(bird);

      if (bird.fitness <= 0 && i < birds.length * 0.5) {
        mating_pool.push(bird);
      }
    }

    // crossover
    for (
      let i = birds.length * untouched_cutoff;
      i < birds.length * kill_cutoff;
      ++i
    ) {
      let bird = birds[Math.floor(i)];
      let partner_index = Math.floor(Math.random() * mating_pool.length);
      let partner = mating_pool[partner_index];

      let new_brain = bird.cross_over(partner);
      //console.log("made babies with " + mating_pool[partner_index].brain.index);

      let index = bird.brain.index;
      this.neural_nets[index] = new_brain;
      bird.brain = this.neural_nets[index];
    }

    // mutation
    for (let i = 0; i < birds.length * kill_cutoff; ++i) {
      let bird = birds[i];
      // stronger mutation for weaker birds
      for (let t = 0; t < (i / birds.length) * 50; ++t) bird.mutate;
    }

    // kill off the weak
    for (
      let i = Math.floor(birds.length * kill_cutoff);
      i < birds.length;
      ++i
    ) {
      let bird = birds[i];
      let index = bird.brain.index;
      let new_brain = new BirdNeuralNetwork(index);
      this.neural_nets[index] = new_brain;
      bird.brain = this.neural_nets[index];
    }
  }

  
  pause() {
    pkey.press = () => this.resume();
    esckey.press = () => this.resume();

    let pause_menu = new PauseMenu(APPWIDTH, APPHEIGHT);
    pause_menu.delete_on_resume = true;
    // BAD CODE
    pause_menu.resume_button.pointerdown = this.resume.bind(this);
    pause_menu.reset_button.pointerdown = () => {
      this.reset();
      this.resume();
    };
    pause_menu.hard_reset_button.pointerdown = this.hard_reset.bind(this);
    // SUPER BAD CODE BAD BAD BAD
    pause_menu.mm_button.pointerdown = () => {
      state_machine.pop();
      state_machine.push(main_menu_state);
      main_menu_state.set_start_function(main_menu_link_fn);
    }
    this.game_container.addChild(pause_menu);
    this.is_paused = true;
  }

  resume() {
    // delete all gray backgrounds
    for (let i = 0; i < this.game_container.children.length; ++i) {
      let obj = this.game_container.children[i];
      if (obj.delete_on_resume === true) {
        this.game_container.removeChildAt(i);
        --i;
      }
    }
    pkey.press = () => this.pause();
    esckey.press = () => this.pause();
    this.is_paused = false;
  }

  toggle_mute() {
    this.is_muted = !this.is_muted;
  }

  add_initial_walls() {
    let end_of_stage =
      this.sim_stage.pivot.x + this.sim_stage.x + WALLINITIALX;
    for (let i = WALLINITIALX; i <= end_of_stage; i += WALLXINTERVAL) {
      let rando = this.get_random_gap();
      this.wall_man.add(i, rando);
    }
  }

  init_marker() {
    this.target_marker = new PIXI.Graphics();
    this.target_marker.beginFill(0x0000ff);
    this.target_marker.drawRect(0, 0, 8, 8);
  }

  check_bird_fatal(bird) {
    let bird_collides_with_wall =
      this.target_wall && this.target_wall.collidesWithObj(bird);
    let bird_hit_ground = bird.y + bird.height > SIMHEIGHT;
    let bird_hit_roof = bird.y < 0;
    return bird_collides_with_wall || bird_hit_ground || bird_hit_roof;
  }

  step_add_walls() {
    let end_of_stage =
      this.sim_stage.pivot.x + this.sim_stage.x + WALLINITIALX;
    if (end_of_stage % WALLXINTERVAL == 0) {
      let adjusted_x = end_of_stage + (WALLINITIALX - WALLXINTERVAL);
      let rando = this.get_random_gap();
      this.wall_man.add(adjusted_x, rando);
    }
  }

  set_target_marker_pos(target_wall) {
    let centered_pos = get_centered_pos(
      this.target_marker,
      target_wall.get_gap_bottom()
    );
    this.target_marker.x = centered_pos.x - target_wall.width / 2;
    this.target_marker.y = centered_pos.y - WALLGAPHEIGHT / 2;
  }

  // runs when all birds dead
  do_on_dead_birds() {
    this.reset();
  }

  update_history() {
    let birds = this.bird_man.get_all();
    this.history[this.generation] = [];
    for (let i = 0; i < birds.length; ++i) {
      let bird = birds[i];
      let iw = Array.from(bird.brain.input_weights.dataSync());
      let ow = Array.from(bird.brain.output_weights.dataSync());
      let round_fn = e => {
        return Number(e.toFixed(2));
      };
      iw = iw.map(round_fn);
      ow = ow.map(round_fn);
      let bird_data = {
        fitness: round_fn(bird.fitness),
        score: bird.score,
        input_weights: iw,
        output_weights: ow
      };
      this.history[this.generation][i] = bird_data;
    }
  }

  reset_ticker() {
    app.ticker.remove(this.update, this);
    app.ticker.add(this.update, this);
  }

  unbind_keys() {
    rkey.press = null;
    pkey.press = null;
    esckey.press = null;
    mkey.press = null;
  }

  // sets the store in the html
  update_text() {
    let score_elem = document.getElementById("score");
    score_elem.innerText = this.score;
    let generation_elem = document.getElementById("generation");
    generation_elem.innerText = this.generation;
  }

  get_fitness_penalty(bird) {
    let fitness_penalty =
      (bird.get_dist_from_target_wall(this.target_wall).x -
        this.target_wall.width) /
      WALLXINTERVAL;
    fitness_penalty +=
      bird.get_dist_from_target_wall(this.target_wall).y / SIMHEIGHT;
    return fitness_penalty;
  }

  // gets first object in array that is in front of object in terms of x and width
  get_next_object_ahead(object, array) {
    if (object == undefined) {
      console.error("Object does not exist.");
      return null;
    }
    let res = null;
    array.forEach(o => {
      if (res == null && object.x < o.x + o.width) {
        res = o;
      }
    });
    return res;
  }

  // gets y position for a gap for wall creation
  get_random_gap() {
    return (
      WALLGAPHEIGHT + 10 + Math.random() * (SIMHEIGHT - WALLGAPHEIGHT - 10)
    );
  }

  init_info_stage() {
    this.info_stage.width = INFOWIDTH;
    this.info_stage.height = INFOHEIGHT;
    this.info_stage.x = 0;
    this.info_stage.y = SIMHEIGHT;
    let info_bg = new PIXI.Sprite(PIXI.Texture.WHITE);
    info_bg.width = INFOWIDTH;
    info_bg.height = INFOHEIGHT;
    info_bg.tint = INFOBGCOLOR;
    this.info_stage.addChild(info_bg);
    let info_inner_container = new PIXI.Container();
    let iic_padding = 10;
    info_inner_container.x = iic_padding;
    info_inner_container.y = iic_padding;
    let iic_width = INFOWIDTH - 2 * iic_padding;
    let iic_height = INFOHEIGHT - 2 * iic_padding;
    let iic_bg = new PIXI.Sprite(PIXI.Texture.WHITE);
    iic_bg.width = iic_width;
    iic_bg.height = iic_height;
    info_inner_container.addChild(iic_bg);

    this.info_stage.addChild(info_inner_container);

    this.info_table = new BirdInfoTable(iic_width, iic_height, this.set_colors);
    info_inner_container.addChild(this.info_table);

    this.game_container.addChild(this.info_stage);
  }
}
