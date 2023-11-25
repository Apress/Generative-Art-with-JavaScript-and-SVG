import { SvJs } from '../../node_modules/svjs/src/index.js';

// Viewport size (1:1 aspect ratio).
const svgSize = Math.min(window.innerWidth, window.innerHeight);

// Parent SVG.
const svg = new SvJs().addTo(document.getElementById('container'));
svg.set({ width: svgSize, height: svgSize, viewBox: '0 0 1000 1000' });

// Background.
svg.create('rect').set({
	x: 0, y: 0, width: 1000, height: 1000, fill: '#181818'
});

// Elliptical Arc Curve.
let arc = svg.create('path').set({
	fill: 'none',
	stroke: 'purple',
	stroke_width: 5,
	d: 'M 300 500 A 250 250 0 0 0 700 500'
});

// UI controls.
let radiusX = document.getElementById('rx');
let radiusY = document.getElementById('ry');
let largeArc = document.getElementById('large-arc');
let sweep = document.getElementById('sweep');

// UI update function.
function updateUI() {
	let rx = radiusX.value;
	let ry = radiusY.value;
	let la = largeArc.checked ? '1' : '0';
	let sw = sweep.checked ? '1' : '0';
	arc.set({
		d: `M 300 500 A ${rx} ${ry} 0 ${la} ${sw} 700 500`
	});
	document.getElementById('rx-val').innerText = rx;
	document.getElementById('ry-val').innerText = ry;
}

// Attach event listenters to each input.
radiusX.addEventListener('input', () => { updateUI() });
radiusY.addEventListener('input', () => { updateUI() });
largeArc.addEventListener('change', () => { updateUI() });
sweep.addEventListener('change', () => { updateUI() });
