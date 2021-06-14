// texture.frag 
precision mediump float;

uniform sampler2D texture;

// interpolated color (same name as in vertex shader)
varying vec4 vVertexColor;
// interpolated texcoord (same name as in vertex shader)
varying vec2 vTexCoord;

void main() {
	vec4 imgColor = texture2D(texture, vTexCoord); 
  	float avg = imgColor.r*0.2126 + imgColor.g*0.7152 + imgColor.b*0.0722;
  	imgColor.r = avg;
  	imgColor.g = avg;
  	imgColor.b =  avg;
  	gl_FragColor = imgColor * vVertexColor;
}