const w = 500;
const h = 400;
var img;


function preload(){
    img = loadImage('/vc/docs/sketches/45634.png')  
}


function setup() {
  background(190, 255, 255);
  createCanvas(w, h, WEBGL);  
}

function draw() {
  texture(img);
  textureMode(NORMAL);
  sphere();

}