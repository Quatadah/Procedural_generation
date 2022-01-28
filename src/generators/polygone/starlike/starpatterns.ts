import * as color from "../../../types/color";
import * as transform from "../../../filters/transform";

function circlePoint(i: number, n: number): { x: number, y: number } {
    return { x: Math.cos(2 * Math.PI * i / n), y: Math.sin(2 * Math.PI * i / n) };
}


function starPatternaux(x: number, y: number, size: number, i: number, n: number, d: number, bgcolor: color.color, bcolorf: ((x: number) => color.color)): color.color {
    if (i >= n)
        return bgcolor;
    let A = circlePoint(i, n);
    let B = circlePoint(i + d, n);
    let C = { x: B.x - A.x, y: B.y - A.y }
    let N = Math.sqrt(C.x * C.x + C.y * C.y);
    C = { x: C.x / N, y: C.y / N };
    let D = { x: -C.y, y: C.x };
    let P = { x: x - A.x, y: y - A.y };
    let dst = P.x * C.x + P.y * C.y;
    let ndst = P.x * D.x + P.y * D.y;
    if (ndst <= 0 && ndst > -size && dst >= 0 && dst <= N)
        return bcolorf(Math.abs(ndst/size));
    return starPatternaux(x, y, size, i + 1, n, d, bgcolor, bcolorf);
}


function starPatternfilledaux(x: number, y: number, k: number, i: number, n: number, d: number): number {
    if (i >= n)
        return k;
    let A = circlePoint(i, n);
    let B = circlePoint(i + d, n);
    let C = { x: B.x - A.x, y: B.y - A.y }
    let N = Math.sqrt(C.x * C.x + C.y * C.y);
    C = { x: C.x / N, y: C.y / N };
    let D = { x: -C.y, y: C.x };
    let P = { x: x - A.x, y: y - A.y };

    if (P.x * D.x + P.y * D.y <= 0)
        return starPatternfilledaux(x, y, k + 1, i + 1, n, d);
    return starPatternfilledaux(x, y, k, i + 1, n, d);
}

export function starPatternfilled(n: number, d: number, e: number, bgcolor: color.color, colors: Array<color.color>): transform.pattern {
    return (x, y) => {
        x = 2 * x - 1;
        y = 2 * y - 1;
        let k = starPatternfilledaux(x, y, 0, 0, n, d);
        if (k < e - 1)
            return colors[0];
        if (k < d)
            return colors[(k - e + 1) % colors.length];
        return bgcolor;
    };
}


export function drawStarLine(n: number, d: number, k: number, size: number, bcolorf: ((x: number) => color.color)): transform.transformation {
    return P => ((x, y) => {
        if (starPatternfilledaux(2 * x - 1, 2 * y - 1, 0, 0, n, d) < k)
            return P(x, y);
        return starPatternaux(2 * x - 1, 2 * y - 1, size, 0, n, d, P(x, y), bcolorf);
    });
}


export function starLineFilledPattern(n: number, d: number, k: number, size: number, bgcolor: color.color, bcolorf: ((x: number) => color.color), colors: Array<color.color>) : transform.pattern{
    return drawStarLine(n, d, k, size, bcolorf)(starPatternfilled(n, d, k, bgcolor, colors));
}