import { SvJs, Gen, Noise } from '../../../svjs/src/index.js';

// Viewport size (1:1 aspect ratio).
const svgSize = Math.min(window.innerWidth, window.innerHeight);

// Parent SVG.
const svg = new SvJs().addTo(document.getElementById('container'));
svg.set({ width: svgSize, height: svgSize, viewBox: '0 0 1000 1000' });

// Set some text styling.
svg.create('style').content(`
	text {
		font-size: 16px;
		font-family: serif;
	}
`);

// Background.
svg.create('rect').set({
  x: 0, y: 0, width: 1000, height: 1000, fill: '#181818'
});

// Create our noise, the noise x and y co-ordinates, and noise speed.
let noise = new Noise();
let nX = 0, nY = 0;
let noiseSpeed = 0.05;

// Set some grid-related variables.
let noiseGrid = svg.create('g');
let gridSize = 1000;
let rows = 50;
let increment = gridSize / rows;

// Create the noise matrix.
for (let x = 0; x < gridSize; x += increment) {
	for (let y = 0; y < gridSize; y += increment) {
	
		// Fetch the noise value.
    let noiseValue = noise.get(nX, nY);

    // Map the noise value to a useful range.
    noiseValue = Gen.mapRange(noiseValue, -1, 1, 0, 100, false);

		// Create text displaying either 0 or 1 (50% chance).
		let text = noiseGrid.create('text');
		text.content(Gen.chance() ? '1' : '0');
		text.set({
			x: x, y: y, fill: `hsl(120 20% ${noiseValue}%)`
		});

    nX += noiseSpeed;
    nY += noiseSpeed;
		
	}
}

// Centre the grid within the viewBox.
noiseGrid.moveTo(500, 500);
