import { SvJs, Gen } from '../../node_modules/svjs/src/index.js';

// Parent SVG.
const svg = new SvJs().addTo(document.getElementById('container'));

// Viewport and viewBox (1:1 aspect ratio).
const svgSize = Math.min(window.innerWidth, window.innerHeight);
svg.set({ width: svgSize, height: svgSize, viewBox: '0 0 1000 1000' });

// Background.
svg.create('rect').set({
	x: 0, y: 0, width: 1000, height: 1000, fill: '#181818'
});

// Create a group for our generative city.
let portoPareto = svg.create('g');

// Create the sky gradient.
svg.createGradient('sky', 'linear', ['#f58b10', '#d21263', '#940c5e', '#25226c'], 90);

// Create the sky and apply the gradient.
portoPareto.create('rect').set({
	x: 150, y: 150, width: 700, height: 400, fill: 'url(#sky)'
});

// Create the river gradient.
svg.createGradient('river', 'linear', ['#80e5ff10', '#70b566'], 90);

// Create the river and apply the gradient.
portoPareto.create('rect').set({
	x: 150, y: 555, width: 700, height: 295, fill: 'url(#river)'
});

// A loop for our generative cityscape.
for (let i = 0; i < 60; i += 1) {

	// Get a pareto distribution with a min height of 20.
	let pareto = Gen.pareto(20);

	// Constrain the height, and slightly randomise the upper limit.
	let height = Gen.constrain(pareto, 20, Gen.random(150, 200));
	
	// Create our buildings.
	portoPareto.create('line').set({
		x1: 150 + (i * 12), y1: 550,
		x2: 150 + (i * 12), y2: 550 - height,
		stroke: '#181818', stroke_width: 8
	});
}

// Create a radial gradient.
svg.createGradient('radialGrad', 'radial', ['#ffffff', '#ffffff60']);

// Create a mask, and inside it create the circle with the radial gradient.
let mask = svg.create('mask').set({ id: 'mask' });
mask.create('circle').set({
	cx: 500, cy: 500, r: 325, fill: 'url(#radialGrad)',
});

// Apply the mask to the group.
portoPareto.set({ mask: 'url(#mask)' });

// Create a linear gradient for our circular frame.
svg.createGradient('strokeGrad', 'linear', ['#eeeeee', '#eeeeee15']);

// Create the frame and apply the gradient.
svg.create('circle').set({
	cx: 500, cy: 500, r: 345, fill: 'none', stroke: 'url(#strokeGrad)', stroke_width: 2.5
});