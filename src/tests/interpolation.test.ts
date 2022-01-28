import * as interpolation from "../types/interpolation";


describe("Interpolation tests", () => {
    test("Linear interpolation", () => {
        const result: number[] = [-1, -0.5, 0, 0.5, 1, 1.5, 2];
        for (let i: number = 0; i < 7; i++)
            expect(interpolation.linearInterpolation.interpolate([-1, 2], i / 6)).toStrictEqual(result[i]);
    });
    test("Cosine interpolation", () => {
        const result: number[] = [-1, -1 + 1.5 * (1 - Math.sqrt(3) / 2), -1 + 1.5 * (1 - Math.sqrt(2) / 2), -0.25, -1 + 1.5 * 1.5, -1 + 1.5 * (1 + Math.sqrt(2) / 2), -1 + 1.5 * (1 + Math.sqrt(3) / 2), 2];
        const t: number[] = [0, 1 / 6, 1 / 4, 1 / 3, 2 / 3, 3 / 4, 5 / 6, 1];
        for (let i: number = 0; i < 5; i++)
            expect(interpolation.cosineInterpolation.interpolate([-1, 2], t[i])).toBeCloseTo(result[i], 0.00000001);
    });
    test("Cubic interpolation", () => {
        const result: number[] = [0, 3, 6, 27];
        for (let i: number = 0; i < 4; i++) {
            expect(interpolation.cubicInterpolation.interpolate([-27, 0, 27, 216], i / 3)).toStrictEqual(result[i]);
        }
    });
    test("Interpolate Colors", () => {
        expect(interpolation.interpolateColors(interpolation.linearInterpolation, [{
            r: -1,
            g: 1,
            b: 2,
            a: 255
        }, {
            r: 0,
            g: 3,
            b: 2,
            a: 256
        }], 0.5)).toStrictEqual({
            r: 0,
            g: 2,
            b: 2,
            a: 255
        });
    });
});