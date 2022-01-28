import * as color from "./color";
import * as image from "./image";

export type texture = (x: number, y: number) => color.color;

function roundColor(c: color.color) {
    return color.createColor(Math.round(color.getR(c)), Math.round(color.getG(c)), Math.round(color.getB(c)), Math.round(color.getA(c)));
}

export function texture2image(tex: texture, width: number, height: number) {
    return image.createImage(width, height, Array.from({ length: height }, (_, y) => Array.from({ length: width }, (_, x) => roundColor(tex(x, y)))));
}