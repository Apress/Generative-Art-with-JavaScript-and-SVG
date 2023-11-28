// Import the SvJs library.
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

// The line to use for the gag.
let line = '"Bart Bucks" are not legal tender.';
line = line.toUpperCase();

// Run a loop, creating 12 (960 / 80) lines of text.
for (let i = 0; i < 960; i += 80) {
  let text = svg.create('text');
	text.content(line);
	text.set({
    x: 20,
		y: 80 + i,
		fill: '#fff',
		font_size: 52,
		font_family: 'Mynerve'
  });
}



