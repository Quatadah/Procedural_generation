import * as generator from "./types/generator";
import * as filter from "./types/filter";
import * as image from "./types/image";
import * as texture from "./types/texture";
import * as distance from "./types/distance";
import * as interpolation from "./types/interpolation";
import * as general from "./filters/general"
import * as convolution from "./filters/convolution";
import * as transform from "./filters/transform";
import * as color from "./types/color";
import { filterUpScale } from "./filters/scaling";
import { hyperbolic } from "./filters/hyperbolic";
import { contrast } from "./filters/colorimetric";
import { texMonochrome } from "./generators/monochrome"
import { texRandom } from "./generators/random"
import { texPerlin } from "./generators/perlin"
import { texCheckerBoard } from "./generators/polygone/regular/checkerBoard"
import { texTriangleBoard } from "./generators/polygone/regular/triangular"
import { texHexagoneBoard } from "./generators/polygone/regular/hexagonal"
import { textruncatedSquareBoard } from "./generators/polygone/semi-regular/truncatedsquare"
import { textriHexagonalBoard } from "./generators/polygone/semi-regular/trihexagonal"
import { texSoftenedSquare } from "./generators/polygone/semi-regular/squaresoftened"
import { texSoftenedHexagone } from "./generators/polygone/semi-regular/hexagonalsoftened"
import { texTruncatedHexagone } from "./generators/polygone/semi-regular/truncatedhexagone"
import { texTriangularElongatedBoard } from "./generators/polygone/semi-regular/triangularelongated"
import { texStar } from "./generators/polygone/starlike/starfilled"
import { texStarLineSimple, texStarLineBorder, texStarLineDouble } from "./generators/polygone/starlike/starline"
import { texStarLineFilledSimple, texStarLineFilledBorder, texStarLineFilledDouble } from "./generators/polygone/starlike/starlinefilled"
import { texTruncatedSquareStar } from "./generators/polygone/starlike/truncatedsquare"
import { genVoronoi } from "./generators/distances/voronoi"
import { texCircular, texHexagonal } from "./generators/distances/sdf";


let filters: { [key: string]: filter.filter } = {
    'add': general.add,
    'multiply_colors': general.multiply_colors,
    'multiply_scalar': general.multiply_scalar,
    'divide': general.divide,
    'blur': convolution.blur,
    'convolution': convolution.convolution,
    'symetryX': transform.symetryX,
    'symetryY': transform.symetryY,
    'rotate': transform.rotate,
    'translate': transform.translate,
    'filterUpScale': filterUpScale,
    'contrast': contrast,
    'hyperbolic' : hyperbolic
};

let generators: { [key: string]: generator.generator } = {
    'monochrome': texMonochrome,
    'random': texRandom,
    'perlin': texPerlin,
    'checkerboard': texCheckerBoard,
    'triangleBoard': texTriangleBoard,
    'hexagoneBoard': texHexagoneBoard,
    'truncatedSquareBoard': textruncatedSquareBoard,
    'triHexagonalBoard': textriHexagonalBoard,
    'softenedSquare': texSoftenedSquare,
    'softenedHexagone': texSoftenedHexagone,
    'truncatedHexagone': texTruncatedHexagone,
    'triangularElongatedBoard': texTriangularElongatedBoard,
    'star': texStar,
    'starLineSimple': texStarLineSimple,
    'starLineBorder': texStarLineBorder,
    'starLineDouble': texStarLineDouble,
    'starLineFilledSimple': texStarLineFilledSimple,
    'starLineFilledBorder': texStarLineFilledBorder,
    'starLineFilledDouble': texStarLineFilledDouble,
    'truncatedSquareStar' : texTruncatedSquareStar,
    'voronoi': genVoronoi,
    'texCircular': texCircular,
    'texHexagonal': texHexagonal,
};

let distances: { [key: string]: distance.distance } = {
    "euclidian": distance.euclidianDistance,
    "manhattan": distance.manhattanDistance
};

let interpolations: { [key: string]: interpolation.interpolation } = {
    "linear": interpolation.linearInterpolation,
    "cos": interpolation.cosineInterpolation,
    "cubic": interpolation.cubicInterpolation
};

let colors: { [key: string]: color.color} = {
    "Black": color.BLACK,
    "White": color.WHITE,
    "Blue": color.BLUE,
    "Green": color.GREEN,
    "Red": color.RED,
    "C1": color.C1,
    "C2": color.C2,
    "C3": color.C3,
    "C4":color.C4
}

interface filter_int {
    'type': 'filter',
    'name': string,
    'images': composition_int[],
    'args': any[]
}

interface generator_int {
    'type': 'generator',
    'name': string,
    'args': any[]
}

interface composition_int {
    'type': string,
    'name': string,
    'images'?: composition_int[],
    'args': any[]
}

interface interface_int {
    'width': number,
    'height': number,
    'composition': generator_int | filter_int
}

function isFilter(composition: composition_int): composition is filter_int {
    return 'type' in composition
        && composition.type === 'filter'
        && 'name' in composition
        && 'images' in composition
        && 'args' in composition
        && composition.images!.every((x: composition_int) => (isFilter(x) || isGenerator(x)));
}

function isGenerator(composition: composition_int): composition is generator_int {
    return 'type' in composition
        && composition.type === "generator"
        && 'name' in composition
        && 'args' in composition;
}

function filterExists(filter: string): boolean {
    return filter in filters;
}

function generatorExists(generator: string): boolean {
    return generator in generators;
}

function structureIsValid(structure: interface_int): boolean {
    console.assert('width' in structure, "Property 'width' is missing");
    console.assert('height' in structure, "Property 'height' is missing");
    console.assert('composition' in structure, "Property 'composition' is missing");
    console.assert(structure.width && structure.width > 0, "Property 'width' must be a value greater than 0");
    console.assert(structure.height && structure.height > 0, "Property 'height' must be a value greater than 0");
    console.assert(isFilter(structure.composition) || isGenerator(structure.composition), "Property 'composition' must be a generator or a filter");

    return true;
}

export function loadCompo(compo: composition_int): texture.texture {
    if (isFilter(compo)) {
        let filter = compo.name;

        if (!filterExists(filter)) {
            throw Error("This filter does not exist : " + filter);
        }

        if (filter == "upScale") {
            compo.args[2] = interpolations[compo.args[2]];
        }

        return filters[filter](compo.images.map((x: composition_int) => loadCompo(x)), ...compo.args);

    } else if (isGenerator(compo)) {
        let generator: string = compo.name;

        if (!generatorExists(generator)) {
            throw Error("This generator does not exist : " + generator);
        }

        if (generator == "voronoi") {
            compo.args[2] = distances[compo.args[2]];
        }

        return generators[generator](...compo.args);
    } else {
        throw Error("Error, not a valid filter or generator : " + compo);
    }
}

export function loadJson(): image.image {
    let fileContent = require('../composition.json');

    if (structureIsValid(fileContent)) {
        let width = fileContent.width;
        let height = fileContent.height;
        let compo = fileContent.composition;

        let tex = loadCompo(compo);

        if (tex) {
            return texture.texture2image(tex, width, height);
        }
    }

    throw Error("Unable to return an image with JSON entry.");
};