// Import the SvJs library.
import { SvJs } from '../../node_modules/svjs/src/index.js';

// Create some global variables.
const svgSize = window.innerWidth > window.innerHeight ? window.innerHeight : window.innerWidth;
const bgColor = '#181818';

// Create an object to store some of our randomised parameters.
const randomised = {
  hue: random(0, 360),
  rotation: random(-180, 180),
  iterations: random(10, 100)
}

// Create our parent SVG element and attach it to the element with id 'container'.
const svg = new SvJs();
svg.addTo(document.getElementById('container'));

// Set the width and height of the viewBox (the units we work in) and the displayed size of the SVG.
svg.set({ viewBox: '0 0 1000 1000', width: svgSize, height: svgSize });

// Create a background layer - a rectangle the full size of our viewBox.
const rect = svg.create('rect');
rect.set({ x: 0, y: 0, width: 1000, height: 1000, fill: bgColor });
  
// Run a loop a random number of times to create our ellipses.
for (let i = 0; i < randomised.iterations; i += 1) {
  
  // Calculate the center point, the x and y radii of our ellipse, and its rotation.
  let center = 500;
  let radiusX = 100 + (i * 3);
  let radiusY = 300 + (i * 2);
  let rotation = randomised.rotation + (i * 2);

  // If our random hue is less than 180, increment it. Otherwise decrement it.
  let hue;
  if (randomised.hue < 180) {
    hue = randomised.hue + (i * 3);
  } else {
    hue = randomised.hue - (i * 3);
  }

  // Create our ellipse.
  let ellipse = svg.create('ellipse');
  ellipse.set({
    cx: center,
    cy: center,
    rx: radiusX,
    ry: radiusY,
    fill: 'none',
    stroke: `hsl(${hue} 80% 80% / 0.6)`,
    transform: `rotate(${rotation} ${center} ${center})`
  });
}

/**
 * Gets a random number between a minimum and maximum value.
 */
function random(min, max, integer = true) {
  let random = Math.random() * (max - min) + min;
  let number = integer ? Math.floor(random) : random;
  return number;
}
