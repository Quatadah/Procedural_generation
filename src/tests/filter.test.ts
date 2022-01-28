import * as random from "../generators/random";
import * as general from "../filters/general";
import * as convolution from "../filters/convolution";
import * as colorimetric from "../filters/colorimetric";
import * as interpolation from "../types/interpolation";
import * as scale from "../filters/scaling";
import * as color from "../types/color";
import * as filter from "../types/filter";
import * as texture from "../types/texture";
import * as hyper from "../filters/hyperbolic";
import { texHexagoneBoard } from "../generators/polygone/regular/hexagonal";


function texFromArray(array: color.color[][]) {
    const a = array;

    function tex(x: number, y: number) {
        return a[y][x];
    }

    return tex;
}

const tex1: texture.texture = texFromArray([
    [{
        r: 10,
        g: 2,
        b: 4,
        a: 1
    }, {
        r: 0,
        g: 7,
        b: 11,
        a: 9
    }, {
        r: 8,
        g: 8,
        b: 8,
        a: 6
    }, {
        r: 2,
        g: 13,
        b: 12,
        a: 7
    }],
    [{
        r: 13,
        g: 7,
        b: 10,
        a: 1
    }, {
        r: 6,
        g: 10,
        b: 5,
        a: 14
    }, {
        r: 3,
        g: 11,
        b: 1,
        a: 2
    }, {
        r: 13,
        g: 14,
        b: 6,
        a: 12
    }],
    [{
        r: 14,
        g: 13,
        b: 7,
        a: 4
    }, {
        r: 7,
        g: 10,
        b: 7,
        a: 9
    }, {
        r: 0,
        g: 8,
        b: 15,
        a: 12
    }, {
        r: 9,
        g: 0,
        b: 4,
        a: 15
    }],
    [{
        r: 1,
        g: 13,
        b: 4,
        a: 11
    }, {
        r: 15,
        g: 8,
        b: 7,
        a: 13
    }, {
        r: 10,
        g: 5,
        b: 6,
        a: 7
    }, {
        r: 3,
        g: 15,
        b: 4,
        a: 255
    }]
]);

const tex2: texture.texture = texFromArray([
    [{
        r: 3,
        g: 9,
        b: 10,
        a: 14
    }, {
        r: 12,
        g: 15,
        b: 12,
        a: 11
    }, {
        r: 11,
        g: 9,
        b: 12,
        a: 5
    }, {
        r: 0,
        g: 13,
        b: 9,
        a: 2
    }],
    [{
        r: 9,
        g: 14,
        b: 12,
        a: 13
    }, {
        r: 10,
        g: 11,
        b: 12,
        a: 11
    }, {
        r: 12,
        g: 10,
        b: 3,
        a: 11
    }, {
        r: 8,
        g: 7,
        b: 5,
        a: 5
    }],
    [{
        r: 6,
        g: 7,
        b: 0,
        a: 2
    }, {
        r: 0,
        g: 6,
        b: 6,
        a: 1
    }, {
        r: 10,
        g: 5,
        b: 10,
        a: 13
    }, {
        r: 7,
        g: 13,
        b: 13,
        a: 8
    }],
    [{
        r: 11,
        g: 1,
        b: 5,
        a: 3
    }, {
        r: 8,
        g: 9,
        b: 7,
        a: 5
    }, {
        r: 8,
        g: 4,
        b: 7,
        a: 4
    }, {
        r: 10,
        g: 15,
        b: 5,
        a: 255
    }]
]);

let tex3 = texHexagoneBoard(100,100, color.C1, color.C2, color.C3);

