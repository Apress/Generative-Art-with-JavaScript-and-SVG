import { SvJs, Gen, Noise } from '../../../svjs/src/index.js';

// Viewport size (1:1 aspect ratio).
const svgSize = Math.min(window.innerWidth, window.innerHeight);

// Parent SVG.
const svg = new SvJs().addTo(document.getElementById('container'));
svg.set({ width: svgSize, height: svgSize, viewBox: '0 0 1000 1000' });

// Background.
svg.create('rect').set({
  x: 0, y: 0, width: 1000, height: 1000, fill: '#181818'
});

for (let i = 0; i < 60; i += 1) {
  let star1 = svg.create('path');
  star1.set({
    fill: 'none',
    stroke: `hsl(${60 + (i * 2)} 80% 80% / 0.5)`,
    stroke_width: 0.5,
    d: star(500, 500, 10 + (i * 5), 25 + (i * 5), 12)
  });

  star1.rotate(i * 1.5);

  let star2 = svg.create('path');
  star2.set({
    fill: 'none',
    stroke: `hsl(${360 - (i * 2)} 80% 80% / 0.5)`,
    stroke_width: 0.5,
    d: star(500, 500, 10 + (i * 5), 25 + (i * 5), 12)
  });

  star2.rotate(i * - 1.5);
}


function star(cx, cy, r1, r2, nPoints) {
  let pathData = '';
  let angle = (Math.PI * 2) / nPoints;
  
  for (let i = 0; i < Math.PI * 2; i += angle) {
    let sx = cx + Math.cos(i) * r2;
    let sy = cy + Math.sin(i) * r2;
    pathData = (i === 0) ? `M ${sx} ${sy} ` : `${pathData} L ${sx} ${sy} `;
    
    sx = cx + Math.cos(i + angle / 2) * r1;
    sy = cy + Math.sin(i + angle / 2) * r1;
    pathData += `L ${sx} ${sy} `;
  }

  pathData += ' Z';

  return pathData;

}

function bezierStar(cx, cy, r1, r2, nPoints) {
  let pathData = '';
  let angle = (Math.PI * 2) / nPoints;
  
  for (let i = 0; i < Math.PI * 2; i += angle) {
    let sx = cx + Math.cos(i) * r2;
    let sy = cy + Math.sin(i) * r2;
    pathData = (i === 0) ? `M ${sx} ${sy} ` : `${pathData} L ${sx} ${sy} `;
    
    sx = cx + Math.cos(i + angle / 2) * r1;
    sy = cy + Math.sin(i + angle / 2) * r1;
    pathData += `L ${sx} ${sy} `;
  }

  pathData += ' Z';

  return pathData;

}
