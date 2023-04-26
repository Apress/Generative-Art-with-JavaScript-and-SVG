import { SvJs, Gen, Noise } from '../../../svjs/src/index.js';

// Viewport size (1:1 aspect ratio).
const svgSize = window.innerWidth > window.innerHeight ? window.innerHeight : window.innerWidth;

// Parent SVG.
const svg = new SvJs().addTo(document.getElementById('container'));
svg.set({ width: svgSize, height: svgSize, viewBox: '0 0 1000 1000' });

// Background.
svg.create('rect').set({
	x: 0, y: 0, width: 1000, height: 1000, fill: '#181818'
});

let grad = svg.createGradient('grad', 'linear', ['red', 'orange', 'yellow'], 90);

let rect = svg.create('rect').set({
	x: 0, y: 0, width: 400, height: 400, fill: 'url(#grad)'
});

console.log(rect.getCentre())

rect.moveTo(500, 500);

//console.log(rect.element.transform.baseVal.consolidate().matrix);

// let noise = new Noise();

// let xoff = 0;
// let yoff = 0;

// let line = svg.create('line');
// let circle = svg.create('circle');

// function draw() {

// 	let n = Math.round(noise.get(xoff, yoff) * 1000);

// 	line.set({
// 		x1: n, y1: 0, x2: n, y2: 1000, stroke: '#fff'
// 	});

// 	circle.set({
// 		cx: 500, cy: 500, r: n / 5, fill: '#ffffffaa'
// 	});

// 	xoff += 0.01;
// 	yoff += 0.01;

// 	requestAnimationFrame(draw);
// }

// draw();