function testFilter(str: string, filter: filter.filter, size: number, output: color.color[][], input: texture.texture[], ...args: any[]) {
    describe("Filter test : " + str, () => {
        test("Pixels color are valid", () => {
            let tex: texture.texture = filter(input.map(() => random.texRandom()), ...args);
            for (let y: number = 0; y < 4; y++) {
                for (let x: number = 0; x < 4; x++) {
                    let c: color.color = tex(x, y);
                    expect(color.getR(c)).toBeGreaterThanOrEqual(0);
                    expect(color.getR(c)).toBeLessThanOrEqual(255);
                    expect(color.getG(c)).toBeGreaterThanOrEqual(0);
                    expect(color.getG(c)).toBeLessThanOrEqual(255);
                    expect(color.getB(c)).toBeGreaterThanOrEqual(0);
                    expect(color.getB(c)).toBeLessThanOrEqual(255);
                    expect(color.getA(c)).toBeGreaterThanOrEqual(0);
                    expect(color.getA(c)).toBeLessThanOrEqual(255);
                }
            }
        });
        test("Filter is consistent", () => {
            let colors: color.color[] = new Array<color.color>();
            let tex: texture.texture = filter(input.map(() => random.texRandom()), ...args);
            for (let y: number = 0; y < 4; y++) {
                for (let x: number = 0; x < 4; x++) {
                    colors[y * 4 + x] = tex(x, y);
                }
            }
            for (let y: number = 0; y < 4; y++) {
                for (let x: number = 0; x < 4; x++) {
                    expect(tex(x, y)).toStrictEqual(colors[y * 4 + x]);
                }
            }
        });
        test("Values are correct", () => {
            let tex: texture.texture = filter(input, ...args);
            for (let y: number = 0; y < size; y++) {
                for (let x: number = 0; x < size; x++) {
                    let a = tex(x, y);
                    expect(tex(x, y)).toStrictEqual(output[y][x]);
                }
            }
        });
    });
}

function testFilterConvolution(str: string, filter: filter.filter, output: color.color[][], input: texture.texture[], border: number, ...args: any[]) {
    describe("Filter test : " + str, () => {
        test("Pixels color are valid", () => {
            let tex: texture.texture = filter(input.map(() => random.texRandom()), ...args);
            for (let y: number = 0; y < 4; y++) {
                for (let x: number = 0; x < 4; x++) {
                    let c: color.color = tex(x, y);
                    expect(color.getR(c)).toBeGreaterThanOrEqual(0);
                    expect(color.getR(c)).toBeLessThanOrEqual(255);
                    expect(color.getG(c)).toBeGreaterThanOrEqual(0);
                    expect(color.getG(c)).toBeLessThanOrEqual(255);
                    expect(color.getB(c)).toBeGreaterThanOrEqual(0);
                    expect(color.getB(c)).toBeLessThanOrEqual(255);
                    expect(color.getA(c)).toBeGreaterThanOrEqual(0);
                    expect(color.getA(c)).toBeLessThanOrEqual(255);
                }
            }
        });
        test("Filter is consistent", () => {
            let colors: color.color[] = new Array<color.color>();
            let tex: texture.texture = filter(input.map(() => random.texRandom()), ...args);
            for (let y: number = 0; y < 4; y++) {
                for (let x: number = 0; x < 4; x++) {
                    colors[y * 4 + x] = tex(x, y);
                }
            }
            for (let y = 0; y < 4; y++) {
                for (let x = 0; x < 4; x++) {
                    expect(tex(x, y)).toStrictEqual(colors[y * 4 + x]);
                }
            }
        });
        test("Values are correct", () => {
            const middle: number = Math.floor(border / 2);
            let tex: texture.texture = filter(input, ...args);
            let y: number = 0;
            do {
                let x: number = 0;
                do {
                    expect(tex(middle + x, middle + y)).toStrictEqual(output[y][x]);
                    x++;
                } while (x < (4 - 2 * middle));
                y++;
            } while (y < (4 - 2 * middle));
        });
    });
}

