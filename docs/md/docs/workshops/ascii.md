# Image and video processing

## ASCII

Para la realización de la transformación de imágenes en el código ascii en primera instancia se paso la imagen a escala de grises usando la función filter integrada de P5, y se resécalo la misma a una menor resolución respetando su relación de aspecto, posteriormente y pasando pixel a pixel se cambio cada valor entre 0 y 255 por un carácter en base a que tan oscuro fuera cada uno de ellos de una lista organizada previamente de mayor menor (esta lista fue arbitraria y podría cambiarse según conveniencia), finalmente se organizaron los caracteres en lineas y se separaron por saltos de linea, posteriormente y para garantizar la equidistancia entre las letras se utilizo una fuente monospaced, es decir que el tamaño de las letras es el mismo para todos los caracteres (para este caso se uso la fuente Courier, que podría ser cambiada por otra con las mismas características) igual mente se estableció el interlineado basado en la relación de aspecto de la imagen para mantener la forma y dimensiones de la misma en su representación ascii.

> :P5 lib1=https://unpkg.com/ml5@latest/dist/ml5.min.js, sketch=/docs/sketches/ascii.js, width=512, height=512

## Photo mosaic
> :P5 lib1=https://cdn.jsdelivr.net/gh/objetos/p5.quadrille.js/p5.quadrille.min.js, sketch=/docs/sketches/photo-mosaic.js, width=800, height=1200

> :ToCPrevNext