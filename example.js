const brain = require('brain.js');

const net = new brain.NeuralNetwork();

net.train(
  [
    { input: { r: 158, g: 184, b: 224 }, output: { white: 1 } },
    { input: { r: 26, g: 214, b: 184 }, output: { black: 1 } },
    { input: { r: 84, g: 61, b: 74 }, output: { white: 1 } },
    { input: { r: 189, g: 199, b: 219 }, output: { black: 1 } },
    { input: { r: 79, g: 89, b: 105 }, output: { white: 1 } },
    { input: { r: 255, g: 252, b: 0 }, output: { black: 1 } },
    { input: { r: 255, g: 107, b: 133 }, output: { white: 1 } }
  ]
);

// { white: 0.18339219689369202, black: 0.8316814303398132 }
const output = net.run({ r: 0, g: 0, b: 0 });
