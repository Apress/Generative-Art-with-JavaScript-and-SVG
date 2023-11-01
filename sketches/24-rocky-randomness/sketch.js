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

// Create our source graphic.
svg.create('circle').set({
  r: 300,
  cx: 500,
  cy: 500,
  fill: 'url(#random-gradient)',
  filter: 'url(#rocky-randomness)'
});

// A random colour array.
let colours = [
  `hsl(${Gen.random(0, 360)} 80% 80% / 0.75)`,
  `hsl(${Gen.random(0, 360)} 80% 80% / 0.75)`,
  `hsl(${Gen.random(0, 360)} 80% 80% / 0.75)`
];

// A gradient with a randomised rotation and array of colours.
svg.createGradient('random-gradient', 'linear', colours, Gen.random(0, 360));

// Initalise the filter.
let filter = svg.createFilter('rocky-randomness');

// Create the primary turbulence.
filter.create('feTurbulence').set({
  type: 'turbulence',
  numOctaves: Gen.random(2, 7),
  baseFrequency: Gen.random(0.003, 0.01, true),
  seed: Gen.random(0, 1000),
  result: 'turbulence'
});

// Set up another instance of turbulence.
filter.create('feTurbulence').set({
  type: 'fractalNoise',
  numOctaves: Gen.random(3, 7),
  baseFrequency: Gen.random(0.01, 0.07, true),
  seed: Gen.random(0, 1000),
  result: 'noise'
});

// Distort the first instance of turbulence with the second.
filter.create('feDisplacementMap').set({
  in: 'turbulence',
  in2: 'noise',
  scale: Gen.random(25, 50),
  xChannelSelector: 'R',
  yChannelSelector: 'G',
  result: 'distortion'
});

// Shine a specular point light on the distorted output.
filter.create('feSpecularLighting').set({
  in: 'distortion',
  surfaceScale: Gen.random(5, 30),
  specularConstant: Gen.random(2, 6),
  specularExponent: Gen.random(10, 25),
  result: 'lighting'
}).create('fePointLight').set({
  x: Gen.random([-50, 500, 1050]),
  y: Gen.random([-50, 1050]),
  z: Gen.random(100, 300)
});

// Blur the source graphic.
filter.create('feGaussianBlur').set({
  in: 'SourceGraphic',
  stdDeviation: Gen.random(25, 50),
  result: 'blur'
});

// Bring the lit texture in via the blurred source graphic.
filter.create('feComposite').set({
  in: 'lighting',
  in2: 'blur',
  operator: 'in',
  result: 'comp1'
});

// Recover the original gradient.
filter.create('feComposite').set({
  in: 'blur',
  in2: 'comp1',
  operator: 'atop'
});
