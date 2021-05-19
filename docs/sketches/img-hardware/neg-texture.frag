// texture.frag 
precision mediump float;

uniform sampler2D texture;

// interpolated color (same name as in vertex shader)
varying vec4 vVertexColor;
// interpolated texcoord (same name as in vertex shader)
varying vec2 vTexCoord;

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