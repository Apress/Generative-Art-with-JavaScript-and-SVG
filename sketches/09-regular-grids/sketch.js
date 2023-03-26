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

// Create our grid group.
let grid = svg.create('g');

// Set some grid-related variables.
let gridSize = Gen.random(500, 750);
let rows = Gen.random(3, 10);
let spacing = Gen.random(5, 10);
let increment = gridSize / rows;
let cellSize = Math.abs(increment - spacing);

// A nested loop to visualise the grid.
for (let y = 0; y < gridSize; y += increment) {
	for (let x = 0; x < gridSize; x += increment) {

		// Create a square to frame the cell.
		grid.create('rect').set({
			x: x, y: y, width: cellSize, height: cellSize,
			fill: 'none', stroke: '#eee',
		});
		
	}
}

// Centre the grid within the viewBox.
grid.moveTo([500, 500]);
