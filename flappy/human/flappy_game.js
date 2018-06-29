const app = new PIXI.Application(APPWIDTH, APPHEIGHT);
document.getElementsByClassName("container-game")[0].appendChild(app.view);

let rkey = keyboard(82);
let spacekey = keyboard(32);

let bird = null;
let target_marker = null;
let wall_man = new WallManager(app.stage);
let bird_man = new BirdManager(app.stage);
let other_man = new ObjectManager(app.stage);
let target_wall = null;
let score = 0;

app.stage.x = app.renderer.width / 2;

init();

function init() {
  app.ticker.add(delta => step(delta));
  app.ticker.start();

  spacekey.press = () => bird.jump();
  rkey.press = () => reset();

  for (let i = 0; i < BIRDCOUNT; ++i) {
    bird_man.add(10, (APPHEIGHT / 4) + i * 20, get_random_hex_color());
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
  update_score();
}

// game loop
function step(delta) {
  if (!bird_man.has_living_bird()) {
    spacekey.press = null;
    return;
  }
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
      if (!bird_man.has_living_bird()) return;
    }

    // checks if bird passes target wall (+score)
    let is_bird_pass_target_wall =
      target_wall && bird.x > target_wall.x + target_wall.width;
    if (is_bird_pass_target_wall) {
      target_passed = true;
      bird.pass_wall();
      ++score;
      update_score();
      play_sound("bird-score");
    }
  }

  // moves the target marker to next target wall
  if (!target_wall || target_passed) {
    let bird = bird_man.get_living_bird();
    target_wall = get_next_object_ahead(bird, wall_man.get_all());
    if (target_wall) {
      centered_pos = get_centered_pos(
        target_marker,
        target_wall.get_gap_bottom()
      );
      target_marker.x = centered_pos.x;
      target_marker.y = centered_pos.y;
    }
  }

  //if (target_wall) console.log(bird_man.get_living_bird().get_dist_from_target_wall(target_wall));
}

// resets the stage
function reset() {
  stop_all_sounds();
  wall_man.clear();
  bird_man.clear();
  other_man.clear();

  app.ticker.stop();
  app.ticker = new PIXI.ticker.Ticker();
  spacekey.press = null;
  rkey.press = null;

  init();
}

// sets the store in the html
function update_score() {
  let score_elem = document.getElementById("score");
  score_elem.innerText = score;
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