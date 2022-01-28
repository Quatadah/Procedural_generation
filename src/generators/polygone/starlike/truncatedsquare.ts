import * as texture from "../../../types/texture";
import { truncatedSquarePattern } from "../semi-regular/truncatedsquare"
import * as color from "../../../types/color";
import { starLineFilledPattern } from "./starpatterns";
import { texRepeat } from "../../general";


export function texTruncatedSquareStar(xstep : number, ystep : number, bgcolor : color.color, bdcolor1 : color.color, bdcolor2 : color.color, c1 : color.color, c2 : color.color, c3 : color.color): texture.texture {
    let pat1 = starLineFilledPattern(8, 3, 1, 0.05, bgcolor, (x) => ((x < 0.1) ? bdcolor1 : bdcolor2), [c3 , c1, c2]);
    let pat3 = starLineFilledPattern(8, 3, 1, 0.05, bgcolor, (x) => ((x < 0.1) ? bdcolor1 : bdcolor2), [c3 , c2, c1]);
    let pat2 = starLineFilledPattern(8, 3, 2, 0.1, bgcolor, (x) => ((x < 0.1) ? bdcolor1 : bdcolor2), [c1, c2, c3]);
    return texRepeat(truncatedSquarePattern(pat1, pat3, pat2), 3 * xstep, ystep, 1.5 / 3, 0);
};


