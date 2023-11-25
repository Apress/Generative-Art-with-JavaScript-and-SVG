import { SvJs, Gen } from '../../node_modules/svjs/src/index.js';

const svgSize = Math.min(window.innerWidth, window.innerHeight);

const svg = new SvJs().addTo(document.getElementById('container'));
svg.set({ width: svgSize, height: svgSize, viewBox: '0 0 1000 1000' });

svg.create('style').content(`
  path {
    stroke-width: 2 
  }

  text {
    fill: #aaa;
    font-family: Arial;
    font-size: 20px;
    letter-spacing: 1.5px;
  }

  .point {
    fill: #99f6e4;
    stroke: #99f6e425;
    stroke-width: 25
  }
`);

svg.create('rect').set({
	x: 0, y: 0, width: 1000, height: 1000, fill: '#181818'
});

svg.create('path').set({
  fill: 'none',
  stroke: '#333',
  stroke_width: 1,
  d: 'M 500,150 v 600 M 200,450 h 600'
});

svg.createGradient('grad', 'linear', ['#fde047', '#a855f7'], 45);

svg.createFilter('blur').create('feGaussianBlur').set({ stdDeviation: 15 });

svg.create('circle').set({
  cx: 500, cy: 450, r: 300, fill: 'none', stroke: 'url(#grad)', stroke_width: 5
});

svg.create('circle').set({
  cx: 500, cy: 450, r: 325, fill: 'none',
  stroke: 'url(#grad)', stroke_width: 5, filter: 'url(#blur)'
});

let hyp = svg.create('path').set({ stroke: '#5991db', d: 'M 500,450 L 800,450' });
let opp = svg.create('path').set({ stroke: '#fde047', d: 'M 500,450 L 800,450' });
let adj = svg.create('path').set({ stroke: '#ec4899', d: 'M 500,450 L 800,450' });

svg.create('circle').set({ class: 'point', cx: 500, cy: 450, r: 10 });
let hypCircle = svg.create('circle').set({ class: 'point', r: 10, cx: 800, cy: 450 });
let oppCircle = svg.create('circle').set({ class: 'point', r: 10, cx: 800, cy: 450 });

let degreesTxt = svg.create('text').set({ x: 350, y: 880 })
degreesTxt.content('Degrees: 360');
let radiansTxt = svg.create('text').set({ x: 350, y: 910 })
radiansTxt.content('Radians: 6.28');
let sineTxt = svg.create('text').set({ x: 510, y: 880 })
sineTxt.content('Sine(θ): 1.00');
let cosineTxt = svg.create('text').set({ x: 510, y: 910 })
cosineTxt.content('Cosine(θ): 0.00');

svg.trackCursor(() => {

  let offset = Math.PI / 2;
  let angle = Gen.map(svg.cursorX, 0, 1000, 0, 360)
  let theta = angle * (Math.PI/180) + offset;
  let sin = Math.sin(theta);
  let cos = Math.cos(theta);
  let xPos = Gen.map(sin, -1, 1, 200, 800);
  let yPos = Gen.map(cos, -1, 1, 150, 750);

  hyp.set({ d: `M 500,450 L ${[xPos, yPos]}` });
  opp.set({ d: `M ${[xPos, yPos]} L ${xPos} 450` });
  adj.set({ d: `M 500,450 L ${xPos} 450` });
  hypCircle.set({ cx: xPos, cy: yPos });
  oppCircle.set({ cx: xPos, cy: 450 });
  degreesTxt.content(`Degrees: ${Number(angle).toFixed()}`);
  radiansTxt.content(`Radians: ${Number(angle * (Math.PI/180)).toFixed(2)}`);
  sineTxt.content(`Sine(θ): ${Number(sin).toFixed(2)}`);
  cosineTxt.content(`Cosine(θ): ${Number(cos).toFixed(2)}`);

});

document.addEventListener('keydown', (event) => {
  let key = event.key.toLowerCase();
  if (key === 's') svg.save();
});