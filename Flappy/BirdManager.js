class BirdManager extends ObjectManager {
  constructor(stage) {
    super(stage);
  }
  add(x, y, texture_name, nn) {
    let new_bird = new Bird(x, y, texture_name, nn);
    super.add(new_bird);
  }

  get_living_bird() {
      for (let i = 0; i < this.size(); ++i) {
          if (this.objects[i].alive) return this.objects[i];
      }
      return null;
  }
  
  has_living_bird() {
      return Boolean(this.get_living_bird() != null);
  }
  
  step_all() {
      for (let i = 0; i < this.size(); ++i) {
          let bird = this.objects[i];
          if (bird.alive) bird.step();
      }
  }
  
}
