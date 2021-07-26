precision mediump float;

// Base image
uniform sampler2D base_img;

// List of images to replace;
uniform sampler2D images_1, images_2, images_3, images_4, images_5, 
                  images_6, images_7, images_8, images_9, images_10;

// List of average colors of the images
uniform vec4 averageColor_1, averageColor_2, averageColor_3, averageColor_4, averageColor_5, 
             averageColor_6, averageColor_7, averageColor_8, averageColor_9, averageColor_10;

uniform float resolution;

// interpolated color (same name as in vertex shader)
varying vec4 vVertexColor;
// interpolated texcoord (same name as in vertex shader)
varying vec2 vTexCoord;

vec4 imagesColorMean[10];

float colorDistance(vec4 color1, vec4 color2){
  float colorsDistance = distance(color1, color2);
  return colorsDistance;
}

vec4 bestColorAproximation(vec4 texColor, vec2 symbolCoord){
  
  //Max. color distance = root(1^2 + 1^2 + 1^2) -> 1.74
  float bestDistance = 1.74;
  vec4 color;

  if (colorDistance(texColor, averageColor_1) < bestDistance){
    bestDistance = colorDistance(texColor, averageColor_1);
    color = texture2D(images_1, symbolCoord);
  }
  if (colorDistance(texColor, averageColor_2) < bestDistance){
    bestDistance = colorDistance(texColor, averageColor_2);
    color = texture2D(images_2, symbolCoord);
  }
  if (colorDistance(texColor, averageColor_3) < bestDistance){
    bestDistance = colorDistance(texColor, averageColor_3);
    color = texture2D(images_3, symbolCoord);
  }
  if (colorDistance(texColor, averageColor_4) < bestDistance){
    bestDistance = colorDistance(texColor, averageColor_4);
    color = texture2D(images_4, symbolCoord);
  }
  if (colorDistance(texColor, averageColor_5) < bestDistance){
    bestDistance = colorDistance(texColor, averageColor_5);
    color = texture2D(images_5, symbolCoord);
  }
  if (colorDistance(texColor, averageColor_6) < bestDistance){
    bestDistance = colorDistance(texColor, averageColor_6);
    color = texture2D(images_6, symbolCoord);
  }
  if (colorDistance(texColor, averageColor_7) < bestDistance){
    bestDistance = colorDistance(texColor, averageColor_7);
    color = texture2D(images_7, symbolCoord);
  }
  if (colorDistance(texColor, averageColor_8) < bestDistance){
    bestDistance = colorDistance(texColor, averageColor_8);
    color = texture2D(images_8, symbolCoord);
  }
  if (colorDistance(texColor, averageColor_9) < bestDistance){
    bestDistance = colorDistance(texColor, averageColor_9);
    color = texture2D(images_9, symbolCoord);
  }
  if (colorDistance(texColor, averageColor_10) < bestDistance){
    bestDistance = colorDistance(texColor, averageColor_10);
    color = texture2D(images_10, symbolCoord);
  }

  return color;
}

void main() {

  vec2 symbolCoord = vTexCoord * resolution;
  //[0, Resolution] (Z)
  symbolCoord = mod(symbolCoord, vec2(1.0));
  //[0, 0.99] (R)

  //Example to set the middle part of the image
  //vec2 mid = vec2((vTexCoord.x + 1.0) * 0.33, vTexCoord.y); 
  //getImagesColor();

  vec4 color = texture2D(base_img, vTexCoord) * vVertexColor;

  gl_FragColor = bestColorAproximation(color, symbolCoord);
}