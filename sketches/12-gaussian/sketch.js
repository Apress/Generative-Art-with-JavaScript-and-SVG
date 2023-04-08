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

let total = 5000;
let above = 0;
let below = 0;

for (let i = 0; i < total; i += 1) {
	// let x = Gen.gaussian();
	// if (x > 3) above += 1;
	// if (x < -3) below += 1
	// svg.create('line').set({
	// 	x1: 500, y1: (i * 2), x2: 500 + (x * 100), y2: (i * 2), stroke: 'white'
	// });
	// let cx = Gen.mapRange(Gen.gaussian(), -3, 3, 0, 1000);
	// let cy = Gen.mapRange(Gen.gaussian(), -3, 3, 0, 1000);
	let cx = Gen.gaussian(500, 100);
	let cy = Gen.gaussian(500, 100);
	svg.create('circle').set({
		cx: cx, cy: cy, r: 5, fill: '#ffffff30'
	});
}

// console.log(`${below} below, ${above} above. ${((below + above) / total) * 100}% overall.`)