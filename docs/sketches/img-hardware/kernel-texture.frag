// texture.frag 
precision mediump float;

uniform sampler2D texture;

// interpolated color (same name as in vertex shader)
varying vec4 vVertexColor;
// interpolated texcoord (same name as in vertex shader)
varying vec2 vTexCoord;

uniform vec2 texOff;
uniform float mask[9];

vec2 tx[9];


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