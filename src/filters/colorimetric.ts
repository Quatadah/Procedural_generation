import * as color from "../types/color";
import * as texture from "../types/texture";

function calculContrast(c: color.color, factor: number): color.color {
    let r = color.getR(c);
    let g = color.getG(c);
    let b = color.getB(c);
    let a = color.getA(c);

    let newR = Math.max(Math.min(factor * (r - 128) + 128, 255), 0);
    let newG = Math.max(Math.min(factor * (g - 128) + 128, 255), 0);
    let newB = Math.max(Math.min(factor * (b - 128) + 128, 255), 0);

    return color.createColor(newR, newG, newB, a);
}

export function contrast([tex]: texture.texture[], contrast: number): texture.texture {
    let f = (259 * (contrast + 255)) / (255 * (259 - contrast));
    return (x: number,y: number) => calculContrast(tex(x, y), f);
}