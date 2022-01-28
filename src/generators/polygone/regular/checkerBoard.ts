import * as color from "../../../types/color";
import * as transform from "../../../filters/transform";
import * as texture from "../../../types/texture";
import { texRepeat } from "../../general";
import {texMonochrome} from "../../monochrome"

// CheckerBoard

export function checkerBoardPattern(c1: transform.pattern, c2: transform.pattern): transform.pattern {
    return (x, y) => ((x < 0.5) ? c1(2*x, y) : c2(2 * (x - 0.5), y));
}

export function texCheckerBoard(xstep: number, ystep: number, c1: color.color, c2:color.color): texture.texture {
    return texRepeat(checkerBoardPattern(texMonochrome(c1), texMonochrome(c2)), 2 * xstep, ystep, 0.5, 0);
}
