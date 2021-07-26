# Convolutional Matrix with Harwdware

El proceso de shaders se puede extender a operaciones con filtros de convulsión sobre las imágenes que utilizamos como texturas sobre el objeto tridimensional, para esto aplicamos cada matriz sobre los pixeles adyacentes del pixel analizado, aplicando la convolución y obteniendo los nuevos valores para cada canal de color de los mismos.

La matriz de convolucion se pasa como un parametro en una variable uniforme en conjunto con la imagen y las coordenandas de la textura, de esta manera logramos colocar diferentes mascaras de convolucion al pasar otra matriz como parametro dentro de script en javasript.

> :P5 sketch=/docs/sketches/img-hardware/3dImagePlanez-kernel.js, width=500, height=400

En el archivo frag tomamos la matriz de convolucion y se la aplicamos a la matriz de texeles adyacentes para generar la modificacion de la textura.

```glsl | kernel-texture.frag
void main() {
	//Get Coordinates for every neighbor pixel
	tx[0] = vTexCoord.st + vec2(-texOff.s, -texOff.t); 
	tx[1] = vTexCoord.st + vec2(0.0, -texOff.t); 
	tx[2] = vTexCoord.st + vec2(texOff.s, -texOff.t); 
	tx[3] = vTexCoord.st + vec2(-texOff.s, 0.0); 
	tx[4] = vTexCoord.st + vec2(0.0, 0.0); 
	tx[5] = vTexCoord.st + vec2(texOff.s, 0.0); 
	tx[6] = vTexCoord.st + vec2(-texOff.s, texOff.t); 
	tx[7] = vTexCoord.st + vec2(0.0, texOff.t); 
	tx[8] = vTexCoord.st + vec2(texOff.s, texOff.t);

	//Get RGBA color from the image in each pixel
	vec4 rgba[9];
	for(int i=0; i<9; i++){
		rgba[i] = texture2D(texture, tx[i]);	
	}

	//Apply Convolutional Operation to the pixel
	vec4 conv;
	for(int i=0; i<9; i++){
		conv += rgba[i] * mask[i];	
	}
	conv.a = 1.0;

  	gl_FragColor = conv;
}
```

> :ToCPrevNext