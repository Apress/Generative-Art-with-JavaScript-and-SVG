import { SvJs } from '../../node_modules/svjs/src/index.js';

const svgSize = window.innerWidth > window.innerHeight ? window.innerHeight : window.innerWidth;
const bgColor = '#181818';

const svg = new SvJs().addTo(document.getElementById('container'));
svg.set({ viewBox: '0 0 1000 1000', width: svgSize, height: svgSize });

const rect = svg.create('rect');
rect.set({ x: 0, y: 0, width: 1000, height: 1000, fill: bgColor });

const webSafeColours = createWebSafeColours();
const spiral = svg.create('g');

let angle = 0;
let radius = 5;
let increment = (Math.PI * 12) / webSafeColours.length;
for (let i = 0; i < webSafeColours.length; i += 1) {
  angle = increment * i;
  let x = Math.cos(angle) * radius;
  let y = Math.sin(angle) * radius;
  let circle = spiral.create('circle');
  circle.set({
    cx: x,
    cy: y, 
    r: 1 + (i / 20),
    transform: 'translate(500, 500)',
    fill: webSafeColours[i]
  });
  radius += 2;
}

/**
 * Creates an array of the 216 web-safe colours.
 * 
 * @returns {array} The array of colours in hexidecimal string format.
 */
function createWebSafeColours() {
  const steps = ['00', '33', '66', '99', 'CC', 'FF'];
  const colours = [];

  for (let r = 0; r < steps.length; r += 1) {
    for (let g = 0; g < steps.length; g += 1) {
      for (let b = 0; b < steps.length; b += 1) {
        let colour = `#${steps[r]}${steps[g]}${steps[b]}`;
        colours.push(colour);
      }
    }
  }

  return colours;
}
