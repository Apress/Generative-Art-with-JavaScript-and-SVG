import { SvJs } from '../../node_modules/svjs/src/index.js';

// Parent SVG.
const svg = new SvJs().addTo(document.getElementById('container'));

// Viewport and viewBox (1:1 aspect ratio).
const svgSize = Math.min(window.innerWidth, window.innerHeight);
svg.set({ width: svgSize, height: svgSize, viewBox: '0 0 1000 1000' });

// Background.
svg.create('rect').set({
	x: 0, y: 0, width: 1000, height: 1000, fill: '#181818'
});

// Create our pattern.
const pattern = svg.createPattern('illusion', 100, 200);

// Create a white rectangle within the pattern.
// pattern.create('rect').set({
// 	x: 5, y: 5, width: 90, height: 190, fill: '#eee'
// });

// Create 4 x white squares within the pattern.
for (let i = 0; i < 4; i += 1) {
	pattern.create('rect').set({
		x: (i === 3) ? 20: i * 20,
		y: i * 50,
		width: 50,
		height: 50,
		fill: '#eee'
	});
}

// Create 4 x thin grey rectangles to separate the squares.
for (let i = 0; i < 4; i += 1) {
	pattern.create('rect').set({
		x: 0,
		y: 45 + (i * 50),
		width: 100,
		height: 5,
		fill: '#666'
	});
}

// Apply our pattern to a rect the size of the viewBox.
svg.create('rect').set({
	x: 0, y: 0, width: 1000, height: 1000, fill: 'url(#illusion)'
});
