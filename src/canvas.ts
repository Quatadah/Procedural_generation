import { main, imageToCanvas } from "./main";

const fs = require('fs');
const { createCanvas } = require('canvas');

let canvas = createCanvas();
imageToCanvas(canvas, main());

let buffer = canvas.toBuffer('image/png');
fs.writeFileSync('result.png', buffer);