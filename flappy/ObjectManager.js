class ObjectManager {
  constructor(stage) {
    this.objects = [];
    this.stage = stage;
  }

  add(object) {
      this.objects.push(object);
      this.stage.addChild(object);
  }
  get(index) {
    return this.objects[index];
  }
  get_all() {
    return this.objects;
  }
  pop() {
    if (this.size() > 0) this.remove(this.size() - 1);
  }
  remove(index) {
    let object = this.objects[index];
    this.stage.removeChild(object);
    this.objects.splice(index, 1);
  }
  size() {
    return this.objects.length;
  }

  clear() {
    for (let i = 0; i < this.size(); ++i) {
      this.remove(i);
      --i;
    }
  }
}
