# Image Processing with Shaders

# Resolution
> :P5 lib1=https://cdn.jsdelivr.net/gh/freshfork/p5.EasyCam@1.2.1/p5.easycam.js, sketch=/docs/sketches/img-hardware/BaseImage.js, width=480, height=320

En el desarrollo de los ejercicios del foto mosaico  y ASCII tomamos una imagen base, y una lista de imágenes que son usadas para reemplazar los grupos de pixeles de la imagen base por los pixeles de las imágenes en la lista. 

Inicialmente calculamos la coordenada correspondiente al píxel de la imagen del símbolo o imagen a reemplazar, respecto a la coordenada de la textura obtenida. Ya que el rango de coordenadas para la textura varía entre 0 y 1, debemos obtener una relación entre la posición del píxel de la imagen base y la posición de las imágenes a reemplazar. Si tenemos una resolución N (Número de divisiones en la imagen), el rango de cada sub imagen a reemplazar el cual va de 0 a 1, será de 0 a 1/N respecto a la imagen base, de modo que para obtener la posición de los pixeles en la sub imagen o símbolo multiplicamos la posición obtenida de la textura por la resolución:

[symbolCoord = vTexCoord * resolution  \ ([0,N]\in \mathbb{R}) ](:Formula)    

El rango de las posiciones para las imágenes será entre 0 y N, por lo que obtenemos los valores enteros de las posiciones para
que el rango por cada imagen sea entre 0 y 1, y así obtener la posición de las imagenes en la original.

[imageCoord = floor(symbolCoord)  \ ([0,N]\in \mathbb{Z})](:Formula)

[symbolCoord = symbolCoord - imageCoord \ ([0,0.99...]\in \mathbb{R}))](:Formula)

Por último  dividimos la coordenada de imagen entre la resolución para obtener el color del primer pixel por cada división y con base a el, realizar la comparación con las sub imagenes.


## ASCII

Para el caso de ASCII las imágenes son seleccionadas a partir de los valores de Luma que fueron utilizados para la escala de grises. Dependiendo del valor, se selecciona de entre 10 diferentes imágenes de símbolos.

> :P5 lib1=https://cdn.jsdelivr.net/gh/freshfork/p5.EasyCam@1.2.1/p5.easycam.js, sketch=/docs/sketches/img-hardware/ASCII/ascii.js, width=480, height=320

```glsl | ascii.frag
    
    void main() {

    vec2 symbolCoord = vTexCoord * resolution;
    //[0, Resolution] (R)
    vec2 imageCoord = floor(symbolCoord);
    //[0, Resolution] (Z)
    symbolCoord = symbolCoord - imageCoord;
    //[0, 0.99] (R)
    imageCoord = imageCoord*vec2(1.0)/vec2(resolution);
    //[0, 0.99] (R)

    vec4 color = texture2D(base_img, imageCoord) * vVertexColor;

    // Get gray color of image by Luma
    float grayColor = (color.r*0.2126 + color.g*0.7152 + color.b*0.0722);

    // Set symbol by gray color
    if(grayColor < 0.1){
        color = texture2D(symbol_1, symbolCoord);
    }else if(0.1 < grayColor && grayColor < 0.2){
        color = texture2D(symbol_2, symbolCoord);
    }else if(0.2 < grayColor && grayColor < 0.3){
        color = texture2D(symbol_3, symbolCoord);
    }else if(0.3 < grayColor && grayColor < 0.4){
        color = texture2D(symbol_4, symbolCoord);
    }else if(0.4 < grayColor && grayColor < 0.5){
        color = texture2D(symbol_5, symbolCoord);
    }else if(0.5 < grayColor && grayColor < 0.6){
        color = texture2D(symbol_6, symbolCoord);
    }else if(0.6 < grayColor && grayColor < 0.7){
        color = texture2D(symbol_7, symbolCoord);
    }else if(0.7 < grayColor && grayColor < 0.8){
        color = texture2D(symbol_8, symbolCoord);
    }else if(0.8 < grayColor && grayColor < 0.9){
        color = texture2D(symbol_9, symbolCoord);
    }else{
        color = texture2D(symbol_10, symbolCoord);
    }

    gl_FragColor = color;
    
    }
```

## Photo mosaic

En el caso del mosaico las imagenes son seleccionadas dependiendo de cual de ellas tiene una distancia entre el color promedio de sus pixeles más cercana al color promedio de la división de la imagen base. Los colores promedio por imagen se calculan una sola vez y de la misma forma que se hizo en el procesamiento por software, y son enviadas a las constantes del shader.

> :P5 lib1=https://cdn.jsdelivr.net/gh/freshfork/p5.EasyCam@1.2.1/p5.easycam.js, sketch=/docs/sketches/img-hardware/Photomosaic/photo-mosaic.js, width=480, height=320

```glsl | photo-mosaic.frag

    float colorDistance(vec4 color1, vec4 color2){
        return distance(color1, color2);
    }

    vec4 bestColorAproximation(vec4 texColor, vec2 symbolCoord){
    
        //Max. color distance = root(1^2 + 1^2 + 1^2) -> 1.74
        float bestDistance = 1.74;
        vec4 color;

        if (colorDistance(texColor, averageColor_1) < bestDistance){
            bestDistance = colorDistance(texColor, averageColor_1);
            color = texture2D(images_1, symbolCoord);
        }
        if (colorDistance(texColor, averageColor_2) < bestDistance){
            bestDistance = colorDistance(texColor, averageColor_2);
            color = texture2D(images_2, symbolCoord);
        }
        if (colorDistance(texColor, averageColor_3) < bestDistance){
            bestDistance = colorDistance(texColor, averageColor_3);
            color = texture2D(images_3, symbolCoord);
        }
        if (colorDistance(texColor, averageColor_4) < bestDistance){
            bestDistance = colorDistance(texColor, averageColor_4);
            color = texture2D(images_4, symbolCoord);
        }
        if (colorDistance(texColor, averageColor_5) < bestDistance){
            bestDistance = colorDistance(texColor, averageColor_5);
            color = texture2D(images_5, symbolCoord);
        }
        if (colorDistance(texColor, averageColor_6) < bestDistance){
            bestDistance = colorDistance(texColor, averageColor_6);
            color = texture2D(images_6, symbolCoord);
        }
        if (colorDistance(texColor, averageColor_7) < bestDistance){
            bestDistance = colorDistance(texColor, averageColor_7);
            color = texture2D(images_7, symbolCoord);
        }
        if (colorDistance(texColor, averageColor_8) < bestDistance){
            bestDistance = colorDistance(texColor, averageColor_8);
            color = texture2D(images_8, symbolCoord);
        }
        if (colorDistance(texColor, averageColor_9) < bestDistance){
            bestDistance = colorDistance(texColor, averageColor_9);
            color = texture2D(images_9, symbolCoord);
        }
        if (colorDistance(texColor, averageColor_10) < bestDistance){
            bestDistance = colorDistance(texColor, averageColor_10);
            color = texture2D(images_10, symbolCoord);
        }

        return color;
    }

    void main() {

        vec2 symbolCoord = vTexCoord * resolution;
        //[0, Resolution] (R)
        vec2 imageCoord = floor(symbolCoord);
        //[0, Resolution] (Z)
        symbolCoord = symbolCoord - imageCoord;
        //[0, 0.99] (R)
        imageCoord = imageCoord*vec2(1.0)/vec2(resolution);
        //[0, 0.99] (R)

        vec4 color = texture2D(base_img, imageCoord) * vVertexColor;

        gl_FragColor = bestColorAproximation(color, symbolCoord);
    }
```

> :ToCPrevNext