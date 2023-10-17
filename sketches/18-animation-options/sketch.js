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

// Arrays to contain our shapes and their colours.
let palette = ['#34d399', '#6ee7b7', '#a7f3d0', '#d1fae5'];
let shapes = [];

// Initialise our four shapes.
for (let i = 0; i < 4; i += 1) {
  let size = 500 - (i * 125);
  let position = 250 + (i * 62.5);
  let shape = svg.create('rect').set({
    x: position,
    y: position,
    width: size,
    height: size,
    fill: palette[i],
    transform_origin: '50% 50%',
    transform: 'rotate(45)'
  });
  shapes.push(shape);
}

//Set an id for our first shape.
shapes[0].set({ id: 'cssShape' });

// Animate this shape with CSS.
svg.create('style').content(`
  @keyframes scaleRotate {
    0% { transform: rotate(0) scale(1, 1) }
    50% { transform: rotate(180deg) scale(0.75, 1.5) }
    100% { transform: rotate(360deg) scale(1, 1) }
  }

  #cssShape {
    animation-name: scaleRotate;
    animation-duration: 5s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }
`);

// Rotate the second shape using SMIL.
shapes[1].create('animateTransform').set({
  attributeName: 'transform',
  type: 'rotate',
  from: '0',
  to: '360',
  dur: '5s',
  repeatCount: 'indefinite'
});

// Scale the shape using SMIL.
shapes[1].create('animateTransform').set({
  attributeName: 'transform',
  type: 'scale',
  values: '1 1; 0.75 1.5; 1 1',
  dur: '5s',
  additive: 'sum',
  repeatCount: 'indefinite'
});

// Using the Web Animations API to scale and rotate our third shape.
let keyframes = {
  transform: [
    'rotate(0deg) scale(1, 1)',
    'rotate(180deg) scale(0.75, 1.5)',
    'rotate(360deg) scale(1, 1)'
  ]
};

let options = {
  duration: 5000,
  iterations: Infinity 
};

shapes[2].animate(keyframes, options);

// Variables to set outside the animation loop.
let isPositive = true;
let scale = 0, tick = 0, prevTime = 0;

// Animate the final shape using requestAnimationFrame.
function animate(time) {

  // Prevent errors when the time is undefined on first frame.
  if (time === undefined) time = 0;

  // Rotate 360° in 5000ms: 360/5000 = 0.072.
  let angle = time * 0.072;

  // We need a constant tick value tied to the time that doesn't increment indefinitely.
  tick = time - prevTime;

  // Scale by 0.5 in 2500ms: 0.5/2500 = 0.0002.
  scale = isPositive ? scale + (tick * 0.0002) : scale - (tick * 0.0002);

  // Apply the rotation and scale values.
  shapes[3].set({
    transform: `rotate(${angle}) scale(${1 - scale}, ${1 + scale})`
  });

  // Flip the polarity if the scale value falls outside these bounds.
  if (scale < 0 || scale > 0.5) isPositive = !isPositive;

  // Capture the time before it increments.
  prevTime = time;

  // The recursive bit.
  requestAnimationFrame(animate);
}

animate();

