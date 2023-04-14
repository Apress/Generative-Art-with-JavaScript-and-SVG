import { SvJs, Gen } from '../../../svjs/src/index.js';

// Viewport size (1:1 aspect ratio).
const svgSize = window.innerWidth > window.innerHeight ? window.innerHeight : window.innerWidth;

// Parent SVG.
const svg = new SvJs().addTo(document.getElementById('container'));
svg.set({ width: svgSize, height: svgSize, viewBox: '0 0 1000 1000' });

// Background.
svg.create('rect').set({
	x: 0, y: 0, width: 1000, height: 1000, fill: '#181818'
});

for (let i = 0; i < 100; i += 1) {
	let height = Gen.constrain(Gen.pareto(10, false), 10, 250);
	svg.create('line').set({
		x1: 2 + i * 12,
		y1: 600,
		x2: 2 + i * 12,
		y2: 600 - height,
		stroke: '#ccc',
		stroke_width: 10
	});
}