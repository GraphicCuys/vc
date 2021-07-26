precision mediump float;

uniform sampler2D texture;

// interpolated color (same name as in vertex shader)
varying vec4 vVertexColor;
// interpolated texcoord (same name as in vertex shader)
varying vec2 vTexCoord;

void main() {

  vec4 color = texture2D(texture, vTexCoord);
  gl_FragColor = color * vVertexColor;  
  
}