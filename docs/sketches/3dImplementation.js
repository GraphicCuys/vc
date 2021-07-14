const w = 500;
const h = 400;
const angle;
var img;


function preload(){
    img = loadImage('/vc/docs/sketches/45634.png')  
}


function setup() {
  	background(190, 255, 255);
  	createCanvas(w, h, WEBGL); 
  	angle = 0; 
}

function draw() {
	pointLight(255,255,255, 25, -50, 250)
  	noStroke()
  	//ambientLight(255)
  	background(150, 150, 150);
  	//ambientMaterial(255,0,0)
  	//specularMaterial(200,200,200)
  	texture(img);
  	rotateY(angle)
  	sphere(100);
  	angle += 0.02

}