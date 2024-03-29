import { SvJs, Gen, Noise } from '../../node_modules/svjs/src/index.js';

// Parent SVG.
const svg = new SvJs().addTo(document.getElementById('container'));

// Viewport and viewBox (1:1 aspect ratio).
const svgSize = Math.min(window.innerWidth, window.innerHeight);
svg.set({ width: svgSize, height: svgSize, viewBox: '0 0 1000 1000' });

// Background.
svg.create('rect').set({
  x: 0, y: 0, width: 1000, height: 1000, fill: '#181818'
});

// Noise-related and randomised variables.
let noise = new Noise();
let nX = 0;
let noiseSpeed = 0.025;
let lines = svg.create('g');
let hue = Gen.random(0, 360);
let iterations = Gen.random(60, 100);

// Start the dance.
for (let i = 10; i < iterations; i += 1) {
  let noiseValue = noise.get(nX);
	let hueShift = Gen.map(noiseValue, -1, 1, -180, 180, false);
  let lineLength = Gen.map(noiseValue, -1, 1, 0, 1000, false);

	let l1 = lines.create('line').set({
    x1: 0, y1: 0, x2: 0, y2: lineLength,
    stroke: `hsl(${Gen.constrain(hue + hueShift, 0, 360)} 80% 80% / 0.5)`,
    stroke_width: 0.5
  });

  let l2 = lines.create('line').set({
    x1: 0, y1: 0, x2: 0, y2: lineLength * 1.1,
    stroke: `hsl(${Gen.constrain(hue - hueShift, 0, 360)} 80% 80% / 0.25)`,
    stroke_width: 0.5
  });

  l1.rotate(i);
  l2.rotate(-i);

  nX += noiseSpeed;
}

lines.moveTo(500, 500);
lines.rotate(Gen.random(0, 360));
