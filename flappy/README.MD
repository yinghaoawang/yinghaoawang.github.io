# Flappy Bot
I use machine learning to play Flappy Bird on Javascript using the Pixijs library.

![](https://i.imgur.com/rXlY8f6.png)

## Neural Networks
I use neural networks with genetic algorithms (as opposed to backpropagation) to evolve populations
of birds to play the game. 

- input layer: 3 inputs - vertical velocity, horizontal distance from next wall gap, and vertical distance from next wall gap
- hidden layer: 8 inputs
- output layer: decision to jump

## Built with
- Graphics - [PixjJS](http://www.pixijs.com/)
- ML - [tensorflowjs](https://js.tensorflow.org/)
- Audio - [Buzz!](http://buzz.jaysalvat.com/)