precision mediump float;

uniform sampler2D base_img;

uniform sampler2D images[2];

uniform float resolution;

// interpolated color (same name as in vertex shader)
varying vec4 vVertexColor;
// interpolated texcoord (same name as in vertex shader)
varying vec2 vTexCoord;

void main() {

  vec2 symbolCoord = vTexCoord * resolution;

  vec2 imageCoord = floor(symbolCoord);

  imageCoord = imageCoord * vec2(1.0) / vec2(resolution);

  vec4 color = texture2D(images[0], imageCoord);

  gl_FragColor = color;  
  
}