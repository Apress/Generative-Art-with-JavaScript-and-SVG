// Import the SvJs library.
import { SvJs } from '../../node_modules/svjs/src/index.js';

const svg = new SvJs().addTo(document.getElementById('container'));
const minX = document.getElementById('min-x');
const minY = document.getElementById('min-y');
const vbwh = document.getElementById('vbwh');

svg.set({
	width: "250px", // viewport width
	height: "250px", // viewport height
	viewBox: '0 0 1000 1000'
});

svg.create('rect').set({
	x: 0, y: 0, width: 1000, height: 1000, fill: "#eee"
});

svg.create('rect').set({
	x: 200, y: 200, width: 600, height: 600, fill: "crimson", stroke: "gold", stroke_width: 50
});

minX.addEventListener('change', () => {
	svg.set({ viewBox: `${minX.value} ${minY.value} ${vbwh.value} ${vbwh.value}` });
	document.getElementById('min-x-val').innerHTML = minX.value;
});

minY.addEventListener('change', () => {
  svg.set({ viewBox: `${minX.value} ${minY.value} ${vbwh.value} ${vbwh.value}` });
	document.getElementById('min-y-val').innerHTML = minY.value;
});

vbwh.addEventListener('change', () => {
  svg.set({ viewBox: `${minX.value} ${minY.value} ${vbwh.value} ${vbwh.value}` });
	document.getElementById('vbwh-val').innerHTML = vbwh.value;
});

