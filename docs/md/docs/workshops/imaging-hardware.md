# Image Processing with Shaders

## Regular image on a Plane
> :P5 lib1=https://cdn.jsdelivr.net/gh/freshfork/p5.EasyCam@1.2.1/p5.easycam.js, sketch=/docs/sketches/img-hardware/3dImagePlane.js, width=500, height=400
```glsl | texture.frag
void main() {
  	gl_FragColor = texture2D(texture, vTexCoord) * vVertexColor;
}
```


## GrayScale - Average
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