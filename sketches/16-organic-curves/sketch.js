import { SvJs, Gen, Noise } from '../../../svjs/src/index.js';

// Viewport size (1:1 aspect ratio).
const svgSize = Math.min(window.innerWidth, window.innerHeight);

// Parent SVG.
const svg = new SvJs().addTo(document.getElementById('container'));
svg.set({ width: svgSize, height: svgSize, viewBox: '0 0 1000 1000' });

// Background.
svg.create('rect').set({
	x: 0, y: 0, width: 1000, height: 1000, fill: '#181818'
});

// Noise-related.
let noise = new Noise();
let n = Gen.random(0, 1000);
let speed = 0.05;
let amplifier = Gen.random(200, 500);

// Curve and colour-related.
let curves = svg.create('g');
let numCurves = Gen.random(75, 125);
let hue = Gen.random(0, 360);

for (let i = 0; i < numCurves; i += 1) {

  // Retrieve and re-map our noise value.
  let noiseValue = noise.get(n);
	noiseValue = Gen.map(noiseValue, -1, 1, -amplifier, amplifier, false);

  // M command co-ordinates.
  let mx = 0;
  let my = 0 + (i * 5);
  
  // C command co-ordinates.
  let cpx1 = 0 + noiseValue;
  let cpy1 = -100;
  let cpx2 = 250 + noiseValue;
  let cpy2 = -100;
  let x2 = 300;
  let y2 = 0;

  // S command co-ordinates.
  let spx = 350 + noiseValue;
  let spy = 100;
  let x3 = 300;
  let y3 = -50;
  
  // Create the organic curve.
  curves.create('path').set({
    fill: 'none',
    stroke: `hsl(${hue} 80% 80% / 0.8)`,
    d: `M ${[mx, my]} c ${[cpx1, cpy1, cpx2, cpy2, x2, y2]} s ${[spx, spy, x3, y3]}`
  });

  // Increment the noise and hue.
  n += speed;
  hue = (hue % 360) + (noiseValue / 25);

  // 10% chance of spawning a 'bubble'.
  if (Gen.chance(10)) {
    svg.create('circle').set({
      r: Gen.random(5, 50),
      cx: Gen.random(150, 850),
      cy: Gen.random(150, 850),
      fill: `hsl(0 0% 100% / 0.1)`,
      stroke: '#888'
    });
  }
}

curves.moveTo(500, 500);
