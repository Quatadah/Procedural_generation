import * as color from "../types/color";

export function multiply_filter(c1: color.color, c2: color.color): color.color {
    return color.createColor(
        Math.min(color.getR(c1) * color.getR(c2), 255),
        Math.min(color.getG(c1) * color.getG(c2), 255),
        Math.min(color.getB(c1) * color.getB(c2), 255),
        Math.min(color.getA(c1) * color.getA(c2), 255)
    );
};

export function multiply_scalar_filter(c1: color.color, c: number): color.color {
    return color.createColor(
        Math.min(color.getR(c1) * c, 255),
        Math.min(color.getG(c1) * c, 255),
        Math.min(color.getB(c1) * c, 255),
        Math.min(color.getA(c1) * c, 255)
    );
}

export function addition_filter(c1: color.color, c2: color.color): color.color {
    return color.createColor(
        Math.min(color.getR(c1) + color.getR(c2), 255),
        Math.min(color.getG(c1) + color.getG(c2), 255),
        Math.min(color.getB(c1) + color.getB(c2), 255),
        Math.min(color.getA(c1) + color.getA(c2), 255)
    );
};

export function divide_filter(c1: color.color, c2: color.color): color.color {
    return color.createColor(
        color.getR(c2) == 0 ? color.getR(c1) : color.getR(c1) / color.getR(c2),
        color.getG(c2) == 0 ? color.getG(c1) : color.getG(c1) / color.getG(c2),
        color.getB(c2) == 0 ? color.getB(c1) : color.getB(c1) / color.getB(c2),
        color.getA(c1)
    );
};
