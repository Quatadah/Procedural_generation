import * as color from "../types/color";
import { multiply_scalar_filter } from "./compose";
import * as texture from "../types/texture"

function calcul_convolution(matrix: number[][], tex: texture.texture, x: number, y: number): color.color {
    let middle_matrix = Math.floor(matrix.length / 2);

    let acc_r = 0;
    let acc_g = 0;
    let acc_b = 0;
    let sum_matrix_elem = matrix.reduce((acc, currentValue) => acc + currentValue.reduce((acc2, currentValue2) => acc2 + currentValue2), 0);
    if (sum_matrix_elem === 0) {
        sum_matrix_elem = 1;
    }

    matrix.forEach(function (row, i) {
        row.forEach(function(value, j) { 
            let tmp_x = x - (middle_matrix - i);
            let tmp_y = y - (middle_matrix - j);

            let tmp_c = multiply_scalar_filter(tex(tmp_x, tmp_y), value);
            acc_r += tmp_c.r;
            acc_g += tmp_c.g;
            acc_b += tmp_c.b;
        })
    });

    return color.createColor(acc_r / sum_matrix_elem, acc_g / sum_matrix_elem, acc_b / sum_matrix_elem, color.getA(tex(x, y)));
}

export function convolution([tex]: texture.texture[], matrix: number[][]): texture.texture {
    return (x: number, y: number) => calcul_convolution(matrix, tex, x, y);
}

export function blur([tex]: texture.texture[]): texture.texture {
    let matrix = Array.from(
        { length: 3 },
        (_, y) => Array.from(
            { length: 3 },
            (_, x) => 1)
    );

    return convolution([tex], matrix);
}