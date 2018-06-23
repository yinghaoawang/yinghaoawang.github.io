class BirdNeuralNetwork extends NeuralNetwork {
    constructor(index) {
      super(4, 8, 1);
      this.index = index;
    }
  
    predict(yvel, dist_from_wall,ydist_from_2wall) {
      return super.predict([yvel, dist_from_wall.x, dist_from_wall.y, ydist_from_2wall]);
    }

    clone(index) {
        if (index === undefined) { throw new Error("Index required to clone bird neural network."); }
        let clone = new BirdNeuralNetwork(index);
        clone.set_nodes(this.input_nodes,
          this.hidden_nodes,
          this.output_nodes);
        clone.dispose();
        clone.input_weights = tf.clone(this.input_weights);
        clone.output_weights = tf.clone(this.output_weights);
        return clone;
      }
  }