// create application canvas
const app = new PIXI.Application(APPWIDTH, APPHEIGHT, {
  backgroundColor: BACKGROUNDCOLOR
});
document.getElementsByClassName("container-game")[0].appendChild(app.view);

// set up game stage
let game_stage = new PIXI.Container();
game_stage.width = SIMWIDTH;
game_stage.height = SIMHEIGHT;
game_stage.x = app.renderer.width / 2;
game_stage.y = 0;
app.stage.addChild(game_stage);

// set up info stage
let info_stage = new PIXI.Container();
info_stage.width = INFOWIDTH;
info_stage.height = INFOHEIGHT;
info_stage.x = 0;
info_stage.y = SIMHEIGHT;
let info_bg = new PIXI.Sprite(PIXI.Texture.WHITE);
info_bg.width = INFOWIDTH;
info_bg.height = INFOHEIGHT;
info_bg.tint = INFOBGCOLOR;
info_stage.addChild(info_bg);
app.stage.addChild(info_stage);

// load random colors and init neural nets
let set_colors = [];
let neural_nets = [];
for (let i = 0; i < BIRDCOUNT; ++i) {
  neural_nets[i] = new BirdNeuralNetwork(i);
  set_colors[i] = get_random_hex_color();
}

// key set
let rkey = keyboard(82);
let spacekey = keyboard(32);

// globals
let bird = null;
let target_marker = null;
let wall_man = new WallManager(game_stage);
let bird_man = new BirdManager(game_stage);
let other_man = new ObjectManager(game_stage);
let target_wall = null;
let score = 0;
let generation = 0;
let history = [];

init();

function init() {
  init_table();
  app.ticker.add(delta => step(delta));
  app.ticker.start();

  //spacekey.press = () => bird.jump();
  rkey.press = () => reset();

  for (let i = 0; i < BIRDCOUNT; ++i) {
    bird_man.add(10, SIMHEIGHT / 2, set_colors[i], neural_nets[i]);
  }

  game_stage.pivot.x = CAMERAOFFSET;
  add_initial_walls();
  target_wall = wall_man.get(0);

  init_marker();
  other_man.add(target_marker);

  if (target_wall) {
    set_target_marker_pos(target_wall);
  }

  score = 0;
  update_text();
}

// game loop
function step(delta) {
  // if all birds are dead then do stuff
  if (!bird_man.has_living_bird()) {
    do_on_dead_birds();
    return;
  }

  // all birds step
  bird_man.step_all();

  // pans stage
  game_stage.pivot.x += BIRDXV;

  // adds wall if reach set distance interval
  step_add_walls();

  // remove the leftmost wall if not on stage
  let wall = wall_man.get(0);
  if (wall && !is_on_stage(game_stage, wall) && wall_man.size() > 1) {
    wall_man.remove(0);
  }

  /* checks if any bird is off stage or crashing into the nearest wall or passes a wall */
  let target_passed = false; // used to move target marker later
  for (let i = 0; i < bird_man.size(); ++i) {
    let bird = bird_man.get(i);
    if (!bird.alive) continue;

    // checks if bird hits ground or target wall (dies)
    if (check_bird_fatal(bird)) {
      bird.kill();
      if (target_wall) {
        bird.fitness -= get_fitness_penalty(bird);
      }
      if (!bird_man.has_living_bird()) return;
    }

    // checks if bird passes target wall (+score)
    if (target_wall && bird.x > target_wall.x + target_wall.width) {
      target_passed = true;
      bird.pass_wall();
    }
  }

  // moves the target marker to next target wall
  if (!target_wall || target_passed) {
    let bird = bird_man.get_living_bird();
    target_wall = get_next_object_ahead(bird, wall_man.get_all());

    if (target_wall) {
      set_target_marker_pos(target_wall);
    }
  }

  if (target_passed) {
    ++score;
    update_text();
    play_sound("bird-score");
  }

  // use bird's neural network to determine actions
  for (let i = 0; i < bird_man.size(); ++i) {
    let bird = bird_man.get(i);
    if (!bird.alive) continue;
    bird_predict_act(bird);
  }
}

function bird_predict_act(bird) {
  let nn = bird.brain;
  let alpha = nn.predict(bird.yv, bird.get_dist_from_target_wall(target_wall));
  if (alpha > 0.5) bird.jump();
}

// resets the stage
function reset() {
  stop_all_sounds();
  update_history();
  evolve_birds();

  ++generation;
  update_text();

  wall_man.clear();
  bird_man.clear();
  other_man.clear();

  reset_ticker();
  unbind_keys();

  init();
}

function evolve_birds() {
  function compare(a, b) {
    return b.fitness - a.fitness;
  }

  let kill_cutoff = 0.8;
  let untouched_cutoff = 0.25;

  let birds = bird_man.get_all();
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
    let bird = birds[i];
    let partner_index = Math.floor(Math.random() * mating_pool.length);
    let partner = mating_pool[partner_index];

    let new_brain = bird.cross_over(partner);
    console.log("made babies with " + mating_pool[partner_index].brain.index);

    let index = bird.brain.index;
    neural_nets[index] = new_brain;
    bird.brain = neural_nets[index];
  }

  // mutation
  for (let i = 0; i < birds.length * kill_cutoff; ++i) {
    let bird = birds[i];
    // stronger mutation for weaker birds
    for (let t = 0; t < (i / birds.length) * 50; ++t) bird.mutate;
  }

  // kill off the weak
  for (let i = Math.floor(birds.length * kill_cutoff); i < birds.length; ++i) {
    let bird = birds[i];
    let index = bird.brain.index;
    let new_brain = new BirdNeuralNetwork(index);
    neural_nets[index] = new_brain;
    bird.brain = neural_nets[index];
  }
}

