import { SvJs, Gen } from '../../node_modules/svjs/src/index.js';

// Parent SVG.
const svg = new SvJs().addTo(document.getElementById('container'));

// Viewport and viewBox (1:1 aspect ratio).
const svgSize = Math.min(window.innerWidth, window.innerHeight);
svg.set({ width: svgSize, height: svgSize, viewBox: '0 0 1000 1000' });

// Background.
svg.create('rect').set({
  x: 0, y: 0, width: 1000, height: 1000, fill: '#181818'
});

// Create a frame to act as the boundary.
let frameSize = Gen.random(350, 700);
let frame = svg.create('rect').set({
  x: (1000 - frameSize) / 2,
  y: (1000 - frameSize) / 2,
  width: frameSize,
  height: frameSize,
  fill: '#252525',
  stroke: `hsl(${Gen.random(0, 360)} 80% 80% / 0.25)`,
  stroke_width: frameSize / 10,
});

// Randomise the number of circles and set up an empty array.
let numCircles = Math.floor(frameSize / 20);
let circles = [];

// Populate this array.
for (let i = 0; i < numCircles; i += 1) {

  // Randomise the radius relative to the frame size.
  let radius = Gen.random(frameSize / 100, frameSize / 25);

  // Create variables to control the speed on the x and y axes.
  let velocityX = Gen.random(0.1, 5, true);
  let velocityY = Gen.random(0.1, 5, true);

  // Apply the above variables and randomise the hue.
  let circle = svg.create('circle').set({
    cx: 500,
    cy: 500,
    r: radius,
    vx: Gen.chance() ? velocityX : -velocityX,
    vy: Gen.chance() ? velocityY : -velocityY,
    fill: `hsl(${Gen.random(0, 360)} 80% 80% / 0.5)`
  });

  // Store the circle in the array.
  circles.push(circle);
}

// Get the frame start point (x or y) and the inset.
let frameEdge = Number(frame.get('x'));
let frameInset = Number(frame.get('stroke-width')) / 2;

// The animation loop.
function animate() {

  // Check collisions for each circle.
  circles.forEach((circle) => {

    // Calculate the lower and upper bounds for each circle.
    let radius = Number(circle.get('r'));
    let lowerBound = frameEdge + radius + frameInset;
    let upperBound = frameEdge + frameSize - radius - frameInset;

    // Retrieve the position and velocity.
    let cx = Number(circle.get('cx'));
    let cy = Number(circle.get('cy'));
    let vx = Number(circle.get('vx'));
    let vy = Number(circle.get('vy'));

    // Check for collisions, and if found reverse the polarity.
    if (cx <= lowerBound || cx >= upperBound) vx = -vx;
    if (cy <= lowerBound || cy >= upperBound) vy = -vy;

    // Update the position.
    cx += vx;
    cy += vy;

    // Set the new values.
    circle.set({ cx: cx, cy: cy, vx: vx, vy: vy }); 
  });

  // The recursive bit.
  requestAnimationFrame(animate);
}

// Call the animation.
animate();

// Save the root svg as a downloadable file.
document.addEventListener('keydown', (event) => {
  let key = event.key.toLowerCase();
  if (key === 's') svg.save();
});