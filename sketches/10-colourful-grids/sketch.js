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

// Create our colour palettes.
let palettes = [
	['#5465FF', '#788BFF', '#9BB1FF', '#BFD7FF', '#E2FDFF'],
	['#22577A', '#38A3A5', '#57CC99', '#80ED99', '#C7f9CC'],
	['#4C5760', '#93A8AC', '#D7CEB2', '#A59E8C', '#66635B']
];

// Pick a random palette.
let pickedPalette = Gen.random(palettes);

// Set some grid-related variables.
let gridSize = 600;
let rows = Gen.random(3, 10);
let spacing = 10;
let increment = gridSize / rows;
let cellSize = Math.abs(increment - spacing);

// A nested loop to create the grid.
for (let y = 0; y < gridSize; y += increment) {
	for (let x = 0; x < gridSize; x += increment) {
		
		// Create our clip path with a unique id.
		let clip = svg.create('clipPath').set({ id: `${x}${y}` });

		// Create the clip path shape.
		clip.create('rect').set({
			x: x, y: y, width: cellSize, height: cellSize
		});

		// Define our possible positions.
		let positions = [
			[x, y], // top left
			[x + cellSize, y], // top right
			[x + cellSize, y + cellSize], // bottom right
			[x, y + cellSize] // bottom left
		];
		
		// Pick a random position.
		let pickedPosition = Gen.random(positions);

		// Create a group for our circles.
		let circles = grid.create('g');

		// Create the circles, applying the picked position and palette.
		for (let i = 0; i < 5; i += 1) {
			circles.create('circle').set({
				cx: pickedPosition[0], 
				cy: pickedPosition[1], 
				r: cellSize - (i * (cellSize / 5)), 
				fill: pickedPalette[i]
			});
		}

		// Apply the clip path to the circle group.
		circles.set({
			clip_path: `url(#${clip.get('id')})`
		});

		// Create a square to frame the cell.
		grid.create('rect').set({
			x: x, y: y, width: cellSize, height: cellSize,
			fill: 'none', stroke: '#eee',
		});
		
	}
}

// Centre the grid within the viewBox.
grid.moveTo([500, 500]);
