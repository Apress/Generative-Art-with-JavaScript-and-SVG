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

svg.create('style').content(`
  path {
    fill: none;
    stroke-width: 5
  }
`);

svg.create('path').set({
  stroke: 'red',
  d: 'M 350 500 A 160 80 0 0 0 550 500'
});

svg.create('path').set({
  stroke: 'yellow',
  d: 'M 350 500 A 160 80 0 1 0 550 500'
});

svg.create('path').set({
  stroke: 'green',
  d: 'M 350 500 A 160 80 0 0 1 550 500'
});

svg.create('path').set({
  stroke: 'purple',
  d: 'M 350 500 A 160 80 0 1 1 550 500'
});




// function star(cx, cy, r1, r2, nPoints) {
//   let pathData = '';
//   let angle = (Math.PI * 2) / nPoints;
  
//   for (let i = 0; i < Math.PI * 2; i += angle) {
//     let sx = cx + Math.cos(i) * r2;
//     let sy = cy + Math.sin(i) * r2;
//     pathData = (i === 0) ? `M ${sx} ${sy} ` : `${pathData} L ${sx} ${sy} `;
    
//     sx = cx + Math.cos(i + angle / 2) * r1;
//     sy = cy + Math.sin(i + angle / 2) * r1;
//     pathData += `L ${sx} ${sy} `;
//   }

//   pathData += ' Z';

//   return pathData;

// }

// function bezierStar(cx, cy, r1, r2, nPoints) {
//   let pathData = '';
//   let angle = (Math.PI * 2) / nPoints;
  
//   for (let i = 0; i < Math.PI * 2; i += angle) {
//     let sx = cx + Math.cos(i) * r2;
//     let sy = cy + Math.sin(i) * r2;
//     pathData = (i === 0) ? `M ${sx} ${sy} ` : `${pathData} L ${sx} ${sy} `;
    
//     sx = cx + Math.cos(i + angle / 2) * r1;
//     sy = cy + Math.sin(i + angle / 2) * r1;
//     pathData += `L ${sx} ${sy} `;
//   }

//   pathData += ' Z';

//   return pathData;

// }