testFilter("Add", general.add, 4,
    [
        [{
            r: 13,
            g: 11,
            b: 14,
            a: 15
        },
        {
            r: 12,
            g: 22,
            b: 23,
            a: 20
        },
        {
            r: 19,
            g: 17,
            b: 20,
            a: 11
        },
        {
            r: 2,
            g: 26,
            b: 21,
            a: 9
        }
        ],
        [{
            r: 22,
            g: 21,
            b: 22,
            a: 14
        },
        {
            r: 16,
            g: 21,
            b: 17,
            a: 25
        },
        {
            r: 15,
            g: 21,
            b: 4,
            a: 13
        },
        {
            r: 21,
            g: 21,
            b: 11,
            a: 17
        }
        ],
        [{
            r: 20,
            g: 20,
            b: 7,
            a: 6
        },
        {
            r: 7,
            g: 16,
            b: 13,
            a: 10
        },
        {
            r: 10,
            g: 13,
            b: 25,
            a: 25
        },
        {
            r: 16,
            g: 13,
            b: 17,
            a: 23
        }
        ],
        [{
            r: 12,
            g: 14,
            b: 9,
            a: 14
        },
        {
            r: 23,
            g: 17,
            b: 14,
            a: 18
        },
        {
            r: 18,
            g: 9,
            b: 13,
            a: 11
        },
        {
            r: 13,
            g: 30,
            b: 9,
            a: 255
        }
        ]
    ], [tex1, tex2]);

testFilter("Multiply colors", general.multiply_colors, 4,
    [
        [{
            r: 30,
            g: 18,
            b: 40,
            a: 14
        },
        {
            r: 0,
            g: 105,
            b: 132,
            a: 99
        },
        {
            r: 88,
            g: 72,
            b: 96,
            a: 30
        },
        {
            r: 0,
            g: 169,
            b: 108,
            a: 14
        }
        ],
        [{
            r: 117,
            g: 98,
            b: 120,
            a: 13
        },
        {
            r: 60,
            g: 110,
            b: 60,
            a: 154
        },
        {
            r: 36,
            g: 110,
            b: 3,
            a: 22
        },
        {
            r: 104,
            g: 98,
            b: 30,
            a: 60
        }
        ],
        [{
            r: 84,
            g: 91,
            b: 0,
            a: 8
        },
        {
            r: 0,
            g: 60,
            b: 42,
            a: 9
        },
        {
            r: 0,
            g: 40,
            b: 150,
            a: 156
        },
        {
            r: 63,
            g: 0,
            b: 52,
            a: 120
        }
        ],
        [{
            r: 11,
            g: 13,
            b: 20,
            a: 33
        },
        {
            r: 120,
            g: 72,
            b: 49,
            a: 65
        },
        {
            r: 80,
            g: 20,
            b: 42,
            a: 28
        },
        {
            r: 30,
            g: 225,
            b: 20,
            a: 255
        }
        ]
    ], [tex1, tex2]);

testFilter("Multiply scalar", general.multiply_scalar, 4,
    [
        [{
            r: 10 * 3,
            g: 2 * 3,
            b: 4 * 3,
            a: 1 * 3
        }, {
            r: 0 * 3,
            g: 7 * 3,
            b: 11 * 3,
            a: 9 * 3
        }, {
            r: 8 * 3,
            g: 8 * 3,
            b: 8 * 3,
            a: 6 * 3
        }, {
            r: 2 * 3,
            g: 13 * 3,
            b: 12 * 3,
            a: 7 * 3
        }],
        [{
            r: 13 * 3,
            g: 7 * 3,
            b: 10 * 3,
            a: 1 * 3
        }, {
            r: 6 * 3,
            g: 10 * 3,
            b: 5 * 3,
            a: 14 * 3
        }, {
            r: 3 * 3,
            g: 11 * 3,
            b: 1 * 3,
            a: 2 * 3
        }, {
            r: 13 * 3,
            g: 14 * 3,
            b: 6 * 3,
            a: 12 * 3
        }],
        [{
            r: 14 * 3,
            g: 13 * 3,
            b: 7 * 3,
            a: 4 * 3
        }, {
            r: 7 * 3,
            g: 10 * 3,
            b: 7 * 3,
            a: 9 * 3
        }, {
            r: 0 * 3,
            g: 8 * 3,
            b: 15 * 3,
            a: 12 * 3
        }, {
            r: 9 * 3,
            g: 0 * 3,
            b: 4 * 3,
            a: 15 * 3
        }],
        [{
            r: 1 * 3,
            g: 13 * 3,
            b: 4 * 3,
            a: 11 * 3
        }, {
            r: 15 * 3,
            g: 8 * 3,
            b: 7 * 3,
            a: 13 * 3
        }, {
            r: 10 * 3,
            g: 5 * 3,
            b: 6 * 3,
            a: 7 * 3
        }, {
            r: 3 * 3,
            g: 15 * 3,
            b: 4 * 3,
            a: 255
        }]
    ], [tex1], 3);

