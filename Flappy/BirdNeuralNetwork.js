class BirdNeuralNetwork extends NeuralNetwork {
    constructor(index) {
      super(2, 10, 1);
      this.index = index;
    }
  
    predict(dist_from_wall) {
      return super.predict([dist_from_wall.x, dist_from_wall.y]);
    }
  }