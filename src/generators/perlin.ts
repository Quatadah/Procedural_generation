import * as color from "../types/color";
import * as texture from "../types/texture";
import { texRandom } from "./random";
import { addition_filter, multiply_scalar_filter } from "../filters/compose";
import { filterUpScale } from "../filters/scaling";
import { cubicInterpolation } from "../types/interpolation";




export function texPerlin(nb_octaves: number, reduction: number, scale: number): texture.texture {
    let tex = texRandom();

    function texture(x: number, y: number): color.color {
        function texture_aux(x: number, y: number, _nb_octaves: number, _reduction: number, _scale: number): color.color {
            if (_nb_octaves <= 1)
                return multiply_scalar_filter(filterUpScale([tex], _scale, cubicInterpolation)(x, y), _reduction)
            else
                return addition_filter(multiply_scalar_filter(filterUpScale([tex], _scale, cubicInterpolation)(x, y), _reduction), texture_aux(x, y, _nb_octaves - 1, _reduction / reduction, _scale * scale));
        }

        return texture_aux(x, y, nb_octaves, (1 - reduction) / (1 - reduction ** nb_octaves) * (reduction ** (nb_octaves - 1)), 1);
    }

    return texture;
}
