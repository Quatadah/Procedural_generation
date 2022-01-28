export type point = { x: number, y: number };

export type distance = (A: point, B: point) => number;

export function genPoints(numberOfPoints: number, X: number, Y: number): point[] {
    let listOfPoints: point[] = [];
    function genPoints_aux(numberOfPoints: number, X: number, Y: number, L: point[]): point[] {
        if (numberOfPoints === 0)
            return L;
        L.push({
            x: Math.floor(Math.random() * X + 1),
            y: Math.floor(Math.random() * Y + 1)
        })
        return genPoints_aux(numberOfPoints - 1, X, Y, L);
    }
    return genPoints_aux(numberOfPoints, X, Y, listOfPoints);
}

export function euclidianDistance(A: point, B: point): number {
    return Math.sqrt((A.x - B.x) ** 2 + (A.y - B.y) ** 2);
}

export function manhattanDistance(A: point, B: point): number {
    return Math.abs(B.x - A.x) + Math.abs(B.y - A.y);
}

export function closeEnough(d1: number, d2: number, eps: number): boolean {
    return Math.abs(d1 - d2) <= eps;
}


export function closeToX(x: number, y: number, listOfPoints: point[], distance: (A: point, B: point) => number): number {
    let index = 0;
    let min = 350;
    for (let i = 0; i < listOfPoints.length; i++) {
        if (distance(listOfPoints[i], { x, y }) < min) {
            min = distance(listOfPoints[i], { x, y });
            index = i;
        }
    }
    return index;
}
