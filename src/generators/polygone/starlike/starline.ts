import * as color from "../../../types/color";
import * as texture from "../../../types/texture";
import { texRepeat } from "../../general";
import { drawStarLine } from "./starpatterns";

export function texStarLine(n: number, d: number, k: number, size: number, xstep: number, ystep: number, bgcolor: color.color, bcolorf: ((x: number) => color.color)): texture.texture {
    return texRepeat(drawStarLine(n, d, k, size, bcolorf)((x, y) => bgcolor), xstep, ystep, 0, 0);
};

export function texStarLineSimple(n: number, d: number, k: number, size: number, xstep: number, ystep: number, bgcolor: color.color, bdcolor: color.color = color.WHITE): texture.texture {
    return texRepeat(drawStarLine(n, d, k, size, (x) => bdcolor)((x, y) => bgcolor), xstep, ystep, 0, 0);
};

export function texStarLineBorder(n: number, d: number, k: number, size: number, xstep: number, ystep: number, bgcolor: color.color, bdcolor1: color.color = color.BLACK, bdcolor2: color.color = color.WHITE): texture.texture {
    return texRepeat(drawStarLine(n, d, k, size, (x) => ((x < 0.2) ? bdcolor1 : bdcolor2))((x, y) => bgcolor), xstep, ystep, 0, 0);
};

export function texStarLineDouble(n: number, d: number, k: number, size: number, xstep: number, ystep: number, bgcolor: color.color, bdcolor1: color.color = color.BLACK, bdcolor2: color.color = color.WHITE): texture.texture {
    return texRepeat(drawStarLine(n, d, k, size, (x) => ((x < 0.2) ? bdcolor1 : ((x > 0.8) ? bdcolor1 : bdcolor2)))((x, y) => bgcolor), xstep, ystep, 0, 0);
};
