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



// let palette = [
//   '#090607', '#0d9488', '#e15221', '#632a36',
//   '#292357', '#e98d16', '#235ba3', '#cf7e89', 
// ];

// let canvas = svg.create('g');

// canvas.create('rect').set({
//   x: -50, y: -75, width: 450, height: 600, fill: '#fef3c7'
// });

// for (let y = 0; y < 450; y += 50) {
// 	for (let x = 0; x < 350; x += 50) {

//     let rotation = Gen.random([0, 90, 180, 270]);

//     canvas.create('path').set({
//       fill: Gen.random(palette),
//       d: `M ${[x, y]} v 50 h 50 c 0,0 0,-50 -50,-50`,
//       transform: `rotate(${rotation} ${[x + 25, y + 25]})`
//     });
		
// 	}
// }

// canvas.moveTo(500, 500);