function add_initial_walls() {
  let end_of_stage = game_stage.pivot.x + game_stage.x + WALLINITIALX;
  for (let i = WALLINITIALX; i <= end_of_stage; i += WALLXINTERVAL) {
    let rando = get_random_gap();
    wall_man.add(i, rando);
  }
}

function init_marker() {
  target_marker = new PIXI.Graphics();
  target_marker.beginFill(0x0000ff);
  target_marker.drawRect(0, 0, 8, 8);
}

function check_bird_fatal(bird) {
  let bird_collides_with_wall =
    target_wall && target_wall.collidesWithObj(bird);
  let bird_hit_ground = bird.y + bird.height > SIMHEIGHT;
  let bird_hit_roof = bird.y < 0;
  return bird_collides_with_wall || bird_hit_ground || bird_hit_roof;
}

function step_add_walls() {
  let end_of_stage = game_stage.pivot.x + game_stage.x + WALLINITIALX;
  if (end_of_stage % WALLXINTERVAL == 0) {
    let adjusted_x = end_of_stage + (WALLINITIALX - WALLXINTERVAL);
    let rando = get_random_gap();
    wall_man.add(adjusted_x, rando);
  }
}

function set_target_marker_pos(target_wall) {
  let centered_pos = get_centered_pos(
    target_marker,
    target_wall.get_gap_bottom()
  );
  target_marker.x = centered_pos.x - target_wall.width / 2;
  target_marker.y = centered_pos.y - WALLGAPHEIGHT / 2;
}

// runs when all birds dead
function do_on_dead_birds() {
  spacekey.press = null;
  reset();
}

function update_history() {
  let birds = bird_man.get_all();
  history[generation] = [];
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
      color: bird.color,
      input_weights: iw,
      output_weights: ow
    };
    history[generation][i] = bird_data;
  }
}

function reset_ticker() {
  app.ticker.stop();
  app.ticker = new PIXI.ticker.Ticker();
}

function unbind_keys() {
  spacekey.press = null;
  rkey.press = null;
}

// sets the store in the html
function update_text() {
  let score_elem = document.getElementById("score");
  score_elem.innerText = score;
  let generation_elem = document.getElementById("generation");
  generation_elem.innerText = generation;
}

function get_fitness_penalty(bird) {
  let fitness_penalty =
    (bird.get_dist_from_target_wall(target_wall).x - target_wall.width) /
    WALLXINTERVAL;
  fitness_penalty += bird.get_dist_from_target_wall(target_wall).y / SIMHEIGHT;
  return fitness_penalty;
}

// gets first object in array that is in front of object in terms of x and width
function get_next_object_ahead(object, array) {
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
function get_random_gap() {
  return WALLGAPHEIGHT + 10 + Math.random() * (SIMHEIGHT - WALLGAPHEIGHT - 10);
}

function init_table() {
  /*
  let table = `
  <table border="1" style="table-layout: fixed">
  <thead>
  <tr>
    <th>Bird</th>`;
  for (let i = 0; i < generation; ++i) {
    table += `<th>Gen ${i}</th>`;
  }
  table += `</tr></thead>`;

  table += "<tbody>";
  for (let i = 0; i < BIRDCOUNT; ++i) {
    table += "<tr>";
    table += `<td>${i}</td>`;

    for (let g = 0; g < generation; ++g) {
      let s_bird = history[g][i];
      let iwval = s_bird.input_weights.toString();
      let owval = s_bird.output_weights.toString();
      let iwlen = s_bird.input_weights.length;
      let owlen = s_bird.output_weights.length;
      if (g > 0 && s_bird.fitness > 0 && history[g - 1][i].fitness > 0) {
        iwval = "";
        owval = "";
        ps_bird = history[g - 1][i];
        for (let j = 0; j < iwlen; ++j) {
          if (s_bird.input_weights[j] > ps_bird.input_weights[j]) {
            iwval +=
              "<span style='background-color: green'>" +
              s_bird.input_weights[j] +
              "</span>";
          } else if (s_bird.input_weights[j] < ps_bird.input_weights[j]) {
            iwval +=
              "<span style='background-color: red'>" +
              s_bird.input_weights[j] +
              "</span>";
          } else {
            iwval += s_bird.input_weights[j];
          }
        }
        for (let j = 0; j < owlen; ++j) {
          if (s_bird.output_weights[j] > ps_bird.output_weights[j]) {
            owval +=
              "<span style='background-color: green'>" +
              s_bird.output_weights[j] +
              "</span>";
          } else if (s_bird.output_weights[j] < ps_bird.output_weights[j]) {
            owval +=
              "<span style='background-color: red'>" +
              s_bird.output_weights[j] +
              "</span>";
          } else {
            owval += s_bird.output_weights[j];
          }
          if (j > 0 && j % 4 == 0) owval += "<br/>";
        }
      }
      let fitness = history[g][i].fitness;
      let fitness_color = "white";
      if (fitness > 0) fitness_color = "green";
      else if (g > 0 && history[g - 1][i].fitness > 0) fitness_color = "red";
      table += `
      <td>
        color: <font color='${history[g][i].color}'>██████</font><br/>
        fitness: <span style='background-color: ${fitness_color}'>${fitness}</span><br/>
        iw: ${iwval}<br/>
        ow: ${owval}<br/>
      </td>
    `;
    }
    table += "</tr>";
  }
  table += "</tbody></table>";

  let table_holder = document.getElementById("table-holder");
  table_holder.innerHTML = table;
  */
}
