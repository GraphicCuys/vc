let width = 480;
let height = 320;
var img, imgShader;


function preload(){
    img = loadImage('/vc/docs/sketches/monte-fuji.jpg')  
	my_shader = loadShader('/vc/docs/sketches/img-hardware/shader.vert', '/vc/docs/sketches/img-hardware/texture.frag');
}


function setup() {
  background(255);
  createCanvas(width, 320, WEBGL);  
  shader(my_shader);
}

function draw() {
    let side = width/2;

    beginShape();
        vertex(-side, -side, 0, 0, 0);
        vertex(side, -side, 0, 1, 0);
        vertex(side, side, 0, 1, 1);
        vertex(-side, side, 0, 0, 1);
    endShape();
    my_shader.setUniform('texture', img);

}