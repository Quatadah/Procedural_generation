import * as compose from "./compose";
import * as texture from "../types/texture"

export function add([tex1, tex2]: texture.texture[]): texture.texture {
    return (x: number, y: number) => compose.addition_filter(tex1(x, y), tex2(x, y));
};

export function multiply_colors([tex1, tex2]: texture.texture[]): texture.texture {
    return (x: number, y: number) => compose.multiply_filter(tex1(x, y), tex2(x, y));
};

export function multiply_scalar([tex1]: texture.texture[], c: number): texture.texture {
    return (x: number, y: number) => compose.multiply_scalar_filter(tex1(x, y), c);
};

export function divide([tex1, tex2]: texture.texture[]): texture.texture {
    return (x: number, y: number) => compose.divide_filter(tex1(x, y), tex2(x, y));
};