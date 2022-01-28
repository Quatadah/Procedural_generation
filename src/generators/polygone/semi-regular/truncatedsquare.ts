import * as color from "../../../types/color";
import * as transform from "../../../filters/transform";
import * as texture from "../../../types/texture";
import { texRepeat } from "../../general";
import { texMonochrome} from "../../monochrome"

// Truncated Square
export function truncatedSquarePattern(c1: texture.texture, c2: texture.texture, c3: texture.texture): texture.texture {
    return (x, y) => {
        let c = (x > 0.5) ? c1 : c2;
        x = (x % 0.5) * 2;
        let a = 1 / (1 + Math.sqrt(2));
        let b = a / Math.sqrt(2);
        if (b <= x + y && x + y <= 2 - b && b - 1 <= y - x && y - x <= 1 - b)
            return c(x,y);
        x = ((x < 0.5) ? (Math.sqrt(2)*x/b/2 + 0.5) : Math.sqrt(2)*(x-(1-b))/b/2 - (Math.sqrt(2)-1)/2);
        y = ((y < 0.5) ? (Math.sqrt(2)*y/b/2 + 0.5) : Math.sqrt(2)*(y-(1-b))/b/2 - (Math.sqrt(2)-1)/2);
        return transform.rotate([c3], 0.5, 0.5, Math.PI/2)(x, y);
    };
}

export function textruncatedSquareBoard(xstep: number, ystep: number, c1: color.color, c2: color.color, c3: color.color): texture.texture {
    return texRepeat(truncatedSquarePattern(texMonochrome(c1), texMonochrome(c2), texMonochrome(c3)), 2 * xstep, ystep, 0.5, 0);
}
