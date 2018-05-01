// Magic for p5 importing properly in TypeScript AND Webpack
import 'p5';
const p5 = require('p5');

const sketch = (p: p5) => {
  let canvas: HTMLCanvasElement;

  const colors = {
    grey: p.color(150, 150, 150),
    black: p.color(51, 51, 51),
    blackWithOpacity: p.color(51, 51, 51, 10),
  };

  const circleDimensions = {
    min: 15,
    max: 50,
  };

  var coordinates: p5.Vector[] = [];
  var dimensions: p5.Vector[] = [];
  var speeds: p5.Vector[] = [];
  var expansionSpeeds: p5.Vector[] = [];

  const numberOfCircles = 50;

  p.preload = () => {};

  p.setup = () => {
    canvas = p.createCanvas(800, 800);
    resetCircles();
  };

  p.draw = () => {
    p.background(colors.black);

    p.stroke(colors.grey);
    p.fill(colors.blackWithOpacity);

    for (let index = 0; index < numberOfCircles; index++) {
      const coordinate = coordinates[index];
      const dimension = dimensions[index];
      const speed = speeds[index];
      const expansionSpeed = expansionSpeeds[index];

      coordinate.add(speed.x, speed.y);
      dimension.add(expansionSpeed.x, expansionSpeed.y);

      if (coordinate.x >= p.width || coordinate.x <= 0) {
        speed.set(speed.x * -1, speed.y);
      }

      if (coordinate.y >= p.height || coordinate.y <= 0) {
        speed.set(speed.x, speed.y * -1);
      }

      if (
        dimension.x <= circleDimensions.min ||
        dimension.x >= circleDimensions.max
      ) {
        expansionSpeed.set(expansionSpeed.x * -1, expansionSpeed.y * -1);
      }

      p.ellipse(coordinate.x, coordinate.y, dimension.x, dimension.y);
    }
  };

  const resetCircles = () => {
    p.background(colors.black);

    coordinates = Array.from(new Array(numberOfCircles), () =>
      p.createVector(p.random(0, p.width), p.random(0, p.height)),
    );

    speeds = Array.from(new Array(numberOfCircles), () => {
      const xAxisSpeed = p.round(p.random(0, 1)) === 1 ? -1 : 1;
      const yAxisSpeed = p.round(p.random(0, 1)) === 1 ? -1 : 1;

      return p.createVector(xAxisSpeed, yAxisSpeed);
    });

    expansionSpeeds = Array.from(new Array(numberOfCircles), () =>
      p.createVector(0.5, 0.5),
    );

    dimensions = Array.from(new Array(numberOfCircles), () => {
      const firstDimension = p.map(
        p.random(0, 1),
        0,
        1,
        circleDimensions.min,
        circleDimensions.max,
      );

      return p.createVector(firstDimension, firstDimension);
    });
  };

  p.mouseClicked = () => {
    //alert('here 2');
    resetCircles();
    return false;
  };
};

const sketchP = new p5(sketch);
