import * as  color from "../types/color";
import * as  monochrome from "../generators/monochrome";
import * as  random from "../generators/random";
import * as  perlin from "../generators/perlin";
import * as  checkerboard from "../generators/polygone/regular/checkerBoard";
import * as  triangular from "../generators/polygone/regular/triangular";
import * as  hexagonal from "../generators/polygone/regular/hexagonal";
import * as  hexagonalsoftened from "../generators/polygone/semi-regular/hexagonalsoftened";
import * as  squaresoftened from "../generators/polygone/semi-regular/squaresoftened";
import * as  triangularelongated from "../generators/polygone/semi-regular/triangularelongated";
import * as  trihexagonal from "../generators/polygone/semi-regular/trihexagonal";
import * as  truncatedhexagone from "../generators/polygone/semi-regular/truncatedhexagone";
import * as  truncatedsquare from "../generators/polygone/semi-regular/truncatedsquare";
import * as starline from "../generators/polygone/starlike/starline"
import * as starfilled from "../generators/polygone/starlike/starfilled"
import * as starlinefilled from "../generators/polygone/starlike/starlinefilled"
import * as starplan from "../generators/polygone/starlike/truncatedsquare"
import * as texture from "../types/texture";


function getRandomInt(max: number): number {
    return Math.floor(Math.random() * Math.floor(max));
}

function testGenerator(str: string, tex: texture.texture) {
    describe("Generator test : " + str, () => {
        test("Pixels color are valid", () => {
            for (let i: number = 0; i < 100; i++) {
                const c: color.color = tex(getRandomInt(256), getRandomInt(256));
                expect(color.getR(c)).toBeGreaterThanOrEqual(0);
                expect(color.getR(c)).toBeLessThanOrEqual(255);
                expect(color.getG(c)).toBeGreaterThanOrEqual(0);
                expect(color.getG(c)).toBeLessThanOrEqual(255);
                expect(color.getB(c)).toBeGreaterThanOrEqual(0);
                expect(color.getB(c)).toBeLessThanOrEqual(255);
                expect(color.getA(c)).toBeGreaterThanOrEqual(0);
                expect(color.getA(c)).toBeLessThanOrEqual(255);
            }
        });
        test("Texture is consistent", () => {
            let x: number[] = new Array<number>();
            let y: number[] = new Array<number>();
            let colors: color.color[] = new Array<color.color>();
            for (let i: number = 0; i < 100; i++) {
                x[i] = getRandomInt(256);
                y[i] = getRandomInt(256);
                colors[i] = tex(x[i], y[i]);
            }
            for (let i: number = 0; i < 10; i++) {
                expect(tex(x[i], y[i])).toStrictEqual(colors[i]);
            }
        });
    });
}


testGenerator("Monochrome", monochrome.texMonochrome(color.randomColor()));

testGenerator("Random", random.texRandom());

testGenerator("Perlin", perlin.texPerlin(8, 0.5, 2));

testGenerator("Checkerboard", checkerboard.texCheckerBoard(getRandomInt(50), getRandomInt(50), color.randomColor(), color.randomColor()));

testGenerator("Triangular", triangular.texTriangleBoard(getRandomInt(50), getRandomInt(50), color.randomColor(), color.randomColor()));

testGenerator("Hexagonal", hexagonal.texHexagoneBoard(getRandomInt(50), getRandomInt(50), color.randomColor(), color.randomColor(), color.randomColor()));

testGenerator("Hexagonal softened", hexagonalsoftened.texSoftenedHexagone(getRandomInt(50), getRandomInt(50), color.randomColor(), color.randomColor(), color.randomColor()));

testGenerator("Square softened", squaresoftened.texSoftenedSquare(getRandomInt(50), getRandomInt(50), color.randomColor(), color.randomColor(), color.randomColor()));

testGenerator("Triangular elongated", triangularelongated.texTriangularElongatedBoard(getRandomInt(50), getRandomInt(50), color.randomColor(), color.randomColor(), color.randomColor(), color.randomColor()));

testGenerator("Trihexagonal", trihexagonal.textriHexagonalBoard(getRandomInt(50), getRandomInt(50), color.randomColor(), color.randomColor(), color.randomColor()));

testGenerator("Truncated hexagone", truncatedhexagone.texTruncatedHexagone(getRandomInt(50), getRandomInt(50), color.randomColor(), color.randomColor(), color.randomColor(), color.randomColor()));

testGenerator("Truncated square", truncatedsquare.textruncatedSquareBoard(getRandomInt(50), getRandomInt(50), color.randomColor(), color.randomColor(), color.randomColor()));

testGenerator("Star Filled", starfilled.texStar(10,4,3, 100, 100, color.C1, [color.C2, color.C3, color.C4]));

testGenerator("Starline Simple", starline.texStarLineSimple(10,4,3, 0.1, 100, 100, color.C1));

testGenerator("Starline Border", starline.texStarLineBorder(10,4,3, 0.1, 100, 100, color.C1));

testGenerator("Starline Double", starline.texStarLineDouble(10,4,3, 0.1, 100, 100, color.C1));

testGenerator("Starline Simple Filled", starlinefilled.texStarLineFilledSimple(10,4,3, 0.1, 100, 100, color.C1, [color.C2, color.C3, color.C4]));

testGenerator("Starline Border Filled", starlinefilled.texStarLineFilledBorder(10,4,3, 0.1, 100, 100, color.C1, [color.C2, color.C3, color.C4]));

testGenerator("Starline Double Filled", starlinefilled.texStarLineFilledDouble(10,4,3, 0.1, 100, 100, color.C1, [color.C2, color.C3, color.C4]));

testGenerator("Truncated Square Star", starplan.texTruncatedSquareStar(100, 100, color.C1, color.WHITE, color.BLACK, color.C2, color.C3, color.C4));
