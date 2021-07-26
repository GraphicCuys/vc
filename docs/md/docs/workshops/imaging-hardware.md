# Image Processing with Shaders

En primer lugar recordemos que un shader nos permite renderizar cada uno de los pixeles en nuestro lienzo de manera independiente y en él por tanto incluiremos la lógica necesaria para crear las visualizaciones creadas en cada caso, gracias a una función que retornara entonces el valor del color del pixel procesado, y accediendo a algunas variables del lienzo en general y el pixel procesado, como el color y la posición.

## Regular image on a Plane

En primer lugar tenemos el mas básico de los shaders que nos permite mantener en cada pixel el color respectivo, actuando como un espejo de la imagen inicial y por tanto manteniendo su visualización igual. 

> :P5 lib1=https://cdn.jsdelivr.net/gh/freshfork/p5.EasyCam@1.2.1/p5.easycam.js, sketch=/docs/sketches/img-hardware/3dImagePlane.js, width=500, height=400
```glsl | texture.frag
void main() {
  	gl_FragColor = texture2D(texture, vTexCoord) * vVertexColor;
}
```


## GrayScale - Average
Posteriormente encontramos el shader que permite visualizar la imagen en escala de grises con el promedio de los colores, esto es posible gracias a que obtenemos el promedio de los canales de colores y dicho valor es asignado de manera individual a cada pixel de la imagen.

> :P5 lib1=https://cdn.jsdelivr.net/gh/freshfork/p5.EasyCam@1.2.1/p5.easycam.js, sketch=/docs/sketches/img-hardware/3dImagePlane-avg.js, width=500, height=400
```glsl | avg-texture.frag
void main() {
	vec4 imgColor = texture2D(texture, vTexCoord); 
  	float avg = imgColor.r*0.333 + imgColor.g*0.333 + imgColor.b*0.333;
  	imgColor.r = avg;
  	imgColor.g = avg;
  	imgColor.b =  avg;
  	gl_FragColor = imgColor * vVertexColor;
}
```


## GrayScale - Luma

Al igual que el shader anterior en este se busca pasar la imagen a escala de grises por lo que ese utilizan los valores luma (0.2126,0.7152, 0.0722) para pasar los canales de color a un valor en la escala de grises obteniendo un resultado mas cercano que el dado con el promedio.
> :P5 lib1=https://cdn.jsdelivr.net/gh/freshfork/p5.EasyCam@1.2.1/p5.easycam.js, sketch=/docs/sketches/img-hardware/3dImagePlane-luma.js, width=500, height=400
```glsl	| luma-texture.frag
void main() {
	vec4 imgColor = texture2D(texture, vTexCoord); 
  	float avg = imgColor.r*0.2126 + imgColor.g*0.7152 + imgColor.b*0.0722;
  	imgColor.r = avg;
  	imgColor.g = avg;
  	imgColor.b =  avg;
  	gl_FragColor = imgColor * vVertexColor;
}
```


## Negative

Finalmente tenemos el shader de negativo en el que pasamos cada uno de los canales de color del pixel al complemento del mismo y asignándolo al pixel correspondiente.
> :P5 lib1=https://cdn.jsdelivr.net/gh/freshfork/p5.EasyCam@1.2.1/p5.easycam.js, sketch=/docs/sketches/img-hardware/3dImagePlane-negative.js, width=500, height=400
```glsl	| neg-texture.frag
void main() {
	vec4 imgColor = texture2D(texture, vTexCoord); 
	float r = (1.0 - imgColor.r);
	float g = (1.0 - imgColor.g);
	float b = (1.0 - imgColor.b);
	imgColor.r = r;
	imgColor.g = g;
	imgColor.b = b;
  	gl_FragColor = imgColor * vVertexColor;
}
```

> :ToCPrevNext