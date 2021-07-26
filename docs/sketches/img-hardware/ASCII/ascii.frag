precision mediump float;

uniform int image_mode;

// Base image
uniform sampler2D base_img;

// Images list of symbols to replace;
uniform sampler2D symbol_1, symbol_2, symbol_3, symbol_4, symbol_5, 
                  symbol_6, symbol_7, symbol_8, symbol_9, symbol_10;

uniform float resolution;

// interpolated color (same name as in vertex shader)
varying vec4 vVertexColor;
// interpolated texcoord (same name as in vertex shader)
varying vec2 vTexCoord;

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