import * as color from "../types/color";
import * as texture from "../types/texture";

export function texMonochrome(col: color.color): texture.texture {
    return (x: number, y: number) => col;
}
