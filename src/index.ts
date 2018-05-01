// Magic for p5 importing properly in TypeScript AND Webpack
import 'p5';
const p5 = require('p5');

const sketch = (p: p5) => {
  let canvas: HTMLCanvasElement;

  const colors = {
    grey: p.color(150, 150, 150),
    black: p.color(51, 51, 51),
  };
  var coordinates: p5.Vector[] = [];
  var dimensions: p5.Vector[] = [];

  const numberOfCircles = 10;

  p.preload = () => {};

  p.setup = () => {
    canvas = p.createCanvas(800, 800);
    resetCircles();
  };

  p.draw = () => {
    p.stroke(colors.grey);
    p.fill(colors.black);

    for (let index = 0; index < numberOfCircles; index++) {
      const coordinate = coordinates[index];
      const dimension = dimensions[index];

      p.ellipse(coordinate.x, coordinate.y, dimension.x, dimension.y);
    }
  };

  const resetCircles = () => {
    p.background(colors.black);

    coordinates = Array.from(new Array(numberOfCircles), () =>
      p.createVector(p.random(0, p.width), p.random(0, p.height)),
    );
    dimensions = Array.from(new Array(numberOfCircles), () =>
      p.createVector(15, 15),
    );
  };

  const mouseClicked = () => {
    resetCircles();
  };
};

const sketchP = new p5(sketch);
