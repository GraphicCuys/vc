let img, my_shader;
let width = 480;
let height = 320;
let resolution = 100.0;
let symbol = []; 

let symbol_links = [
    "/vc/docs/sketches/img-hardware/ASCII/assets/symbol1.png",
    "/vc/docs/sketches/img-hardware/ASCII/assets/symbol2.png",
    "/vc/docs/sketches/img-hardware/ASCII/assets/symbol3.png",
    "/vc/docs/sketches/img-hardware/ASCII/assets/symbol4.png",
    "/vc/docs/sketches/img-hardware/ASCII/assets/symbol5.png",
    "/vc/docs/sketches/img-hardware/ASCII/assets/symbol6.png",
    "/vc/docs/sketches/img-hardware/ASCII/assets/symbol7.png",
    "/vc/docs/sketches/img-hardware/ASCII/assets/symbol8.png",
    "/vc/docs/sketches/img-hardware/ASCII/assets/symbol9.png",
    "/vc/docs/sketches/img-hardware/ASCII/assets/symbol10.png"
]  

function preload(){
    img = loadImage('/vc/docs/sketches/monte-fuji.jpg');
    my_shader = loadShader('/vc/docs/sketches/img-hardware/shader.vert','/vc/docs/sketches/img-hardware/ASCII/ascii.frag');

    for(let i = 0; i < 10; i++){
        symbol[i]= loadImage(symbol_links[i]);
    }
}

function setup(){
    createCanvas(width, height, WEBGL); 
    textureMode(NORMAL);
    noStroke();
    shader(my_shader);
    
    my_shader.setUniform('base_img', img);

    // Set symbol image 
    for(let i = 1; i < Object.keys(symbol).length; i++){
        my_shader.setUniform('symbol_'+i, symbol[i]);
    }
    my_shader.setUniform('resolution', resolution);
}

function draw(){

    let side = width/2;

    background(255);

    beginShape();
        vertex(-side, -side, 0, 0, 0);
        vertex(side, -side, 0, 1, 0);
        vertex(side, side, 0, 1, 1);
        vertex(-side, side, 0, 0, 1);
    endShape();

}