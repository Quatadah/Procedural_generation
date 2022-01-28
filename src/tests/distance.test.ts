import * as distance from "../types/distance";

describe("Distances test", () => {
    test("Euclidian distance", () => {
        const x1: number[] = [0, 1, 0, 0, 0, 1, 1, 1, 0, 1];
        const y1: number[] = [0, 1, 0, 0, 0, 2, 2, 2, 0, 1];
        const x2: number[] = [0, 1, 1, 0, 1, 2, 1, 2, -1, -1];
        const y2: number[] = [0, 1, 0, 1, 1, 2, 3, 3, -1, -2];
        const result: number[] = [0, 0, 1, 1, Math.sqrt(2), 1, 1, Math.sqrt(2), Math.sqrt(2), Math.sqrt(13)];
        for (let i: number = 0; i < 10; i++)
            expect(distance.euclidianDistance({
                x: x1[i],
                y: y1[i]
            }, {
                x: x2[i],
                y: y2[i]
            })).toStrictEqual(result[i]);
    });

    test("Manhattan distance", () => {
        const x1: number[] = [0, 1, 0, 0, 0, 1, 1, 1, 0, 1];
        const y1: number[] = [0, 1, 0, 0, 0, 2, 2, 2, 0, 1];
        const x2: number[] = [0, 1, 1, 0, 1, 2, 1, 2, -1, -1];
        const y2: number[] = [0, 1, 0, 1, 1, 2, 3, 3, -1, -2];
        const result: number[] = [0, 0, 1, 1, 2, 1, 1, 2, 2, 5];
        for (let i: number = 0; i < 10; i++)
            expect(distance.manhattanDistance({
                x: x1[i],
                y: y1[i]
            }, {
                x: x2[i],
                y: y2[i]
            })).toStrictEqual(result[i]);
    });

    test("Close enough", () => {
        expect(distance.closeEnough(1, 1.01, 0.1)).toStrictEqual(true);
        expect(distance.closeEnough(1, 1.01, 0.001)).toStrictEqual(false);
    });

    test("CloseToX", () => {
        let list: any[] = [{
            x: -1,
            y: -2
        }, {
            x: 1,
            y: -3
        }, {
            x: 3,
            y: 2
        }];
        expect(distance.closeToX(1, 1, list, distance.euclidianDistance)).toStrictEqual(2);
    });
});