import { SvJs } from '../../node_modules/svjs/src/index.js';

// Viewport size (1:1 aspect ratio).
const svgSize = window.innerWidth > window.innerHeight ? window.innerHeight : window.innerWidth;

// Parent SVG.
const svg = new SvJs().addTo(document.getElementById('container'));
svg.set({ width: svgSize, height: svgSize, viewBox: '0 0 1000 1000' });

// Background.
svg.create('rect').set({
	x: 0, y: 0, width: 1000, height: 1000, fill: '#181818'
});

// Circle overlay loop.
for (let i = 1; i <= 6; i += 1) {
  
  // Vary the radius, and the two vertical centre points.
  let r = 50 * i;
  let cx = 500;
  let cy1 = 800 - r;
  let cy2 = 200 + r;

  // Create the blueish circle set.
  svg.create('circle').set({
    cx: cx, cy: cy1, r: r, fill: '#99eeff', fill_opacity: 0.1
  });

  // Create the greenish circle set.
  svg.create('circle').set({
    cx: cx, cy: cy2, r: r, fill: '#aaffee', fill_opacity: 0.1
  }); 
}

// Create a subtle outline to frame the circle sets.
svg.create('circle').set({
  cx: 500, cy: 500, r: 320, fill: 'none',
  stroke: '#aaffee', stroke_width: 2, stroke_opacity: 0.1
});
