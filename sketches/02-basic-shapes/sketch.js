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

// Main orange square.
svg.create('rect').set({
  x: 150, y: 200, width: 700, height: 600, rx: 15, fill: '#e56411',
  stroke: '#fff', stroke_width: 30, paint_order: 'stroke'
});

// Blue rectangle.
svg.create('rect').set({
  x: 650, y: 200, width: 200, height: 600, rx: 15, fill: '#69969f'
});

// Smaller orange rectangle.
svg.create('rect').set({
  x: 200, y: 425, width: 600, height: 150, rx: 20, fill: '#b84b08'
});

// Yellow rectangle.
svg.create('rect').set({
  x: 325, y: 200, width: 175, height: 600, fill: '#fed322'
});

// Purple rectangle.
svg.create('rect').set({
  x: 500, y: 200, width: 175, height: 600, fill: '#49283c'
});
