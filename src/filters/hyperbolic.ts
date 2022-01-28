import * as texture from "../types/texture"
import * as color from "../types/color";
import { texMonochrome } from "../generators/monochrome";

export function hyperbolic([tex, bgtex = texMonochrome(color.WHITE)]: texture.texture[], r: number, R: number): texture.texture {
    return (x: number, y: number) => {
        x = (x - r);
        y = (y - r);
        if ((x * x + y * y) >= r * r)
            return bgtex(x, y);
        let n = Math.sqrt(r * r - (x * x + y * y)) / R;
        return tex(x / n, y / n);
    };
};
