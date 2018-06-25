// consts
const WALLXINTERVAL = 120;
const WALLINITIALX = 150;
const APPWIDTH = 800;
const APPHEIGHT = 600;
const BIRDCOUNT = 8;
const BACKGROUNDCOLOR = 0xefefef;
const WALLDISTMULT = 0.1;

// create application canvas
const app = new PIXI.Application(APPWIDTH, APPHEIGHT, {
  backgroundColor: BACKGROUNDCOLOR
});
document.getElementsByClassName("container-game")[0].appendChild(app.view);

// needed for proper panning
app.stage.x = app.renderer.width / 2;

// globals
let rkey = keyboard(82);
let spacekey = keyboard(32);

let bird = null;
let target_marker = null;
let wall_man = new WallManager(app.stage);
let bird_man = new BirdManager(app.stage);
let other_man = new ObjectManager(app.stage);
let target_wall = null;
let second_target_wall = null;
let score = 0;
let generation = 0;
let use_ai = true;

// neural nets array
let nns = [];
let set_colors = [];
for (let i = 0; i < BIRDCOUNT; ++i) {
  nns[i] = new BirdNeuralNetwork(i);
  set_colors[i] = get_random_hex_color();
}

let history = [];

init();

function init() {
  init_table();
  app.ticker.add(delta => step(delta));
  app.ticker.start();

  //spacekey.press = () => bird.jump();
  rkey.press = () => reset();

  for (let i = 0; i < BIRDCOUNT; ++i) {
    bird_man.add(10, APPHEIGHT / 2, set_colors[i], nns[i]);
  }

  let bird = bird_man.get(0);

  app.stage.pivot.x = bird.x + 290;
  let end_of_stage = app.stage.pivot.x + app.stage.x + WALLINITIALX;
  for (
    let i = WALLINITIALX;
    i < end_of_stage - WALLXINTERVAL;
    i += WALLXINTERVAL
  ) {
    let rando = get_random_gap();
    wall_man.add(i, rando);
  }
  target_wall = wall_man.get(0);
  second_target_wall = wall_man.get(1);

  target_marker = new PIXI.Graphics();
  target_marker.beginFill(0x0000ff);
  target_marker.drawRect(0, 0, 5, 5);
  other_man.add(target_marker);

  if (target_wall) {
    let centered_pos = get_centered_pos(
      target_marker,
      target_wall.get_gap_bottom()
    );
    target_marker.x = centered_pos.x;
    target_marker.y = centered_pos.y;
  }

  score = 0;
  update_text();
}

function evolve_birds() {
  function compare(a, b) {
    return b.fitness - a.fitness;
  }

  let birds = bird_man.get_all();
  birds.sort(compare);
  let cutoff1 = Math.floor(birds.length * 0.33);
  let cutoff2 = Math.floor(birds.length * 0.9);

  // mutate the best birds (keep best untouched)
  for (let i = 1; i < cutoff1; ++i) {
    let bird = birds[i];
    bird.mutate();
  }

  // copy the best bird brains for intermediate birds, then mutate again
  for (let i = cutoff1; i < cutoff2; ++i) {
    let bb_index = Math.floor(0 + (i - cutoff1) * 0.5);
    let better_bird = birds[bb_index];

    let bird = birds[i];

    let new_brain = bird.cross_over(better_bird);
    
    let index = bird.brain.index;
    nns[index] = new_brain; //better_bird.brain.clone(index);
    bird.brain = nns[index];
    /*
    for (let i = 0; i < 50; ++i) bird.mutate();
    */
  }

  // fresh brains for dumb birds
  for (let i = cutoff2; i < birds.length; ++i) {
    let bird = birds[i];
    if (bird.fitness > 0) continue;
    let index = bird.brain.index;
    nns[index].dispose();
    nns[index] = new BirdNeuralNetwork(index);
  }
}

// game loop
function step(delta) {
  // if all birds are dead then evolve brains and reset stage
  if (!bird_man.has_living_bird()) {
    do_on_dead_birds();
    return;
  }

  // move birds and stage
  bird_man.step_all();
  pan_stage();

  // adds wall if reach set distance interval
  let end_of_stage = app.stage.pivot.x + app.stage.x - WALLINITIALX;
  if (end_of_stage % WALLXINTERVAL == 0) {
    let rando = get_random_gap();
    wall_man.add(app.stage.pivot.x + app.stage.x, rando);
  }

  // remove the leftmost wall if not on stage
  let wall = wall_man.get(0);
  if (wall && !is_on_stage(app.stage, wall) && wall_man.size() > 1) {
    wall_man.remove(0);
  }

  /* checks if any bird is off stage or crashing into the nearest wall or passes a wall */
  let target_passed = false; // used to move target marker later
  for (let i = 0; i < bird_man.size(); ++i) {
    let bird = bird_man.get(i);
    if (!bird.alive) continue;

    // checks if bird hits ground or target wall (dies)
    let bird_collides_with_wall =
      target_wall && target_wall.collidesWithObj(bird);
    let bird_hit_ground = bird.y + bird.height > APPHEIGHT;
    let bird_hit_roof = bird.y < 0;
    if (bird_collides_with_wall || bird_hit_ground || bird_hit_roof) {
      bird.kill();
      let fitness_penalty = get_dist_x_y(
        bird.get_dist_from_target_wall(target_wall)
      );
      bird.fitness -= fitness_penalty * WALLDISTMULT;
      if (!bird_man.has_living_bird()) return;
    }

    // checks if bird passes target wall (+score)
    let is_bird_pass_target_wall =
      target_wall && bird.x > target_wall.x + target_wall.width;
    if (is_bird_pass_target_wall) {
      target_passed = true;
      bird.pass_wall();
    }
  }

  // moves the target marker to next target wall
  if (!target_wall || target_passed) {
    ++score;
    let bird = bird_man.get_living_bird();
    target_wall = get_next_object_ahead(bird, wall_man.get_all());
    second_target_wall = get_next_object_ahead(target_wall, wall_man.get_all());

    if (target_wall) {
      centered_pos = get_centered_pos(
        target_marker,
        target_wall.get_gap_bottom()
      );
      target_marker.x = centered_pos.x;
      target_marker.y = centered_pos.y;
    }
  }

  if (target_passed) {
    //++score;
    update_text();
    play_sound("bird-score");
  }

  if (target_wall && second_target_wall) {
    for (let i = 0; i < bird_man.size(); ++i) {
      let bird = bird_man.get(i);
      if (!bird.alive) continue;
      let nn = bird.brain;
      //let dist_from_ceil = bird.y;
      //let dist_from_floor = APPHEIGHT - (bird.y + bird.height);
      let alpha = nn.predict(
        bird.yv,
        bird.get_dist_from_target_wall(target_wall),
        bird.get_dist_from_target_wall(second_target_wall).y
      );
      if (alpha > 0.5) bird.jump();
    }
  }
}

// runs when all birds dead
function do_on_dead_birds() {
  spacekey.press = null;
  reset();
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

// gets first object in array that is in front of object in terms of x and width
function get_next_object_ahead(object, array) {
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
  return WALLGAPHEIGHT + 10 + Math.random() * (APPHEIGHT - WALLGAPHEIGHT - 10);
}

// make stage follow any living bird
function pan_stage() {
  let bird = bird_man.get_living_bird();
  app.stage.pivot.x = bird.x + 290;
}

function init_table() {
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
}
