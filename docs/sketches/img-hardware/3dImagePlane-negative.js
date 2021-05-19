const w = 500;
const h = 400;
var img, imgShader;


function preload(){
    img = loadImage('/vc/docs/sketches/cuy.jpg')  
    imgShader = loadShader('/vc/docs/sketches/img-hardware/shader.vert', '/vc/docs/sketches/img-hardware/neg-texture.frag');
}


function setup() {
  background(190, 255, 255);
  createCanvas(w, h, WEBGL);  
  shader(imgShader);
}

function draw() {
  beginShape();
  vertex(-w/2, -h/2, 0, 0);
  vertex( w/2, -h/2, 1, 0);
  vertex( w/2,  h/2, 1, 1);
  vertex(-w/2,  h/2, 0, 1);
  endShape(CLOSE);
  imgShader.setUniform('texture', img);

}