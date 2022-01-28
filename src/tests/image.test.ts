import * as texture from "../types/texture";
import * as random from "../generators/random";
import * as filters from "../filters/general";
import * as image from "../types/image";

function getRandomInt(max: number): number {
    return Math.floor(Math.random() * Math.floor(max));
}

describe("Texture to image tests", () => {
    test("Size is consistent", () => {
        const width: number = getRandomInt(1000);
        const height: number = getRandomInt(1000);
        const img: image.image = texture.texture2image(random.texRandom(), width, height);
        expect(img.width).toStrictEqual(width);
        expect(img.height).toStrictEqual(height);
    });
    test("Data is coherent", () => {
        const tex: texture.texture = random.texRandom();
        const img: image.image = texture.texture2image(tex, 100, 100);
        for (let x: number = 0; x < 100; x++)
            for (let y: number = 0; y < 100; y++)
                expect(img.data[y][x]).toStrictEqual(tex(x, y));
    });
    test("Data is integer only", () => {
        const tex: texture.texture = filters.multiply_scalar([random.texRandom()], 0.1);
        const img: image.image = texture.texture2image(tex, 100, 100);
        for (let x: number = 0; x < 100; x++)
            for (let y: number = 0; y < 100; y++) {
                expect(Number.isInteger(img.data[y][x].r)).toStrictEqual(true);
                expect(Number.isInteger(img.data[y][x].g)).toStrictEqual(true);
                expect(Number.isInteger(img.data[y][x].b)).toStrictEqual(true);
                expect(Number.isInteger(img.data[y][x].a)).toStrictEqual(true);
            }
    });
});