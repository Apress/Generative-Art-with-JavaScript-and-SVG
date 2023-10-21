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

// Create a parchment-coloured gradient.
svg.createGradient('parchment', 'linear', ['#fffbeb', '#fde68a'], 90);

// Create the path for the ripped paper.
let paper = svg.create('path').set({
  fill: 'url(#parchment)',
  stroke: '#4444',
  d: 'M 0,0 h 175 l 175,550 h -350 Z M 210,0 h 340 v 550 h -165 Z',
  filter: 'url(#rough-paper)'
});

// Centre it.
paper.moveTo(500, 500);

// Initialise the filter.
let filter = svg.createFilter('rough-paper');

// Add turbulence to simulate the paper grain.
filter.create('feTurbulence').set({
  type: 'fractalNoise',
  numOctaves: 5,
  baseFrequency: 0.04,
  seed: Gen.random(0, 100),
  result: 'turbulence'
});

// Shine diffuse lighting on the turbulence.
filter.create('feDiffuseLighting').set({
  surfaceScale: 1,
  diffuseConstant: 1.3,
  in: 'turbulence',
  result: 'lighting'
}).create('feDistantLight').set({
  azimuth: 180,
  elevation: 45,
});

// Distort the paper source graphic with turbulence.
filter.create('feDisplacementMap').set({
  in: 'SourceGraphic',
  in2: 'turbulence',
  scale: 25,
  result: 'distortion'
});

// Merge the lighting with the rough-edged paper.
filter.create('feComposite').set({
  in: 'lighting',
  in2: 'distortion',
  operator: 'in',
  result: 'composite'
});

// Re-introduce the parchment gradient.
filter.create('feBlend').set({
  in: 'composite',
  in2: 'distortion',
  mode: 'multiply'
});
