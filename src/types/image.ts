import * as color from "../types/color";

export type image = { width: number, height: number, data: color.color[][] };

export function createImage(_width: number, _height: number, _data: color.color[][]): image {
    console.assert(_data.length == _height, "Height has a wrong value", _height, _data.length);
    console.assert(_data[0].length == _width, "Width has a wrong value", _width, _data[0].length);
    return { width: _width, height: _height, data: _data }
};

export function getWidth(i: image): number { return i.width; };
export function getHeight(i: image): number { return i.height; };
export function getData(i: image, x: number, y: number): color.color { return i.data[x][y]; };

export function setWidth(i: image, width: number) {
    console.assert(width >= 0, "Width is negative !");
    i.width = width;
};
export function setHeight(i: image, height: number) {
    console.assert(height >= 0, "Height is negative !");
    i.height = height;
};
export function setData(i: image, x: number, y: number, c: color.color) { i.data[x][y] = c; };