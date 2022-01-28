import * as color from "../types/color";
import * as texture from "../types/texture";
import * as interpolation from "../types/interpolation";

// RANDOM
export function texRandom(): texture.texture {
  let cache: { [key: number]: { [key: number]: color.color } } = {};

  function texture(x: number, y: number): color.color {
    if (cache[x]) {
      if (!cache[x][y])
        cache[x][y] = color.randomColor();
      return cache[x][y];
    }
    else {
      cache[x] = {};
      cache[x][y] = color.randomColor();
      return cache[x][y];
    }
  }

  return texture;
}

export function texRandomWithoutCache(): texture.texture {
  return (x: number, y: number) => color.randomColor();
}
