"use strict";

import { loadCompo } from "./interface";
import { imageToCanvas } from "./main";
import { main } from "./main";
import { texture2image} from "./types/texture";

let examples = {
            //distances
                "manhattanVoronoi" : require('./examples/distances/manhattanVoronoi.json'),
                "euclidianVoronoi" : require('./examples/distances/euclidianVoronoi.json'),
                "circular" : require('./examples/distances/circular.json'),
                "hexagonale" : require('./examples/distances/hexagonal.json'),
            //regular
                "checkerboard" : require('./examples/regular/checkerboard.json'),
                "hexagonal" : require('./examples/regular/hexagonal.json'),
                "triangular" : require('./examples/regular/triangular.json'),

            //semi-regular
                "hexagonalsoftened" : require('./examples/semi-regular/hexagonalsoftened.json'),
                "squaresoftened" : require('./examples/semi-regular/squaresoftened.json'),
                "triangularelongated" : require('./examples/semi-regular/triangularelongated.json'),
                "trihexagonal" : require('./examples/semi-regular/trihexagonal.json'),
                "truncatedhexagone" : require('./examples/semi-regular/truncatedhexagone.json'),
                "truncatedsquare" : require('./examples/semi-regular/truncatedsquare.json'),

            //starlike
            
                "starlinesimple" : require('./examples/starlike/starlinesimple.json'),
                "starlinedouble" : require('./examples/starlike/starlinedouble.json'),
                "starlineborder" : require('./examples/starlike/starlineborder.json'),
                "starlinefilledsimple" : require('./examples/starlike/starlinefilledsimple.json'),
                "starlinefilleddouble" : require('./examples/starlike/starlinefilleddouble.json'),
                "starlinefilledborder" : require('./examples/starlike/starlinefilledborder.json'),                
                "truncatedsquarestar" : require('./examples/starlike/truncatedsquarestar.json'),

            //filters
                //composition
                    "addingfilter" : require('./examples/filters/addingfilter.json'),
                    "multiplyingfilter" : require('./examples/filters/multiplyingfilter.json'),
                    "scalarmultiplyingfilter" : require('./examples/filters/scalarmultiplyingfilter.json'),
                    "dividingfilter" : require('./examples/filters/dividingfilter.json'),
                //transformation
                    "translation": require('./examples/filters/translation.json'),
                    "symetryX" : require('./examples/filters/symetryX.json'),
                    "symetryY" : require('./examples/filters/symetryY.json'),
                    "rotate" : require('./examples/filters/rotate.json'),
                    "hyperbolic" : require('./examples/filters/hyperbolic.json'),
                //convolution
                    "convolution": require('./examples/filters/convolution.json'),

                //other types of filters
                    "contrast" : require('./examples/filters/contrast.json'),
                    "blur" : require('./examples/filters/blur.json'),
                //other types of generators
                    "perlin" : require('./examples/others/perlin.json'),
                    "monochrome" : require('./examples/others/monochrome.json'),
                    "random" : require('./examples/others/random.json')
            };
function loadString(){
    let txt = JSON.parse(document.getElementById("json_code").value);
    let width = txt.width;
    let height = txt.height;
    let compo = txt.composition;
    let tex = texture2image(loadCompo(compo), width, height);
    imageToCanvas(document.getElementById('drawing_board'), tex);
}

function loadExample(){
    let e = document.getElementById("pavages");
    let txt =document.getElementById("json_code");
    let v = e.value; 
    let fileContent = examples[v];
    txt.value = JSON.stringify(fileContent);
}
let b1 = document.getElementById("load_example");
let b2 =document.getElementById("read_json");
b1.onclick = loadExample;
b2.onclick = loadString;
loadExample();
loadString();
imageToCanvas(document.getElementById('drawing_board'), main());
