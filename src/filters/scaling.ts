import * as color from "../types/color";
import * as texture from "../types/texture";
import * as interpolation from "../types/interpolation"

export function filterUpScale([tex]: texture.texture[], factor: number, interpol: interpolation.interpolation) {
    function texture(x: number, y: number): color.color {
        const fx = Math.floor(x / factor);
        const fy = Math.floor(y / factor);
        const tx = x / factor - fx;
        const ty = y / factor - fy;

        const values = Array.from({ length: 2 * (1 + interpol.params) }, (_, i) => Array.from({ length: 2 * (1 + interpol.params) }, (_, j) => tex(fx + j, fy + i)));

        return interpolation.interpolateColors(interpol, values.map((v: Array<color.color>) => interpolation.interpolateColors(interpol, v, tx)), ty);
    }

    return texture;
}