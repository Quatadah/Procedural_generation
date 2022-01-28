# Format JSON

```json
{
    "width": 200,
    "height": 200,
    "composition": {
        "type": "filter", 
        "name": "", 
        "args": [], 
        "images": [
            {"type": "generator", "name": "", "args":[]},
            {"type": "filter", "name": "", "args":[], "images": [
                {"type": "generator", "name": "", "args":[]},
                {"type": "generator", "name": "", "args":[]}
            ]}
        ]
    }
}
```

# Générateurs
- monochrome:                 couleur: color <br>
- random <br>
- perlin:                     nb_octaves: number, reduction:number, scale: number <br>
- checkerboard:               xstep: number, ystep: number, c1: color, c2: color <br>
- triangleBoard:              xstep: number, ystep: number, c1: color, c2: color <br>
- hexagoneBoard:              xstep: number, ystep: number, c1: color, c2: color, c3: color <br>
- truncatedSquareBoard:       xstep: number, ystep: number, c1: color, c2: color, c3: color <br>
- triHexagonalBoard:          xstep: number, ystep: number, c1: color, c2: color, c3: color <br>
- softenedSquare:             xstep: number, ystep: number, c1: color, c2: color, c3: color <br>
- softenedHexagone:           xstep: number, ystep: number, c1: color, c2: color, c3: color <br>
- truncatedHexagone:          xstep: number, ystep: number, c1: color, c2: color, c3: color, 
                            c4: color <br>
- triangularElongatedBoard:   xstep: number, ystep: number, c1: color, c2: color, c3: color, 
                            c4: color <br>
- truncatedSquareStar:        xstep : number, ystep : number, bgcolor : color, bdcolor1 : color,
                            bdcolor2 : color, c1 : color, c2 : color, c3 : color <br>
- star:                       n: number, d: number, e: number, xstep: number, ystep: number, 
                            bgcolor: color, colors: color[] <br>
- starLine:                   n: number, d: number, k: number, size: number, xstep: number, 
                            ystep: number, bgcolor: color, bdcolor: color <br>
- starLinedFilled:            n: number, d: number, k: number, size: number, xstep: number, 
                            ystep: number, bgcolor: color, bdcolor: color, colors: color[] <br>
- voronoi:                    ray: number, numberOfPoints: number, distance: distance = euclidian <br>

# Filtres
- blur:                       1 image<br>
- add:                        2 images<br>
- multiply_colors:            2 images<br>
- divide:                     2 images<br>
- contrast:                   1 image, contrast: number<br>
- translate:                  1 image, a: number, b: number<br>
- symetryX:                   1 image, xc: number<br>
- symetryY:                   1 image, yc: number<br>
- rotate:                     1 image, xc: number, yc: number, angle: number<br>
- multiply_scalar:            1 image, scalar: number<br>
- convolution:                1 image, matrix: int[][]<br>
- upScale:                    1 image, factor: number, interpolation: interpolation<br>


# Liste des fonctions
- interpolations: linear, cos, cubic <br>
- distance: euclidian, manhattan <br>

# Format des types spécifiques
```typescript
color : {"r": 255, "g": 255, "b": 0, "a": 255}
```