const req = () => { throw new Error('param is required'); };

function rectInRect(ax1, ax2, ay1, ay2, bx1, bx2, by1, by2) {
    return (ax1 < bx2 && ax2 > bx1 && ay1 < by2 && ay2 > by1)
        || (ax1 > bx2 && ax2 < bx1 && ay1 > by2 && ay2 < by1);
}
function get_centered_pos(object = req(), coords = req()) {
    return {
        "x": coords.x - (object.width / 2),
        "y": coords.y - (object.height / 2)
    };
}
function is_on_stage(stage = req(), object = req()) {
    return (object.x + object.width) > (stage.pivot.x - stage.x) &&
        (object.x) < (stage.pivot.x + stage.x) &&
        (object.y + object.height) > (stage.pivot.y - stage.y) &&
        (object.y) < (stage.pivot.y + stage.y + stage.height);
}
function get_random_hex_color() {
    return Math.floor(Math.random() * 0x1000000);
  }