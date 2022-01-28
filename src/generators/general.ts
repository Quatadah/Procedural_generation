import * as texture from "../types/texture"
import * as transform from "../filters/transform";
// GENERAL FUNCTIONS

export function texRepeat(pattern: (transform.pattern), xstep: number, ystep: number, xoff: number, yoff: number): texture.texture {
    return (x: number, y: number) => (pattern(((x / (xstep) + xoff * Math.floor(y / ystep)) % 1 + 1)%1, ((y / ystep + yoff * Math.floor(x / xstep)) % 1 + 1) % 1));
}
