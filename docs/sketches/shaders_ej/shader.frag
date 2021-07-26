precision mediump float;

uniform sampler2D texture;

// interpolated color (same name as in vertex shader)
varying vec4 vVertexColor;
// interpolated texcoord (same name as in vertex shader)
varying vec2 vTexCoord;

void main() {

  vec4 color = texture2D(texture, vTexCoord);
  float grayColor = (color.r + color.g + color.b)/3.0;
  color.r = grayColor;
  color.g = grayColor;
  color.b = grayColor;
  color.a = 1.0;
  gl_FragColor = color * vVertexColor;  
  //gl_FragColor = vVertexColor;  
}