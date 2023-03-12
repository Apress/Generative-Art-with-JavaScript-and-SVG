import { SvJs, Gen } from '../../../svjs/src/index.js';

// Viewport size (1:1 aspect ratio).
const svgSize = window.innerWidth > window.innerHeight ? window.innerHeight : window.innerWidth;

// Parent SVG.
const svg = new SvJs().addTo(document.getElementById('container'));
svg.set({ width: svgSize, height: svgSize, viewBox: '0 0 1000 1000' });

// Background.
svg.create('rect').set({
	x: 0, y: 0, width: 1000, height: 1000, fill: '#181818'
});

let iterations = Gen.random(250, 500, false);
let elements = ['circle', 'line', 'rect'];

for (let i = 0; i < iterations; i += 1) {
	let element = Gen.random(elements);
	let x = Gen.random(200, 800);
	let y = Gen.random(200, 800);
	let fill = `hsl(${Gen.random(120, 240)} 80% 80% / ${Gen.random(5, 40)}%)`;
	let stroke = `hsl(${Gen.random(0, 120)} 80% 80% / ${Gen.random(5, 40)}%)`;
	let strokeWidth = `${Gen.random(1, 3)}`;
	let props;

	switch(element) {
		case 'circle':
			props = {
				cx: x,
				cy: y,
				r: Gen.random(1, 10),
				fill: fill,
				stroke: stroke,
				stroke_width: strokeWidth
			};
			break;
		case 'line':
			props = {
				x1: x,
				y1: y,
				x2: x + (Gen.random(-25, 25)),
				y2: y + (Gen.random(-25, 25)),
				stroke: stroke
			};
			break;
		case 'rect':
			props = {
				x: x,
				y: y,
				width: Gen.random(5, 25),
				height: Gen.random(5, 25),
				fill: fill,
				stroke: stroke,
				stroke_width: strokeWidth,
				transform: `rotate(${Gen.random(0, 360)} 500 500)`
			}
	}

  svg.create(element).set(props);
}
