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

let circleGroup = svg.create('g');
let circles = [];
let diameter = 500;
// let numCircles = 2;
let radius = 15;
//let inc = circumference / numCircles;
let swingPath = (diameter / 2) - (radius / 2);
//let angle = 0;

//for (let i = 0; i < numCircles; i += 1) {
  // let angle = Math.PI * 2 / numCircles * i;
  // let x = Gen.mapRange(Math.sin(angle), -1, 1, 400, 600, false);
  // let y = Gen.mapRange(Math.cos(angle), -1, 1, 500, 700, false);
  // let circle = circleGroup.create('circle').set({
  //   cx: x, cy: y, r: radius, fill: '#ccc'
  // });
  // circles.push(circle);
//}

let numCircles = 10;

for (let i = 0; i < numCircles; i += 1) {
  let angle1 = Math.PI / numCircles * i;
  let angle2 = angle1 + Math.PI;
  let x1 = Gen.mapRange(Math.sin(angle1), -1, 1, 200, 800, false);
  let y1 = Gen.mapRange(Math.cos(angle1), -1, 1, 200, 800, false);
  let x2 = Gen.mapRange(Math.sin(angle2), -1, 1, 200, 800, false);
  let y2 = Gen.mapRange(Math.cos(angle2), -1, 1, 200, 800, false);
  svg.create('line').set({
    x1: x1, y1: y1, x2: x2, y2: y2,
    stroke: '#cccccc11', stroke_width: radius * 2,
    stroke_linecap: 'round'
  });
  let angle3 = Math.PI * 2 / numCircles * i;
  let cx = Gen.mapRange(Math.sin(angle3), -1, 1, 350, 650, false);
  let cy = Gen.mapRange(Math.cos(angle3), -1, 1, 500, 800, false);
  let circle = svg.create('circle').set({
    cx: cx, cy: cy, r: radius, fill: '#ccc'
  });
  let diameter = Gen.dist(x1, y1, x2, y2);
  let offset = Gen.dist(cx, cy, x1, y1);
  offset = (offset / diameter).toFixed(2);
  let offsetArray = [0, offset, 0.99, 1];
  console.log(offsetArray);

  circle.animate({
    cx: [cx, x1, x2, cx],
    cy: [cy, y1, y2, cy],
    offset: offsetArray
  }, { 
    duration: 5000,
    iterations: Infinity
  });
}



function animate () {

  
  // for (let i = 0; i < circles.length; i += 1) {
  //   circles[i].set({
  //     transform: `translate`
  //   })
  // }
 
  angle += 0.01;

  requestAnimationFrame(animate);
}

//animate();

