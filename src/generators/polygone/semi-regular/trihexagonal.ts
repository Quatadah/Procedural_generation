import * as color from "../../../types/color";
import * as transform from "../../../filters/transform";
import * as texture from "../../../types/texture";
import { texRepeat } from "../../general";


// TriHexagonal
export function triHexagonalPattern(c1: color.color, c2: color.color, c3: color.color): transform.pattern {
    return (x, y) => {
        let b = (4 - Math.sqrt(7))/6

        if (x <= b) {
            if (y + 0.5/b * x < 0.5)
                return c2;
            if (y - 0.5/b * x > 0.5)
                return c3;
            return c1;
        }

        if (x <= 1-b)
            return c1;

        if (y - 0.5/b * x < -0.5 * (1 - b)/b)
            return c2;
        if (y + 0.5/b * x > 0.5 *(1+b)/b)
            return c3;
        return c1;
    };
}
export function textriHexagonalBoard(xstep: number, ystep: number, c1: color.color, c2: color.color, c3: color.color): texture.texture {
    return texRepeat(triHexagonalPattern(c1, c2, c3), xstep, ystep, 0.5, 0);
}
