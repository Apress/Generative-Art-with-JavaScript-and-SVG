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

// Create our grid group.
let grid = svg.create('g');

// Pick a random hue.
let hue = Gen.random(0, 360); 

// Set some grid-related variables.
let gridSize = 660;
let rows = 11;
let spacing = 6;
let increment = gridSize / rows;
let cellSize = Math.abs(increment - spacing);

// A nested loop to create the grid.
for (let y = 0; y < gridSize; y += increment) {
	
	// Increment the hue relative to the rows, keeping it within 0 and 360.
	hue = (hue >= 360) ? (hue - 360) + (120 / rows) : hue + (120 / rows);

	for (let x = 0; x < gridSize; x += increment) {

		// Run the loop based on chance.
		if (Gen.chance(60)) {
			for (let i = 0; i < cellSize; i += 1) {
				grid.create('line').set({
					x1: Gen.random(x, x + cellSize),
					y1: Gen.random(y, y + cellSize),
					x2: Gen.random(x, x + cellSize),
					y2: Gen.random(y, y + cellSize),
					stroke: `hsl(${hue} 80% 80% / 0.33)`
				});
			}
		}
	}
}

// Centre the grid within the viewBox.
grid.moveTo(500, 500);