testFilter("Divide", general.divide, 4, [
    [{
        r: 10 / 3,
        g: 2 / 9,
        b: 4 / 10,
        a: 1
    }, {
        r: 0 / 12,
        g: 7 / 15,
        b: 11 / 12,
        a: 9
    }, {
        r: 8 / 11,
        g: 8 / 9,
        b: 8 / 12,
        a: 6
    }, {
        r: 2,
        g: 13 / 13,
        b: 12 / 9,
        a: 7
    }],
    [{
        r: 13 / 9,
        g: 7 / 14,
        b: 10 / 12,
        a: 1
    }, {
        r: 6 / 10,
        g: 10 / 11,
        b: 5 / 12,
        a: 14
    }, {
        r: 3 / 12,
        g: 11 / 10,
        b: 1 / 3,
        a: 2
    }, {
        r: 13 / 8,
        g: 14 / 7,
        b: 6 / 5,
        a: 12
    }],
    [{
        r: 14 / 6,
        g: 13 / 7,
        b: 7,
        a: 4
    }, {
        r: 7,
        g: 10 / 6,
        b: 7 / 6,
        a: 9
    }, {
        r: 0,
        g: 8 / 5,
        b: 15 / 10,
        a: 12
    }, {
        r: 9 / 7,
        g: 0,
        b: 4 / 13,
        a: 15
    }],
    [{
        r: 1 / 11,
        g: 13,
        b: 4 / 5,
        a: 11
    }, {
        r: 15 / 8,
        g: 8 / 9,
        b: 1,
        a: 13
    }, {
        r: 10 / 8,
        g: 5 / 4,
        b: 6 / 7,
        a: 7
    }, {
        r: 3 / 10,
        g: 15 / 15,
        b: 4 / 5,
        a: 255
    }]
], [tex1, tex2]);

let factor = 117845/15045;
let calculContrast = (x: number) => Math.max(Math.min(factor * (x - 128) + 128, 255), 0);
testFilter("Contrast", colorimetric.contrast, 4, [
    [{
        r: calculContrast(10),
        g: calculContrast(2),
        b: calculContrast(4),
        a: 1
    }, {
        r: calculContrast(0),
        g: calculContrast(7),
        b: calculContrast(11),
        a: 9
    }, {
        r: calculContrast(8),
        g: calculContrast(8),
        b: calculContrast(8),
        a: 6
    }, {
        r: calculContrast(2),
        g: calculContrast(13),
        b: calculContrast(12),
        a: 7
    }],
    [{
        r: calculContrast(13),
        g: calculContrast(7),
        b: calculContrast(10),
        a: 1
    }, {
        r: calculContrast(6),
        g: calculContrast(10),
        b: calculContrast(5),
        a: 14
    }, {
        r: calculContrast(3),
        g: calculContrast(11),
        b: calculContrast(1),
        a: 2
    }, {
        r: calculContrast(13),
        g: calculContrast(14),
        b: calculContrast(6),
        a: 12
    }],
    [{
        r: calculContrast(14),
        g: calculContrast(13),
        b: calculContrast(7),
        a: 4
    }, {
        r: calculContrast(7),
        g: calculContrast(10),
        b: calculContrast(7),
        a: 9
    }, {
        r: calculContrast(0),
        g: calculContrast(8),
        b: calculContrast(15),
        a: 12
    }, {
        r: calculContrast(9),
        g: calculContrast(0),
        b: calculContrast(4),
        a: 15
    }],
    [{
        r: calculContrast(1),
        g: calculContrast(13),
        b: calculContrast(4),
        a: 11
    }, {
        r: calculContrast(15),
        g: calculContrast(8),
        b: calculContrast(7),
        a: 13
    }, {
        r: calculContrast(10),
        g: calculContrast(5),
        b: calculContrast(6),
        a: 7
    }, {
        r: calculContrast(3),
        g: calculContrast(15),
        b: calculContrast(4),
        a: 255
    }]
], [tex1], 200);

