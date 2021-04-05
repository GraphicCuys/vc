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
La convolucion requiere realizar una operacion a cada pixel con los pesos de sus vecinos adyacente obeteniendo los siguientes rsultados.

###Original

|0|0|0|
|0|1|0|
|0|0|0|


> :P5 lib1=https://unpkg.com/ml5@latest/dist/ml5.min.js, sketch=/docs/sketches/image2.js, width=512, height=512

## ASCII

Para la realización de la transformación de imágenes en el código ascii en primera instancia se paso la imagen a escala de grises usando la función filter integrada de P5, y se resécalo la misma a una menor resolución respetando su relación de aspecto, posteriormente y pasando pixel a pixel se cambio cada valor entre 0 y 255 por un carácter en base a que tan oscuro fuera cada uno de ellos de una lista organizada previamente de mayor menor (esta lista fue arbitraria y podría cambiarse según conveniencia), finalmente se organizaron los caracteres en lineas y se separaron por saltos de linea, posteriormente y para garantizar la equidistancia entre las letras se utilizo una fuente monospaced, es decir que el tamaño de las letras es el mismo para todos los caracteres (para este caso se uso la fuente Courier, que podría ser cambiada por otra con las mismas características) igual mente se estableció el interlineado basado en la relación de aspecto de la imagen para mantener la forma y dimensiones de la misma en su representación ascii.

> :P5 lib1=https://unpkg.com/ml5@latest/dist/ml5.min.js, sketch=/docs/sketches/ascii.js, width=512, height=512

## Photo mosaic
> :P5 lib1=https://cdn.jsdelivr.net/gh/objetos/p5.quadrille.js/p5.quadrille.min.js, sketch=/docs/sketches/photo-mosaic.js, width=800, height=1200

> :ToCPrevNext