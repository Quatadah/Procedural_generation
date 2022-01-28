import * as distance from "../../types/distance";
import * as color from "../../types/color";
import * as texture from "../../types/texture";


function inInterval1(L: number[], distance: number): boolean{
    let index = 0;
    function inInterval1(L: number[], distance: number, i: number): boolean{
        if (i >= L.length)
            return false
        else{
            return inInterval1(L, distance, i+2) || (distance >= L[i] && distance <= L[i+1]);
        }
    }
    return inInterval1(L, distance, index);
}

function inInterval2(L: number[], distance: number): boolean{
    let index = 1;
    function inInterval2(L: number[], distance: number, i: number): boolean{
        if (i >= L.length)
            return false
        else{
            return inInterval2(L, distance, i+2) || (distance >= L[i] && distance <= L[i+1]);
        }
    }
    return inInterval2(L, distance, index);
}


function genInterval(L: number[], x: number): number[]{
    let index = 0;
    function genInterval(L: number[], x: number, i: number): number[]{
        if (i >= x)
            return L;
        L.push(i);
        return genInterval(L, x, i + 20);
    }
    return genInterval(L, x, index);
}

export function texCircular(c1: color.color, c2: color.color, c3: color.color, 
    disFunc: (A: distance.point,B: distance.point) => number = distance.euclidianDistance ) : texture.texture {
        let width = 1000;
        let height = 1000;  
        let midPoint: distance.point = {x: width/2, y: height/2};
  
        function colorize(x: number, y: number): color.color {
            let currentPoint : distance.point = {x: x, y: y};
            let dist = disFunc(currentPoint, midPoint);
            let L = genInterval([], 1100);
            if (inInterval1(L,dist)){
                return c1;
            }
            else if (inInterval2(L,dist)){
                return c2;
            }
            else
                return c2;
        }
        return colorize;
}

function max(a: number, b: number): number { 
    if (a >= b)
        return a;
    return b;
}

export function texHexagonal(Rx: number, Ry: number, c1: color.color, c2:color.color, c3: color.color,
    disFunc: (A: distance.point, B:distance.point) => number = distance.manhattanDistance) : texture.texture {
        let width = 1000;
        let height = 1000;
        let midPoint: distance.point = {x: width/2, y: height/2};
        
        function colorize(x: number, y: number): color.color{
            let currentPoint: distance.point = {x: x, y: y};
            let Px = currentPoint.x - midPoint.x;
            let Py = currentPoint.y - midPoint.y;
            let Rx1 = Rx - midPoint.x;
            let Ry1 = Ry - midPoint.y;
            let dist = 0;
          
            if ((x >= width/2 - Rx
                    && x <= width/2 + Rx
                    && y >= height/2 + Ry)
                    || ( x >= width/2 - Rx
                    && x<= width/2 + Rx
                    && y <= height/2 - Ry))

                    dist = max(Py - Ry, Ry - Py);
                
                
            else if ( (x <= width/2 - Rx && y <= height/2 - Ry) || 
                ( x >= width/2 + Rx && y <= height/2 - Ry) || 
                (x <= width/2 - Rx && y >= height/2 - Ry ) || 
                (x >= width/2 + Rx && y >= height/2 + Ry))

                dist = disFunc({x: Px, y: Py}, {x: Rx, y: Ry});

            else if ( (x <= width/2 - Rx && y >= height/2 - Ry && y <= height/2 + Ry) ||
                        x >= width/2 + Rx && y >= height/2 - Ry && y <= height/2 + Ry)
               
                dist = max(Px - Rx, Rx - Px);
            else
                dist = 0;
            
            let L = genInterval([], 1500);
            if (dist > 0){
                if (inInterval1(L,dist)){
                    return c1;
                }
                else if (inInterval2(L,dist)){
                    return c2;
                }
                return c3;
            }else   
                return c1;
        }
        return colorize;
    }

