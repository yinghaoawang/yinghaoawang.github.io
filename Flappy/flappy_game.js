// consts
const WALLWIDTH = 30;
const WALLGAPHEIGHT = 140;
const WALLXINTERVAL = 200;
const WALLINITIALX = 200;
const APPWIDTH = 800;
const APPHEIGHT = 600;

const app = new PIXI.Application(APPWIDTH, APPHEIGHT);
document.body.appendChild(app.view);
let rkey = keyboard(82),
  spacekey = keyboard(32);

let bird = null;
let rect_gfx = null;
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

  bird = new Bird(10, 20);
  stage_objects.push(bird);

  let end_of_stage = APPWIDTH;
  for (let i = WALLINITIALX; i < end_of_stage; i += WALLXINTERVAL) {
    let rando = get_random_gap();
    wall_man.add_wall(i, rando);
  }
  target_wall = wall_man.get_wall(0);

  rect_gfx = new PIXI.Graphics();
  rect_gfx.beginFill(0x0000ff);
  rect_gfx.drawRect(0, 0, 10, 10);
  stage_objects.push(rect_gfx);

  let centered_pos = get_centered_pos(rect_gfx, target_wall.get_gap_bottom());
  rect_gfx.x = centered_pos.x;
  rect_gfx.y = centered_pos.y;

  stage_objects.forEach(obj => {
    app.stage.addChild(obj);
  });
}

function get_random_gap() {
  return WALLGAPHEIGHT + 10 + Math.random() * (APPHEIGHT - WALLGAPHEIGHT - 10);
}

function step(delta) {
  bird.step();
  app.stage.pivot.x = bird.x + 290;
  let rando = get_random_gap();
  if ((app.stage.pivot.x + app.stage.x + WALLINITIALX) % WALLXINTERVAL == 0) {
    wall_man.add_wall(app.stage.pivot.x + app.stage.x, rando);
  }

  let wall = wall_man.get_wall(0);
  if (wall && wall.collidesWithObj(bird)) {
    console.log("dead");
  }
  if (wall && !is_on_stage(app.stage, wall)) {
    wall_man.remove_wall(0);
  }

  /* TODO
  if (target_wall && bird.x > target_wall.x + target_wall.width) {
    target_wall = get_next_object_ahead(bird, wall_man.walls);
    let centered_pos = get_centered_pos(rect_gfx, target_wall.get_gap_bottom());
    rect_gfx.x = centered_pos.x;
    rect_gfx.y = centered_pos.y;
  }
  */
}

/* TODO
function get_next_object_ahead(object, array) {
    let res = null;
    array.forEach(o => {
        if (res == null && object.x > (o.x + o.width)) {
            res = o;
        }
    });
    return res;
}
*/

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
