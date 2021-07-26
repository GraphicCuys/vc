const w = 500;
const h = 400;
var img, imgShader;
let n = 0;
let shaderSelect;

var idn = [0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0];
var blur = [1/9, 1/9, 1/9, 1/9, 1/9, 1/9, 1/9, 1/9,1/9];
var sharp = [0.0, -1.0, 0.0, -1.0, 5.0, -1.0, 0.0, -1.0, 0.0];
var edges1 = [0.0, 1.0, 0.0, 1.0, -4.0, 1.0, 0.0, 1.0, 0.0];
var edges3 = [1.0, 0.0, -1.0, 0.0, 0.0, 0.0, -1.0, 0.0, 1.0];
var edges2 = [-1.0, -1.0, -1.0, -1.0, 8.0, -1.0, -1.0, -1.0, -1.0];

var matrixs = [idn,blur,sharp,edges1,edges2,edges3]

function preload(){
    img = loadImage('/vc/docs/sketches/cuy.jpg')  
    imgShader = loadShader('/vc/docs/sketches/img-hardware/shader.vert', '/vc/docs/sketches/img-hardware/kernel-texture.frag');
}


function setup() {
  background(190, 255, 255);
  createCanvas(w, h, WEBGL);  
  shader(imgShader);
  names = ["Identidad","Blur","Sharp","Edges1","Edges2","Edges3"]
  shaderSelect = createSelect();
  shaderSelect.position(400, 20);
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
  imgShader.setUniform('texture', img);
  imgShader.setUniform('texOff', [1/img.width, 1/img.height]);
  imgShader.setUniform('mask', matrixs[n]);

}
function chooseMode(){
  for (var i = 0; i < names.length; i++) {
    if(shaderSelect.value() === names[i]){
      n = i;
      break;
    }
  }
}