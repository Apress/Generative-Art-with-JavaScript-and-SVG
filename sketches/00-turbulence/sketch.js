// Import the SvJs library.
import { SvJs } from '../../../svjs/src/index.js';

const svg = new SvJs().addTo(document.getElementById('container'));
const types = document.getElementsByName('type');
const tiles = document.getElementsByName('stitchTiles');
const freq = document.getElementById('freq');
const octs = document.getElementById('octaves');
const seed = document.getElementById('seed');


svg.set({ width: '250px', height: '250px', viewBox: '0 0 1000 1000' });

svg.create('rect').set({ x: 0, y: 0, width: 1000, height: 1000, fill: "#181818" });

let filter = svg.createFilter('noise');

let turbulence = filter.create('feTurbulence').set({
	type: 'turbulence',
  baseFrequency: 0.01,
  seed: 1,
  numOctaves: 1,
	stitchTiles: 'stitch',
  result: 'turbulence'
});

filter.create('feComposite').set({
  in: 'turbulence',
  in2: 'SourceGraphic',
  operator: 'atop',
  result: 'atop'
});

svg.create('rect').set({
	x: 150,
	y: 150,
	width: 700,
	height: 700,
	fill: "#fff",
	rx: 20,
	ry: 20,
	filter: 'url(#noise)'
});

types.forEach((type) => {
	type.addEventListener('change', () => {
		if (type.checked) turbulence.set({ type: type.value });
	});
});

freq.addEventListener('input', () => {
	turbulence.set({ baseFrequency: freq.value });
	document.getElementById('freq-val').innerHTML = freq.value;
});

octs.addEventListener('input', () => {
	turbulence.set({ numOctaves: octs.value });
	document.getElementById('octaves-val').innerHTML = octs.value;
});

seed.addEventListener('input', () => {
	turbulence.set({ seed: seed.value });
	document.getElementById('seed-val').innerHTML = seed.value;
});

tiles.forEach((tile) => {
	tile.addEventListener('change', () => {
		if (tile.checked) turbulence.set({ stitchTiles: tile.value });
	});
});



