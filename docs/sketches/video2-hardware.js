const w = 200;
const h = 300;
var vid, imgShader;
let n = 0;
names = ["idn","blur","sharp","edges1","edges3","edges2"]

var mask = [
    [0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0],
    [1/9, 1/9, 1/9, 1/9, 1/9, 1/9, 1/9, 1/9,1/9],
    [0.0, -1.0, 0.0, -1.0, 5.0, -1.0, 0.0, -1.0, 0.0],
    [0.0, 1.0, 0.0, 1.0, -4.0, 1.0, 0.0, 1.0, 0.0],
    [1.0, 0.0, -1.0, 0.0, 0.0, 0.0, -1.0, 0.0, 1.0],
    [-1.0, -1.0, -1.0, -1.0, 8.0, -1.0, -1.0, -1.0, -1.0]
];

function preload(){
    vid = createVideo("/vc/docs/sketches/pacman.mp4");
    vid.hide();
	imgShader = [
      loadShader('/vc/docs/sketches/img-hardware/shader.vert', '/vc/docs/sketches/img-hardware/kernel-texture.frag')
    ]
}

function setup() {
  background(190, 255, 255);
  createCanvas(w, h, WEBGL);
  shader(imgShader[0]);
}

function draw() {
  beginShape();
  vertex(-w/2, -h/2, 0, 0);
  vertex( w/2, -h/2, 1, 0);
  vertex( w/2,  h/2, 1, 1);
  vertex(-w/2,  h/2, 0, 1);
  endShape(CLOSE);
  imgShader[0].setUniform('texture', vid);
  imgShader[0].setUniform('texOff', [1/vid.width, 1/vid.height]);
  imgShader[0].setUniform('mask', mask[n % mask.length]);

}

function mousePressed() {
  vid.loop(); 
}

function keyTyped() {
  if (key === 'n') {
    n+=1
  }
}