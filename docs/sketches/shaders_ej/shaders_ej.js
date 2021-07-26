let img, myShader;
let width = 960;
let height = 640;

function preload(){
    img = loadImage('/vc/docs/sketches/monte-fuji.jpg')
    myShader = loadShader('/vc/docs/sketches/shaders_ej/shader.vert', '/vc/docs/sketches/shaders_ej/shader.frag');
}

function setup(){
    createCanvas(width,height, WEBGL);
    shader(myShader);
    perspective(PI/3, width/height, 0.1, 500);
    ortho(-width/2,width/2,height/2,-height/2);
}

function draw(){
    orbitControl();
    createEasyCam();
    beginShape();
        vertex(-width/4, -height/4, 0, 0);
        vertex(width/4, -height/4, 1, 0);
        vertex(width/4, height/4, 1, 1);
        vertex(-width/4, height/4, 0, 1);
    endShape();
    myShader.setUniform('texture', img);
}