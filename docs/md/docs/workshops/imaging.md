# Image and video processing

## Basic filters

### Original
La imagen original se maneja como un arreglo de pixeles descompuestos en sus componentes de color y opacidad con valores entre 0 y 255 de la siguinte manera manera 

[R1,G1,B1,A1,  R2,G2,B2,A2  ....]

### Negativo
Este filtro se obtiene restandole a 255 cada uno de los componentes de colores de la imagen  

[255-R , 255-G, 255-B]

### Gray Average
Este filtro se obtiene realizando un promedio de los 3 colores y luego aplicando este mismo valor a cada componente del pixel 

avg = R+G+B/3  ->  [avg, avg, avg]  

### Gray Luma
En este filtro en lugar de utilizar el promedio se multiplica cada valor por una constante dada que 

luma = 0.2126*R + 0.7152*G + 0.0722*B -> [luma, luma, luma]

> :P5 lib1=https://unpkg.com/ml5@latest/dist/ml5.min.js, sketch=/docs/sketches/filters.js, width=512, height=512


## Kernel manipulation
El Kernel o Matriz de convolucion de una imagen es una pequeña matriz que representa un pixel central y sus pixeles vecinos adyacentes, cada uno de estos pixeles tiene un peso determinadao.
La convolucion requiere realizar una operacion a cada pixel con los pesos de sus vecinos adyacente obeteniendo los siguientes resultados.

### Original
|     |     |     |
|-----|-----|-----|
|  0  |  0  |  0  |
|  0  |  1  |  0  |
|  0  |  0  |  0  |

### Sharp
|     |     |     |
|-----|-----|-----|
|  0  |  -1  |  0  |
|  -1  |  5  | -1  |
|  0  |  -1  |  0  |

### Blur
|     |     |     |
|-----|-----|-----|
|  1/9  |  1/9  |  1/9  |
|  1/9  |  1/9  |  1/9  |
|  1/9  |  1/9  |  1/9  |

### Edges
|     |     |     |
|-----|-----|-----|
|  1  |  0  |  -1 |
|  0  |  0  | 0  |
|  -1  |  0  |  1  |


> :P5 lib1=https://unpkg.com/ml5@latest/dist/ml5.min.js, sketch=/docs/sketches/img-convolusion.js, width=600, height=740


## Kernel y Filtros aplicados a la misma imagen

> :P5 lib1=https://unpkg.com/ml5@latest/dist/ml5.min.js, sketch=/docs/sketches/image2.js, width=300, height=500

## ASCII
> :P5 lib1=https://unpkg.com/ml5@latest/dist/ml5.min.js, sketch=/docs/sketches/ascii.js, width=512, height=512

## Photo mosaic
> :P5 lib1=https://cdn.jsdelivr.net/gh/objetos/p5.quadrille.js/p5.quadrille.min.js, sketch=/docs/sketches/photo-mosaic.js, width=800, height=1200

> :ToCPrevNext