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

// Create the source graphic.
svg.create('circle').set({
  cx: 500,
  cy: 500,
  r: Gen.random(250, 350),
  fill: '#000',
  filter: 'url(#cosmic)'
});

// Initialise the filter.
let filter = svg.createFilter('cosmic');

// Create a random amount of turbulence.
filter.create('feTurbulence').set({
  type: 'fractalNoise',
  baseFrequency: Gen.random(0.002, 0.006, true),
  seed: Gen.random(0, 10000),
  numOctaves: 4,
  stitchTiles: 'stitch',
  result: 'turbulence'
});

// Blur the edges of the source graphic.
filter.create('feGaussianBlur').set({
  stdDeviation: Gen.random(10, 25),
  in: 'SourceGraphic',
  result: 'blurred'
});

// Displace the turbulence with the blurred edge of the circle.
filter.create('feDisplacementMap').set({
  in: 'turbulence',
  in2: 'blurred',
  scale: Gen.random(250, 500),
  result: 'distortion'
});

// Remove everything beyond the blurred perimeter.
filter.create('feComposite').set({
  in: 'distortion',
  in2: 'blurred',
  operator: 'atop'
});

