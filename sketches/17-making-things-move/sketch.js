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
    transform_origin: '50% 50%'
  });
  shapes.push(shape);
}

// Set an id for our first shape.
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

let scaleValues = [];
for (let i = 0.0; i <= 0.5; i += 0.01) scaleValues.push(i.toFixed(2));
console.log(scaleValues.reverse());
console.log(scaleValues.reverse());

shapes[2].animate(keyframes, options);

// Animate the last shape using requestAnimationFrame.
function animate(timeStamp) {

  // Prevent errors when timeStamp is undefined on first frame.
  if (timeStamp === undefined) timeStamp = 0;

  // Rotate 360° in 5000ms: 360/5000 = 0.072.
  let angle = timeStamp * 0.072;

  // Apply the rotation.
  shapes[3].set({ transform: `rotate(${angle})` });

  // The recursive bit.
  requestAnimationFrame(animate);
}

animate();

