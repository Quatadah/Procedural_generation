import * as distance from "../../types/distance"
import * as color from "../../types/color"
import * as texture from "../../types/texture"

export function genVoronoi(ray: number, numberOfPoints: number, disFunc: (A: distance.point,
    B: distance.point) => number = distance.euclidianDistance): texture.texture {
    let listOfpoints: distance.point[] = distance.genPoints(numberOfPoints, 1000, 1000);
    let listOfColors: color.color[] = color.listOfRandomColors(numberOfPoints);
    function colorizeNearby(x: number, y: number): color.color {
        const distances = listOfpoints.map((element) => disFunc(element, { x, y })).sort((a, b) => (a - b));
        if (distances[0] < ray)
            return color.RED;
        return listOfColors[distance.closeToX(x, y, listOfpoints, disFunc)];
    }
    return colorizeNearby;
}

export function genVoronoi2(ray: number, numberOfPoints: number, disFunc: (A: distance.point,
    B: distance.point) => number = distance.euclidianDistance): texture.texture {
        let listOfpoints: distance.point[] = distance.genPoints(numberOfPoints, 1000, 1000);
        let listOfColors: color.color[] = color.listOfRandomColors(numberOfPoints);
        function colorizeNearby(x: number, y: number): color.color {
            const distances = listOfpoints.map((element) => disFunc(element, {x, y})).sort((a, b) => (a - b));
            if (distances[0] < ray)
                return color.RED;
            return listOfColors[distance.closeToX(x, y, listOfpoints, disFunc)];
        }
        return colorizeNearby;
    }