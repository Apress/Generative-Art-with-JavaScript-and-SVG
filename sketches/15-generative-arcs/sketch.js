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

// Set up a container group for our arc curves.
let arcs = svg.create('g');

// Randomise some variables.
let rx = Gen.random(-25, 25).toFixed(2);
let ry = Gen.random(-50, 50).toFixed(2);
let hue = Gen.random(0, 360, false);

// Create two sets of elliptical arc curves on each iteration.
for (let i = 0; i < 360; i += 1) {

  // Randomise the rotation and large arc flag.
  let rotation = Gen.random(0, 180, false);
  let large = Gen.chance() ? 1 : 0;

  // Create a first set of clockwise arc curves (sweep = 0).
  arcs.create('path').set({
    fill: 'none',
    stroke: `hsl(${hue} 75% 75% / 0.05)`,
    d: `M 275 500 A ${rx} ${ry} ${rotation} ${large} 0 725 500`
  });

  // Create a second set of counter-clockwise arc curves (sweep = 1).
  arcs.create('path').set({
    fill: 'none',
    stroke: `hsl(${hue + 60} 75% 75% / 0.05)`,
    d: `M 275 500 A ${rx} ${ry} ${rotation} ${large} 1 725 500`
  });

  // Increment the hue.
  hue = (hue % 360) + 0.5;
}

// Apply a random rotation.
arcs.rotate(Gen.random(0, 360, false));
