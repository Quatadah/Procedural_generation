
import * as color from "../../../types/color";
import * as transform from "../../../filters/transform";
import * as texture from "../../../types/texture";
import { texRepeat } from "../../general";

// Hexagonal Truncated

function truncatedHexagonalPattern(c1: color.color, c2: color.color, c3: color.color, c4: color.color): transform.pattern {
  return (x, y) => {
    let l1: color.color, l2: color.color, l3: color.color;
    if (x <= 1 / 3) {
      l1 = c1;
      l2 = c2;
      l3 = c3;
      x = 3 * x;
    } else if (x <= 2 / 3) {
      l1 = c2;
      l2 = c3;
      l3 = c1;
      x = 3 * (x - 1 / 3);
    } else {
      l1 = c3;
      l2 = c1;
      l3 = c2;
      x = 3 * (x - 2 / 3);
    }
    let o = Math.PI / 6;
    let a = 1 / (1 + Math.cos(o) + Math.cos(2 * o) + Math.sqrt(3 / 4));
    if (x > 1 / 2) {
      x = 1 - x;
      let l4 = l3;
      l2 = l4;
      l3 = l2;
    }
    let d = a * (1 + 2 * Math.sin(o) + 2 * Math.sin(2 * o));
    x = x * d;

    let b = a * (1 + Math.cos(o) - 1 / Math.tan(2 * o) * Math.sin(o));
    if ((y <= 1 / Math.tan(o) * x + a) && (y <= 1 / Math.tan(2 * o) * x + b) &&
      (y <= a * (1 + Math.cos(o) + Math.cos(2 * o)))) {
      return l1;
    }
    let b2 = 1 - 1 / Math.tan(o) * d / 2
    if ((y >= a * (1 + Math.cos(o))) && (y > 1 / Math.tan(2 * o) * x + b) &&

      (y >= (1 / Math.tan(o) * x + b2))) {
      return l2;
    }

    return c4;
  };
}

export function texTruncatedHexagone(xstep: number, ystep: number, c1: color.color, c2: color.color, c3: color.color, c4: color.color): texture.texture {
  return texRepeat(truncatedHexagonalPattern(c1, c2, c3, c4), 3 * xstep, ystep, 1 / 2, 0);
}