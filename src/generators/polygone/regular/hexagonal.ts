import * as color from "../../../types/color";
import * as transform from "../../../filters/transform";
import * as texture from "../../../types/texture";
import { texRepeat } from "../../general";
import {texMonochrome} from "../../monochrome"


// Hexagonal

function HexagonalPattern(c1: transform.pattern, c2: transform.pattern, c3: transform.pattern): transform.pattern {
    return (x, y) => {
        let clr;
        if(x < 1/3){
            clr = [c1, c2, c3];
        }else if(x < 2/3){
            clr = [c2, c3, c1];
        }else{
            clr = [c3, c1, c2]
        }
        x = (x*3) % 1;
        if (y <= 5 / 8) {
            return clr[0](x,(8 * y+ 3)/11);
        }
        x = 2*x;
        y = (y - 5 / 8) * 8 / 3;
        if (x <= 1) {
            return (x >= y) ? clr[0](x/2, (8 + 3*y)/11) : clr[1](0.5 + x/2, 3/11 * y);
        }
        return (2 - x >= y) ? clr[0](x/2, (8 + 3*y)/11) : clr[2](x/2 - 0.5, 3/11 * y);
    };
}

export function texHexagoneBoard(xstep: number, ystep: number, c1: color.color, c2: color.color, c3: color.color): texture.texture {
    return texRepeat(HexagonalPattern(texMonochrome(c1), texMonochrome(c2), texMonochrome(c3)), 3 * xstep, ystep, 1.5 / 3, 0);
}
