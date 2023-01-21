import { SvJs } from '../../node_modules/svjs/src/index.js';

const div = document.getElementById('container');
const svg = new SvJs().set({ width: '150px', height: '150px' }).addTo(div);
svg.create('rect').set({ x: 0, y: 0, width: 150, height: 150, fill: 'cornflowerblue' });

/* Below (commented out) is the same code without SvJs
const div = document.getElementById('stage');
const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
svg.setAttribute('width', '150px');
svg.setAttribute('height', '150px');
div.appendChild(svg);
const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
rect.setAttribute('x', '0');
rect.setAttribute('y', '0');
rect.setAttribute('width', '150');
rect.setAttribute('height', '150');
rect.setAttribute('fill', 'cornflowerblue');
svg.appendChild(rect);
*/
