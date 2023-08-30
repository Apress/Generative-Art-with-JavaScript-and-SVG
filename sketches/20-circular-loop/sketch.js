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

// Randomise some variables.
let numCircles = 35;//Gen.random(20, 35);
let baseRadius = Gen.random(5, 25, true);
let hue = Gen.random(0, 360);

let animations = [];
let isPaused = false;

// Arrange and animate the circles.
for (let i = 0; i < numCircles; i += 1) {

  // Create the circle, but don't set the position yet.
  let circle = svg.create('circle').set({
    r: baseRadius, cx: 500, cy: 500,
    fill: 'none',
    stroke: `hsl(${hue} 80% 80% / 0.75)`,
    transform_origin: '500 500'
  });

  // Calculate the current angle. 
  let angle = Math.PI * 2 / numCircles * i;

  // Get the sine and cosine of the angle.
  let sin = Math.sin(angle);
  let cos = Math.cos(angle);

  // Map the sine and cosine to the desired range.
  let cx = Gen.map(sin, -1, 1, 150, 850, false);
  let cy = Gen.map(cos, -1, 1, 150, 850, false);

  // Set the initial and target radii.
  let r1 = baseRadius * 2 + (i * 10);
  let r2 = baseRadius / (i + 10);

  // Move from (500, 500) to (cx, cy), reduce the radius, rotate.
  animations.push(circle.element.animate({
    cx: [500, cx, 500],
    cy: [500, cy, 500],
    r: [r1, r2, r1],
    transform: ['rotate(0deg)', 'rotate(360deg)']
  }, {
    duration: 10000,
    iterations: Infinity,
    easing: ['ease-in-out']
  }));

  // Increment the hue.
  hue = (hue % 360) + (180 / numCircles);
}

// Save the root svg as a downloadable file.
document.addEventListener('keydown', (event) => {
  let key = event.key.toLowerCase();
  if (key === 's') svg.save();
});


document.addEventListener('keydown', (event) => {
  let key = event.key.toLowerCase();
  if (key === 'p') {
    animations.forEach((animation) => {
      if (isPaused) {
        animation.pause();
      } else {
        animation.play();
      }
    }); 
    isPaused = !isPaused; 
  }
});

