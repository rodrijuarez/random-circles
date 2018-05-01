// Magic for p5 importing properly in TypeScript AND Webpack
import 'p5';
var p5 = require('p5');

import './assets/styles/main.scss';
import './assets/js/p5.dom.js';

var sketch = (p: p5) => {
  let canvas: any;
  p.preload = () => {};

  p.setup = () => {
    (<any>window).p5 = p;
    canvas = p.createCanvas(400, 400);
    p.background(100);
    canvas.drop(gotFile);
  };

  p.draw = () => {
    p.fill(p.color(255));
    p.noStroke();
    p.textSize(24);
    p.textAlign(p.CENTER);
    p.text('Drag an image file onto the canvas.', p.width / 2, p.height / 2);
    p.noLoop();
  };

  const gotFile = (file: any) => {
    if (file.type === 'image') {
      // Create an image DOM element but don't show it
      var img = p.createImg(file.data);
      // Draw the image onto the canvas
      //p.image(img, 0, 0, p.width, p.height);
    } else {
      p.print('Not an image file!');
    }
  };
};

var sketchP = new p5(sketch);
