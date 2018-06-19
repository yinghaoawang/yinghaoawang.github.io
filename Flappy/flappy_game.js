// consts
const WALLWIDTH = 30;
const WALLGAPHEIGHT = 140;
const WALLXINTERVAL = 300;
const WALLINITIALX = 260;
const APPWIDTH = 800;
const APPHEIGHT = 600;

const app = new PIXI.Application(APPWIDTH, APPHEIGHT);
document.body.appendChild(app.view);
let rkey = keyboard(82),
  spacekey = keyboard(32);

let bird = null;
let target_marker = null;
let wall_man = new WallManager(app.stage);
let target_wall = null;
let stage_objects = [];
app.stage.x = app.renderer.width / 2;

init();

function init() {
  app.ticker.add(delta => step(delta));
  app.ticker.start();

  spacekey.press = () => bird.jump();
  rkey.press = () => reset();

  bird = new Bird(10, APPHEIGHT / 4);
  stage_objects.push(bird);

  app.stage.pivot.x = bird.x + 290;
  let end_of_stage = app.stage.pivot.x + app.stage.x + WALLINITIALX;
  for (
    let i = WALLINITIALX;
    i < end_of_stage - WALLXINTERVAL;
    i += WALLXINTERVAL
  ) {
    let rando = get_random_gap();
    wall_man.add_wall(i, rando);
  }
  target_wall = wall_man.get_wall(0);

  target_marker = new PIXI.Graphics();
  target_marker.beginFill(0x0000ff);
  target_marker.drawRect(0, 0, 5, 5);
  stage_objects.push(target_marker);

  if (target_wall) {
    let centered_pos = get_centered_pos(
      target_marker,
      target_wall.get_gap_bottom()
    );
    target_marker.x = centered_pos.x;
    target_marker.y = centered_pos.y;
  }

  stage_objects.forEach(obj => {
    app.stage.addChild(obj);
  });
}

function get_random_gap() {
  return WALLGAPHEIGHT + 10 + Math.random() * (APPHEIGHT - WALLGAPHEIGHT - 10);
}

function step(delta) {
  if (!bird.alive) {
    return;
  }
  bird.step();
  app.stage.pivot.x = bird.x + 290;

  if (bird.y + bird.height > APPHEIGHT) {
    console.log("dead");
    bird.kill();
    return;
  }

  let end_of_stage = app.stage.pivot.x + app.stage.x - WALLINITIALX;
  if (end_of_stage % WALLXINTERVAL == 0) {
    let rando = get_random_gap();
    wall_man.add_wall(app.stage.pivot.x + app.stage.x, rando);
  }

  let wall = wall_man.get_wall(0);
  if (wall && wall.collidesWithObj(bird)) {
    console.log("dead");
    bird.kill();
    return;
  }
  if (wall && !is_on_stage(app.stage, wall) && wall_man.size() > 1) {
    wall_man.remove_wall(0);
  }

  let is_bird_pass_target_wall =
    target_wall && bird.x > target_wall.x + target_wall.width;

  if (!target_wall || is_bird_pass_target_wall) {
    target_wall = get_next_object_ahead(bird, wall_man.walls);
    if (target_wall) {
      centered_pos = get_centered_pos(
        target_marker,
        target_wall.get_gap_bottom()
      );
      target_marker.x = centered_pos.x;
      target_marker.y = centered_pos.y;
    }
  }
}

function get_next_object_ahead(object, array) {
  let res = null;
  array.forEach(o => {
    if (res == null && object.x < o.x + o.width) {
      res = o;
    }
  });
  return res;
}

function reset() {
  for (let i = 0; i < stage_objects.length; ++i) {
    let obj = stage_objects[i];
    app.stage.removeChild(obj);
    stage_objects.splice(i, 1);
    obj = null;
    --i;
  }
  wall_man.clear();

  app.ticker.stop();
  app.ticker = null;
  app.ticker = new PIXI.ticker.Ticker();
  spacekey.press = null;
  rkey.press = null;

  init();
}
