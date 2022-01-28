import * as texture from "../../../types/texture";
import { texRepeat } from "../../general";
import * as color from "../../../types/color";
import { starLineFilledPattern } from "./starpatterns";


export function texStarLineFilled(n: number, d: number, k: number, size: number, xstep: number, ystep: number, bgcolor: color.color, bcolorf: ((x: number) => color.color), colors: Array<color.color>): texture.texture {
    return texRepeat(starLineFilledPattern(n, d, k, size, bgcolor, bcolorf, colors), xstep, ystep, 0.5, 0);
};


export function texStarLineFilledSimple(n: number, d: number, k: number, size: number, xstep: number, ystep: number, bgcolor: color.color, colors: Array<color.color>, bdcolor: color.color = color.WHITE): texture.texture {
    return texRepeat(starLineFilledPattern(n, d, k, size, bgcolor, (x) => bdcolor, colors), xstep, ystep, 0.5, 0);
};


export function texStarLineFilledBorder(n: number, d: number, k: number, size: number, xstep: number, ystep: number, bgcolor: color.color, colors: Array<color.color>, bdcolor1: color.color = color.BLACK, bdcolor2: color.color = color.WHITE): texture.texture {
    return texRepeat(starLineFilledPattern(n, d, k, size, bgcolor, (x) => ((x < 0.2) ? bdcolor1 : bdcolor2), colors), xstep, ystep, 0.5, 0);
};


export function texStarLineFilledDouble(n: number, d: number, k: number, size: number, xstep: number, ystep: number, bgcolor: color.color, colors: Array<color.color>, bdcolor1: color.color = color.BLACK, bdcolor2: color.color = color.WHITE): texture.texture {
    return texRepeat(starLineFilledPattern(n, d, k, size, bgcolor, (x) => ((x < 0.2) ? bdcolor1 : ((x > 0.8) ? bdcolor1 : bdcolor2)), colors), xstep, ystep, 0.5, 0);
};

