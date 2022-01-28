import * as color from "../../../types/color";
import * as transform from "../../../filters/transform";
import * as texture from "../../../types/texture";
import { texRepeat } from "../../general";
import {texMonochrome} from "../../monochrome"


// Triangular

export function trianglePattern(c1: transform.pattern, c2: transform.pattern): transform.pattern {
    return (x, y) => (y - 2 * Math.abs(x - 0.5) >= 0) ? c1(x, y) : c2((x+0.5)%1, y);
}

export function texTriangleBoard(xstep: number, ystep: number, c1: color.color, c2: color.color): texture.texture {
    return texRepeat(trianglePattern(texMonochrome(c1), texMonochrome(c2)), xstep, ystep, 0.5, 0);
}
