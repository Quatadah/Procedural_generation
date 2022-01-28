
import * as texture from "../types/texture";
import * as color from "../types/color";

export type pattern = ((x: number, y: number) => color.color);

export type transformation = ((f: texture.texture) => texture.texture);

export function translate([tex]: texture.texture[], a: number, b: number): texture.texture {
    return (x: number, y: number) => tex(x + a, y + b);
}

export function rotate([tex]: texture.texture[], xc: number, yc: number, angle: number): texture.texture {
    return (x, y) => {
        x = x - xc;
        y = y - yc;
        let xr = x * Math.cos(angle) - y * Math.sin(angle);
        let yr = x * Math.sin(angle) + y * Math.cos(angle);
        
        return tex(xr + xc, yr + yc);
    };
}

export function symetryX([tex]: texture.texture[], xc: number): texture.texture {
    return (x, y) => tex(2 * xc - x, y);
}

export function symetryY([tex]: texture.texture[], yc: number): texture.texture {
    return (x, y) => tex(x, 2 * yc - y);
}