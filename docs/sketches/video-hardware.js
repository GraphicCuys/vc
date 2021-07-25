const w = 200;
const h = 300;
var vid, imgShader;
let n = 0;
let shaderSelect;
let button;

names = ["Original","Gray-average","Luma","Negative"]

function preload(){
    vid = createVideo("/vc/docs/sketches/pacman.mp4");
    vid.hide();
	  imgShader = [
      loadShader('/vc/docs/sketches/img-hardware/shader.vert', '/vc/docs/sketches/img-hardware/texture.frag'),
      loadShader('/vc/docs/sketches/img-hardware/shader.vert', '/vc/docs/sketches/img-hardware/avg-texture.frag'),
      loadShader('/vc/docs/sketches/img-hardware/shader.vert', '/vc/docs/sketches/img-hardware/luma-texture.frag'),
      loadShader('/vc/docs/sketches/img-hardware/shader.vert', '/vc/docs/sketches/img-hardware/neg-texture.frag'),
    ]
}


function setup() {
  background(190, 255, 255);
  createCanvas(w, h, WEBGL);
  shader(imgShader[n % names.length]);

  button = createButton('Play');
  button.position(217, 50);
  button.mousePressed(mousePressedPlay);

  shaderSelect = createSelect();
  shaderSelect.position(217, 20);
  for (let i = 0; i < names.length; i++) {
    shaderSelect.option(names[i]);
  }
  shaderSelect.changed(chooseMode);
}

function draw() {
  beginShape();
  vertex(-w/2, -h/2, 0, 0);
  vertex( w/2, -h/2, 1, 0);
  vertex( w/2,  h/2, 1, 1);
  vertex(-w/2,  h/2, 0, 1);
  endShape(CLOSE);
  imgShader[n % names.length].setUniform('texture', vid);
}

function mousePressedPlay() {
  vid.loop(); 
  shader(imgShader[n]);
}

function chooseMode(){
  for (var i = 0; i < names.length; i++) {
    if(shaderSelect.value() === names[i]){
      n = i;
      break;
    }
  }
}