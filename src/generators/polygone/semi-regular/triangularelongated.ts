import * as color from "../../../types/color";
import * as transform from "../../../filters/transform";
import * as texture from "../../../types/texture";
import { texRepeat } from "../../general";
import { trianglePattern } from "../regular/triangular"
import { checkerBoardPattern } from "../regular/checkerBoard"
import { texMonochrome} from "../../monochrome"


// Triangular Elongated
function triangularElongatedPattern(c1: color.color, c2: color.color, c3: color.color, c4: color.color): transform.pattern {
    return (x, y) => {
        if (y <= 0.5)
            return checkerBoardPattern(texMonochrome(c1), texMonochrome(c2))(x, 2 * y);
        return trianglePattern(texMonochrome(c3), texMonochrome(c4))((2 * x + 0.5) % 1, 2 * y - 1);
    };
}

export function texTriangularElongatedBoard(xstep: number, ystep: number, c1: color.color, c2: color.color, c3: color.color, c4: color.color): texture.texture {
    return texRepeat(triangularElongatedPattern(c1, c2, c3, c4), 2 * xstep, 2 * ystep, 0.25, 0);
}
