import { SvJs } from '../../node_modules/svjs/src/index.js';

const svgSize = window.innerWidth > window.innerHeight ? window.innerHeight : window.innerWidth;

const svg = new SvJs().addTo(document.getElementById('container'));
svg.set({ width: svgSize, height: svgSize, viewBox: '0 0 1000 1000' });

const rect = svg.create('rect');
rect.set({ x: 0, y: 0, width: 1000, height: 1000, fill: '#181818' });