testFilterConvolution("Blur", convolution.blur,
    [
        [{
            r: (10 + 0 + 8 + 13 + 6 + 3 + 14 + 7 + 0) / 9,
            g: (2 + 7 + 8 + 7 + 10 + 11 + 13 + 10 + 8) / 9,
            b: (4 + 11 + 8 + 10 + 5 + 1 + 7 + 7 + 15) / 9,
            a: 14
        }, {
            r: (0 + 8 + 2 + 6 + 3 + 13 + 7 + 0 + 9) / 9,
            g: (7 + 8 + 13 + 10 + 11 + 14 + 10 + 8 + 0) / 9,
            b: (11 + 8 + 12 + 5 + 1 + 6 + 7 + 15 + 4) / 9,
            a: 2
        }],
        [{
            r: (13 + 6 + 3 + 14 + 7 + 0 + 1 + 15 + 10) / 9,
            g: (7 + 10 + 11 + 13 + 10 + 8 + 13 + 8 + 5) / 9,
            b: (10 + 5 + 1 + 7 + 7 + 15 + 4 + 7 + 6) / 9,
            a: 9
        }, {
            r: (6 + 3 + 13 + 7 + 0 + 9 + 15 + 10 + 3) / 9,
            g: (10 + 11 + 14 + 10 + 8 + 0 + 8 + 5 + 15) / 9,
            b: (5 + 1 + 6 + 7 + 15 + 4 + 7 + 6 + 4) / 9,
            a: 12
        }]
    ], [tex1], 3);

testFilterConvolution("Convolution like blur", convolution.convolution,
    [
        [{
            r: (10 + 0 + 8 + 13 + 6 + 3 + 14 + 7 + 0) / 9,
            g: (2 + 7 + 8 + 7 + 10 + 11 + 13 + 10 + 8) / 9,
            b: (4 + 11 + 8 + 10 + 5 + 1 + 7 + 7 + 15) / 9,
            a: 14
        }, {
            r: (0 + 8 + 2 + 6 + 3 + 13 + 7 + 0 + 9) / 9,
            g: (7 + 8 + 13 + 10 + 11 + 14 + 10 + 8 + 0) / 9,
            b: (11 + 8 + 12 + 5 + 1 + 6 + 7 + 15 + 4) / 9,
            a: 2
        }],
        [{
            r: (13 + 6 + 3 + 14 + 7 + 0 + 1 + 15 + 10) / 9,
            g: (7 + 10 + 11 + 13 + 10 + 8 + 13 + 8 + 5) / 9,
            b: (10 + 5 + 1 + 7 + 7 + 15 + 4 + 7 + 6) / 9,
            a: 9
        }, {
            r: (6 + 3 + 13 + 7 + 0 + 9 + 15 + 10 + 3) / 9,
            g: (10 + 11 + 14 + 10 + 8 + 0 + 8 + 5 + 15) / 9,
            b: (5 + 1 + 6 + 7 + 15 + 4 + 7 + 6 + 4) / 9,
            a: 12
        }]
    ], [tex1], 3, [
    [1, 1, 1],
    [1, 1, 1],
    [1, 1, 1]
]);

testFilterConvolution("Convolution custom", convolution.convolution,
    [
        [{
            r: (10 + 0 + 8 + 13 * 2 + 6 * 3 + 3 * 4 + 14 + 7 * 5 + 0) / 19,
            g: (2 + 7 + 8 + 7 * 2 + 10 * 3 + 11 * 4 + 13 + 10 * 5 + 8) / 19,
            b: (4 + 11 + 8 + 10 * 2 + 5 * 3 + 1 * 4 + 7 + 7 * 5 + 15) / 19,
            a: 12
        }]
    ], [tex1], 4, [
    [1, 2, 1, 0],
    [1, 3, 5, 0],
    [1, 4, 1, 0],
    [0, 0, 0, 0]
]);

