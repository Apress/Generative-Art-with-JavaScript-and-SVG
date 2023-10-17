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

// Create a group and apply the filter.
let paper = svg.create('g').set({
  filter: 'url(#rough-paper)'
});

// Create the first piece of paper.
paper.create('path').set({
  fill: '#f43f5e',
  stroke: '#4444',
  d: 'M 0,0 h 175 l 175,550 h -350 Z'
});

// Create the second piece.
paper.create('path').set({
  fill: '#22d3ee',
  stroke: '#4444',
  d: 'M 210,0 h 340 v 550 h -165 Z'
});

// Centre it.
paper.moveTo(500, 500);

// Initialise the filter.
let filter = svg.createFilter('rough-paper');

filter.create('feTurbulence').set({
  type: 'fractalNoise',
  numOctaves: 5,
  baseFrequency: 0.04,
  seed: Gen.random(0, 100),
  result: 'turbulence'
});

filter.create('feDisplacementMap').set({
  in: 'SourceGraphic',
  in2: 'turbulence',
  scale: 25,
  result: 'distortion'
});

filter.create('feDiffuseLighting').set({
  surfaceScale: 1,
  diffuseConstant: 1.3,
  in: 'turbulence',
  result: 'lighting'
}).create('feDistantLight').set({
  azimuth: 180,
  elevation: 45,
});

filter.create('feComposite').set({
  in: 'lighting',
  in2: 'distortion',
  operator: 'in',
  result: 'composite'
});

filter.create('feBlend').set({
  in: 'composite',
  in2: 'distortion',
  mode: 'multiply'
});