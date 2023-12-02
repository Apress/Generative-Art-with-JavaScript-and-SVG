import { SvJs, Gen } from '../../node_modules/svjs/src/index.js';

// Parent SVG.
const svg = new SvJs().addTo(document.getElementById('container'));

// Viewport and viewBox (1:1 aspect ratio).
const svgSize = Math.min(window.innerWidth, window.innerHeight);
svg.set({ width: svgSize, height: svgSize, viewBox: '0 0 1000 1000' });

// Background.
svg.create('rect').set({
	x: 0, y: 0, width: 1000, height: 1000, fill: '#181818'
});

// Set a random iteration count for the loop.
let iterations = Gen.random(250, 500, false);

// Our shapes array.
let elements = ['circle', 'line', 'rect'];

// Start the loop.
for (let i = 0; i < iterations; i += 1) {

  // Pick a random element.
  let element = Gen.random(elements);

  // Set up variables that we can use on any element.
  let x = Gen.random(200, 800);
  let y = Gen.random(200, 800);
  let fill = `hsl(${Gen.random(120, 240)} 80% 80% / ${Gen.random(5, 40)}%)`;
  let stroke = `hsl(${Gen.random(0, 120)} 80% 80% / ${Gen.random(5, 40)}%)`;
  let strokeWidth = `${Gen.random(1, 3)}`;

  // Initialise the properties variable.
  let props;
  
  // Populate the properties depending on the element chosen.
  switch(element) {
    case 'circle':
      props = {
        cx: x,
        cy: y,
        r: Gen.random(1, 10),
        fill: fill,
        stroke: stroke,
        stroke_width: strokeWidth
      };
      break;
    case 'line':
      props = {
        x1: x,
        y1: y,
        x2: x + (Gen.random(-25, 25)),
        y2: y + (Gen.random(-25, 25)),
        stroke: stroke
      };
      break;
    case 'rect':
      props = {
        x: x,
        y: y,
        width: Gen.random(5, 25),
        height: Gen.random(5, 25),
        fill: fill,
        stroke: stroke,
        stroke_width: strokeWidth,
        transform: `rotate(${Gen.random(0, 360)} 500 500)`
      }
  }

  // Create the element and set its properties.
  svg.create(element).set(props);
}