testFilter("Scaling", scale.filterUpScale, 4, [
    [{
        r: 10,
        g: 2,
        b: 4,
        a: 1
    }, {
        r: (10 + 0) / 2,
        g: (2 + 7) / 2,
        b: (4 + 11) / 2,
        a: (1 + 9) / 2
    }, {
        r: 0,
        g: 7,
        b: 11,
        a: 9
    }, {
        r: (0 + 8) / 2,
        g: (7 + 8) / 2,
        b: (11 + 8) / 2,
        a: (9 + 6) / 2
    }],
    [{
        r: (10 + 13) / 2,
        g: (2 + 7) / 2,
        b: (4 + 10) / 2,
        a: (1 + 1) / 2
    }, {
        r: (6 + 13 + 10 + 0) / 4,
        g: (10 + 7 + 2 + 7) / 4,
        b: (5 + 10 + 4 + 11) / 4,
        a: (14 + 1 + 1 + 9) / 4
    }, {
        r: (0 + 6) / 2,
        g: (7 + 10) / 2,
        b: (11 + 5) / 2,
        a: (9 + 14) / 2
    }, {
        r: (0 + 8 + 6 + 3) / 4,
        g: (7 + 8 + 10 + 11) / 4,
        b: (11 + 8 + 5 + 1) / 4,
        a: (9 + 6 + 14 + 2) / 4
    }],
    [{
        r: 13,
        g: 7,
        b: 10,
        a: 1
    }, {
        r: (6 + 13) / 2,
        g: (10 + 7) / 2,
        b: (5 + 10) / 2,
        a: (14 + 1) / 2
    }, {
        r: 6,
        g: 10,
        b: 5,
        a: 14
    }, {
        r: (6 + 3) / 2,
        g: (10 + 11) / 2,
        b: (5 + 1) / 2,
        a: (14 + 2) / 2
    }],
    [{
        r: (13 + 14) / 2,
        g: (7 + 13) / 2,
        b: (10 + 7) / 2,
        a: (1 + 4) / 2
    }, {
        r: (6 + 13 + 14 + 7) / 4,
        g: (10 + 7 + 13 + 10) / 4,
        b: (5 + 10 + 7 + 7) / 4,
        a: (14 + 1 + 4 + 9) / 4
    }, {
        r: (6 + 7) / 2,
        g: (10 + 10) / 2,
        b: (5 + 7) / 2,
        a: (14 + 9) / 2
    }, {
        r: (6 + 3 + 7 + 0) / 4,
        g: (10 + 11 + 10 + 8) / 4,
        b: (5 + 1 + 7 + 15) / 4,
        a: (14 + 2 + 9 + 12) / 4
    }]
], [tex1], 2, interpolation.linearInterpolation);



testFilter("Hyperbolic", hyper.hyperbolic, 5 ,
[
    [ 
        { r : 255, g : 255, b : 255, a : 255 }, 
        { r : 255, g : 255, b : 255, a : 255 }, 
        { r : 255, g : 255, b : 255, a : 255 }, 
        { r : 255, g : 255, b : 255, a : 255 }, 
        { r : 255, g : 255, b : 255, a : 255 }
    ], [ 
        { r : 255, g : 255, b : 255, a : 255 }, 
        { r : 255, g : 255, b : 255, a : 255 }, 
        { r : 255, g : 255, b : 255, a : 255 }, 
        { r : 255, g : 255, b : 200, a : 255 }, 
        { r : 255, g : 255, b : 200, a : 255 }
    ], [ 
        { r : 255, g : 255, b : 255, a : 255 },
        { r : 255, g : 255, b : 255, a : 255 },
        { r : 255, g : 255, b : 200, a : 255 },
        { r : 255, g : 255, b : 200, a : 255 },
        { r : 255, g : 255, b : 200, a : 255 }
    ], [ 
        { r : 255, g : 255, b : 255, a : 255 },
        { r : 200, g : 225, b : 255, a : 255 },
        { r : 200, g : 225, b : 255, a : 255 },
        { r : 255, g : 255, b : 200, a : 255 }, 
        { r : 255, g : 255, b : 200, a : 255 }
    ], [ 
        { r : 255, g : 255, b : 255, a : 255 },
        { r : 200, g : 225, b : 255, a : 255 },
        { r : 200, g : 225, b : 255, a : 255 },
        { r : 200, g : 225, b : 255, a : 255 },
        { r : 255, g : 255, b : 200, a : 255 }
    ]
]
    
    
    , [tex3], 5, 20);