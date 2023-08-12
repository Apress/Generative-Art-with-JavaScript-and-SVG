import { SvJs, Gen } from '../../../svjs/src/index.js';

// Viewport size (1:1 aspect ratio).
const svgSize = Math.min(window.innerWidth, window.innerHeight);

// Parent SVG.
const svg = new SvJs().addTo(document.getElementById('container'));
svg.set({ width: svgSize, height: svgSize, viewBox: '0 0 1000 1000' });

// Background.
svg.create('rect').set({
  x: 0, y: 0, width: 1000, height: 1000, fill: '#181818'
});

let hue = Gen.random(0, 360);
let rotation = Gen.random(-180, 180);
let iterations = Gen.random(50, 100);
let ellipses = [];
  
// Run a loop a random number of times to create our ellipses.
for (let i = 0; i < iterations; i += 1) {
  
  // Calculate the rotation and x and y radii of our ellipse.
  let radiusX = 100 + (i * 3);
  let radiusY = 300 + (i * 2);
  let rot = rotation + (i * 2);

  hue = (hue % 360) + 2;

  // Create our ellipse.
  let ellipse = svg.create('ellipse');
  ellipse.set({
    cx: 500,
    cy: 500,
    rx: radiusX,
    ry: radiusY,
    fill: 'none',
    stroke: `hsl(${hue} 80% 80% / 0.6)`,
    transform: `rotate(${rot} 500 500)`
  });
  ellipses.push(ellipse);
}

svg.trackCursor(() => {
  ellipses.forEach((ellipse) => {
    ellipse.set({
      cx: svg.cursorX,
      cy: svg.cursorY
    });
  });
});