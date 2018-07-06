// Code by Siraj Raval
class NeuralNetwork {
  constructor(input_nodes, hidden_nodes, output_nodes) {
    this.input_nodes = input_nodes;
    this.hidden_nodes = hidden_nodes;
    this.output_nodes = output_nodes;

    this.input_weights = tf.randomNormal([this.input_nodes, this.hidden_nodes]);
    this.output_weights = tf.randomNormal([
      this.hidden_nodes,
      this.output_nodes
    ]);
  }

  set_nodes(input_nodes, hidden_nodes, output_nodes) {
    this.input_nodes = input_nodes;
    this.hidden_nodes = hidden_nodes;
    this.output_nodes = output_nodes;
  }

  predict(user_input) {
    let output;
    tf.tidy(() => {
      let input_layer = tf.tensor(user_input, [1, this.input_nodes]);
      let hidden_layer = input_layer.matMul(this.input_weights).sigmoid();
      let output_layer = hidden_layer.matMul(this.output_weights).sigmoid();
      output = output_layer.dataSync();
    });
    return output;
  }

  clone() {
    let clone = new NeuralNetwork(
      this.input_nodes,
      this.hidden_nodes,
      this.output_nodes
    );
    clone.dispose();
    clone.input_weights = tf.clone(this.input_weights);
    clone.output_weights = tf.clone(this.output_weights);
    return clone;
  }

  dispose() {
    this.input_weights.dispose();
    this.output_weights.dispose();
  }
}
