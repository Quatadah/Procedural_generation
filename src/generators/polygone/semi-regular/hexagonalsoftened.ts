import * as color from "../../../types/color";
import * as transform from "../../../filters/transform";
import * as texture from "../../../types/texture";
import { texRepeat } from "../../general";
import { triHexagonalPattern } from "./trihexagonal";
import { trianglePattern } from "../regular/triangular";
import {texMonochrome} from "../../monochrome"
// Hexagonal Softened

function softenedHexagonalPattern(c1: color.color, c2: color.color, c3: color.color): transform.pattern {
  return (x, y) => {
    if (x < 2 / 7) {
      x = (7 / 2 * x) % 1;
      if (y <= 2 / 3) {
        y = y * 3 / 2;
        return triHexagonalPattern(c1, c2, c3)(x, y);
      }

      return trianglePattern(texMonochrome(c3), texMonochrome(c2))((2 * x) % 1, (y - 2 / 3) * 3);
    }
    if (x < 2.5 / 7) {
      let t: number;
      if (y <= 1 / 3) {
        t = 0;
      } else if (y <= 2 / 3) {
        t = 1;
      } else {
        t = 2;
      }
      return trianglePattern(texMonochrome(c2), texMonochrome(c3))((7 * (x - 2 / 7) + 0.5 + t * 0.5) % 1, 1 - (y * 3) % 1);
    }
    if (x < 4.5 / 7) {
      if (y < 1 / 3)
        return trianglePattern(texMonochrome(c2), texMonochrome(c3))((7 * (x - 2.5 / 7)) % 1, 1 - (y * 3) % 1);
      return triHexagonalPattern(c1, c2, c3)((7 / 2 * (x - 2.5 / 7)) % 1, 3 / 2 * (y - 1 / 3));
    }

    if (y < 1 / 3) {
      if (x < 6.5 / 7) {
        return triHexagonalPattern(c1, c2, c3)((7 / 2 * (x - 4.5 / 7)) % 1, 3 / 2 * (y + 1 / 3));
      }
      return trianglePattern(texMonochrome(c2), texMonochrome(c3))((7 * (x - 4 / 7) + 0.5) % 1, 1 - (y * 3) % 1);
    }
    if (y < 2 / 3) {
      return trianglePattern(texMonochrome(c2), texMonochrome(c3))((7 * (x - 4 / 7)) % 1, 1 - (y * 3) % 1);
    }
    if (x < 5 / 7) {
      return trianglePattern(texMonochrome(c2), texMonochrome(c3))((7 * (x - 4 / 7) + 0.5) % 1, 1 - (y * 3) % 1);
    }
    return triHexagonalPattern(c1, c2, c3)((7 / 2 * (x - 5 / 7)) % 1, 3 / 2 * (y - 2 / 3));
  };
}

export function texSoftenedHexagone(xstep: number, ystep: number, c1: color.color, c2: color.color, c3: color.color): texture.texture {
  return texRepeat(softenedHexagonalPattern(c1, c2, c3), 4 * xstep, 4 / 3 * ystep, 13 / 14, 0);
}
