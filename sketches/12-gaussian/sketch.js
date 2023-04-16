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

for (let i = 0; i < 10000; i += 1) {

	// Generate x and y co-ordinates with a gaussian distribution.
	let gaussianX = Gen.gaussian(500, 150, false);
	let gaussianY = Gen.gaussian(500, 150, false);

	// Create the lines based on the gaussian co-ordinates.
	svg.create('line').set({
		x1: gaussianX,
		y1: gaussianY,
		x2: gaussianX + Gen.random(-10, 10, false),
		y2: gaussianY + Gen.random(-10, 10, false),
		stroke: `hsl(${Gen.random(150, 270, false)} 80% 80% / 0.8)`
	});
}

// Create a series of circles to frame the distribution.
for (let i = 0; i < 10; i += 1) {
	svg.create('circle').set({
		cx: 500, cy: 500, r: 25 + (i * 25), fill: 'none',
		stroke: `hsl(0 0% 0% / ${0.25 - (i / 50)})`, stroke_width: 15
	});
}
