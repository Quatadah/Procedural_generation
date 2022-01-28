export type color = { r: number, g: number, b: number, a: number };

// COLORS
export const BLACK: color = { r: 0, g: 0, b: 0, a: 255 };
export const WHITE: color = { r: 255, g: 255, b: 255, a: 255 };
export const RED: color = { r: 255, g: 0, b: 0, a: 255 };
export const BLUE: color = { r: 0, g: 0, b: 255, a: 255 };
export const GREEN: color = { r: 0, g: 255, b: 0, a: 255 };
export const C1: color = { r: 230, g: 200, b: 225, a: 255 };
export const C2: color = { r: 255, g: 255, b: 200, a: 255 };
export const C3: color = { r: 200, g: 225, b: 255, a: 255 };
export const C4: color = { r: 200, g: 200, b: 255, a: 255 };

export function createColor(_r: number, _g: number, _b: number, _a: number): color {
    return { r: _r, g: _g, b: _b, a: _a };
};

export function getR(c: color): number { return c.r; };
export function getG(c: color): number { return c.g; };
export function getB(c: color): number { return c.b; };
export function getA(c: color): number { return c.a; };

export function setR(c: color, r: number) {
    console.assert(r >= 0 && r < 256, "Red value is not between 0 and 255 ! ");
    c.r = r;
}
export function setG(c: color, g: number) {
    console.assert(g >= 0 && g < 256, "Green value is not between 0 and 255 ! ");
    c.g = g;
}
export function setB(c: color, b: number) {
    console.assert(b >= 0 && b < 256, "Blue value is not between 0 and 255 ! ");
    c.b = b;
}
export function setA(c: color, a: number) {
    console.assert(a >= 0 && a < 256, "Red value is not between 0 and 255 ! ");
    c.a = a;
}

function getRandomInt(max: number): number {
    return Math.floor(Math.random() * Math.floor(max));
}

export function randomColor() {
    return createColor(
        getRandomInt(256),
        getRandomInt(256),
        getRandomInt(256),
        255
    );
}

export function listOfRandomColors(n: number) : color[]{
    return Array.from({length: n}, (_, i) => randomColor());    
}
