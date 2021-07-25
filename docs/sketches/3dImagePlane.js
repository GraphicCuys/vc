const w = 500;
const h = 400;
var img;


function preload(){
    img = loadImage('/vc/docs/sketches/cuy.jpg')  
}


function setup() {
  background(190, 255, 255);
  createCanvas(w, h, WEBGL);  
}

function draw() {
  texture(img);
  textureMode(NORMAL);
  beginShape();
  vertex(-w/2, -h/2, 0, 0);
  vertex( w/2, -h/2, 1, 0);
  vertex( w/2,  h/2, 1, 1);
  vertex(-w/2,  h/2, 0, 1);
  endShape(CLOSE);

}