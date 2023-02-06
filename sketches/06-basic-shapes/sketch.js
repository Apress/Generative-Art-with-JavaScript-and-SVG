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

// Main orange square.
svg.create('rect').set({
  x: 150, y: 200, width: 700, height: 600, fill: '#e56411',
  stroke: '#fff', stroke_width: 30, paint_order: 'stroke'
});

// Blue rectangle.
svg.create('rect').set({
  x: 675, y: 200, width: 175, height: 600, fill: '#69969f'
});

// Smaller orange rectangle.
svg.create('rect').set({
  x: 200, y: 425, width: 600, height: 150, fill: '#b84b08'
});

// Yellow rectangle.
svg.create('rect').set({
  x: 325, y: 200, width: 175, height: 600, fill: '#fed322'
});

// Purple rectangle.
svg.create('rect').set({
  x: 500, y: 200, width: 175, height: 600, fill: '#49283c'
});

document.addEventListener('keydown', (event) => {
  if (event.code === 'KeyS') {
    console.log(svg.element.outerHTML);
  }
})