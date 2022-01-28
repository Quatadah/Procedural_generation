import { texRandom } from "../generators/random";
import { texPerlin } from "../generators/perlin";
import * as texture from "../types/texture";
import * as color from "../types/color";

describe("Random : Stats test", () => {
    test("Random : Stats test", () => {
        let tex: texture.texture = texRandom();
        let avgR: number = 0;
        let avgG: number = 0;
        let avgB: number = 0;
        let avgA: number = 0;
        for (let i: number = 0; i < 100; i++) {
            for (let j: number = 0; j < 100; j++) {
                let c: color.color = tex(i, j);
                avgR += color.getR(c);
                avgG += color.getG(c);
                avgB += color.getB(c);
                avgA += color.getA(c);
            }
        }
        avgR /= 10000;
        avgG /= 10000;
        avgB /= 10000;
        avgA /= 10000;
        expect(avgR).toBeLessThanOrEqual(130);
        expect(avgR).toBeGreaterThanOrEqual(126);
        expect(avgB).toBeLessThanOrEqual(130);
        expect(avgB).toBeGreaterThanOrEqual(126);
        expect(avgG).toBeLessThanOrEqual(130);
        expect(avgG).toBeGreaterThanOrEqual(126);
        expect(avgA).toStrictEqual(255);
    });
}
);