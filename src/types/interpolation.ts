"use strict";

import * as color from "./color";

export type interpolation = { params: number, interpolate: (values: Array<number>, t: number) => number };

export const linearInterpolation: interpolation = {
    params: 0, interpolate: (values: Array<number>, t: number): number => {
        return values[0] + t * (values[1] - values[0]);
    }
};

export const cosineInterpolation: interpolation = {
    params: 0, interpolate: (values: Array<number>, t: number): number => {
        return values[1] + (values[0] - values[1]) * (Math.cos(t * Math.PI) + 1) / 2;
    }
};

// Smoother but needs a point before and after
export const cubicInterpolation: interpolation = {
    params: 1, interpolate: (values: Array<number>, t: number): number => {
        const c3: number = -0.5 * values[0] + 1.5 * values[1] - 1.5 * values[2] + 0.5 * values[3];
        const c2: number = values[0] - 2.5 * values[1] + 2 * values[2] - 0.5 * values[3];
        const c1: number = -0.5 * values[0] + 0.5 * values[2];

        return ((c3 * t + c2) * t + c1) * t + values[1];
    }
};

function clamp(x: number, a: number, b: number) {
    return Math.min(Math.max(x, a), b);
}

export function interpolateColors(interpol: interpolation, colors: Array<color.color>, t: number): color.color {
    return color.createColor(
        clamp(interpol.interpolate(colors.map((x) => (color.getR(x))), t), 0, 255),
        clamp(interpol.interpolate(colors.map((x) => (color.getG(x))), t), 0, 255),
        clamp(interpol.interpolate(colors.map((x) => (color.getB(x))), t), 0, 255),
        clamp(interpol.interpolate(colors.map((x) => (color.getA(x))), t), 0, 255)
    );
}