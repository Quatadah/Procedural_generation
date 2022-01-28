import * as texture from "../../../types/texture";
import { texRepeat } from "../../general";
import { starPatternfilled } from "./starpatterns"
import * as color from "../../../types/color";

export function texStar(n: number, d: number, e: number, xstep: number, ystep: number, bgcolor: color.color, colors: Array<color.color>): texture.texture {
    return texRepeat(starPatternfilled(n, d, e, bgcolor, colors), xstep, ystep, 0, 0);
};

