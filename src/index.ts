// Magic for p5 importing properly in TypeScript AND Webpack
import 'p5';
const p5 = require('p5');

const sketch = (p: p5) => {
  let canvas: HTMLCanvasElement;

  p.preload = () => {};

  p.setup = () => {
    canvas = p.createCanvas(800, 800);
    p.background(p.color(51, 51, 51));
  };

  p.draw = () => {
    p.stroke(p.color(150, 150, 150));
    p.fill(p.color(51, 51, 51));
    p.ellipse(15, 15, 15, 15);
  };
};

const sketchP = new p5(sketch);
