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
> :P5 lib1=https://unpkg.com/ml5@latest/dist/ml5.min.js, sketch=/docs/sketches/image2.js, width=512, height=512


> :P5 lib1=https://unpkg.com/ml5@latest/dist/ml5.min.js, sketch=/docs/sketches/img-convolusion.js, width=580, height=750

## ASCII
> :P5 lib1=https://unpkg.com/ml5@latest/dist/ml5.min.js, sketch=/docs/sketches/ascii.js, width=512, height=512

## Photo mosaic
> :P5 lib1=https://cdn.jsdelivr.net/gh/objetos/p5.quadrille.js/p5.quadrille.min.js, sketch=/docs/sketches/photo-mosaic.js, width=800, height=1200

> :ToCPrevNext