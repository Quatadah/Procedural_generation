import * as color from "../../../types/color";
import * as transform from "../../../filters/transform";
import * as texture from "../../../types/texture";
import { texRepeat } from "../../general";
import { trianglePattern } from "../regular/triangular";
import { texMonochrome} from "../../monochrome"

// Hexagonal Softened

function softenedSquarePattern(c1: color.color, c2: color.color, c3: color.color): transform.pattern {
  return (x, y) => {

    if (x > 1 / 2 && y > 1 / 2)
      [x, y] = [x - 1 / 2, y - 1 / 2];

    if (x > 1 / 2)
      [x, y] = [y, x - 1 / 2];

    if (y > 1 / 2)
      [x, y] = [y - 1 / 2, x];

    x = 2 * x
    y = 2 * y

    if (1 / 3 < x && x < 2 / 3 && 1 / 3 < y && y < 2 / 3)
      return c3;


    let l1: color.color = c1;
    if (x > 2 / 3 && y <= 2 / 3) {
      let a: number = 1 - x;
      x = y;
      y = a;
    }

    if (x <= 1 / 3 && y > 1 / 3) {
      let a: number = x;
      x = 1 - y;
      y = a;
      l1 = c2;
    }

    if (x > 1 / 3 && y > 2 / 3) {
      x = 1 - x;
      y = 1 - y;
      l1 = c2;
    }

    return trianglePattern(texMonochrome(c3), texMonochrome(l1))(3 / 2 * y, 3 / 2 * x);
  };
}

export function texSoftenedSquare(xstep: number, ystep: number, c1: color.color, c2: color.color, c3: color.color): texture.texture {
  return texRepeat(softenedSquarePattern(c1, c2, c3), 4 * xstep, 4 * ystep, 0, 0);
}
