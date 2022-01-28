import * as image from "./types/image";
import * as color from "./types/color";
import { loadJson } from "./interface"

export function imageToCanvas(canvas: HTMLCanvasElement, gen_img: image.image) {
    const width = image.getWidth(gen_img), height = image.getHeight(gen_img);
    canvas.width = width; canvas.height = height;

    let context = canvas.getContext('2d');
    if (context) {
        let img = context.createImageData(width, height);
        let n = 0; // Index inside the image array
        for (let y = 0; y < canvas.height; y++) {
            for (let x = 0; x < canvas.width; x++, n += 4) {
                let col = image.getData(gen_img, y, x);
                img.data[n] = color.getR(col);
                img.data[n + 1] = color.getG(col);
                img.data[n + 2] = color.getB(col);
                img.data[n + 3] = color.getA(col);
            }
        }
        context.putImageData(img, 0, 0);
    } else {
        throw Error("Context is null");
    }
}

export function main(): image.image {
    return loadJson();
}

