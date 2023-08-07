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

let numCircles = Gen.random(5, 30, false);
let hue1 = Gen.random(0, 360, false);
let hue2 = Gen.random(0, 360, false);

for (let i = 0; i < numCircles; i += 1) {
  
  let theta = Math.PI * 2 / numCircles * i;
  let cx = Gen.mapRange(Math.sin(theta), -1, 1, 200, 800, false);
  let cy = Gen.mapRange(Math.cos(theta), -1, 1, 200, 800, false);

  let circle1 = svg.create('circle').set({
    cx: cx, cy: cy, fill: 'none',
    stroke: `hsl(${hue1} 80% 80% / 0.6)`, transform_origin: '500 500'
  });

  let circle2 = svg.create('circle').set({
    cx: cx, cy: cy, fill: 'none',
    stroke: `hsl(${hue2} 80% 80% / 0.6)`, transform_origin: '500 500'
  });

  let timing = {
    duration: 10000,
    iterations: Infinity,
    easing: ['ease-in-out']
  };

  circle1.animate({
    cx: [cx, 500, cx],
    cy: [cy, 500, cy],
    r:  [25, 200, 25],
    transform: ['rotate(0deg)', 'rotate(360deg)']
  }, timing );

  circle2.animate({
    cx: [cx, 500, cx],
    cy: [cy, 500, cy],
    r:  [50, 100, 50],
    transform: ['rotate(360deg)', 'rotate(0deg)']
  }, timing );

  hue1 = (hue1 % 360) ? hue1 + 3 : 0;
  hue2 = (hue2 % 360) ? hue2 - 3 : 0;
}


// let radius = 150;
// let numCircles = 10;
// let circlesArray = [];
// let angle = 0;

// for (let i = 0; i < numCircles; i += 1) {
//   let circle = svg.create('circle').set({
//     r: radius, fill: '#cccccc22'
//   });
//   circlesArray.push(circle);
// }

// function animate() {
//   let ox = Gen.mapRange(Math.sin(angle), -1, 1, 250, 750, false);
//   let oy = Gen.mapRange(Math.cos(angle), -1, 1, 250, 750, false);

//   circlesArray.forEach((circle, i) => {
//     let a = Math.PI * 2 / numCircles * i;
//     let cx = Gen.mapRange(Math.sin(a), -1, 1, ox, oy, false);
//     let cy = Gen.mapRange(Math.cos(a), -1, 1, ox, oy, false);
//     circle.set({ cx: cx, cy: cy });
//   });

//   angle += 0.01;

//   requestAnimationFrame(animate);
// }

// animate();

