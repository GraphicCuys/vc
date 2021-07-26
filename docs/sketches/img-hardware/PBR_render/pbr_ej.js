let img, my_shader;
let width = 480;
let height = 320;
let side = 100;

function preload(){
    img = loadImage('/vc/docs/sketches/monte-fuji.jpg');
    my_shader = loadShader('/vc/docs/sketches/img-hardware/PBR_render/pbr.vert','/vc/docs/sketches/img-hardware/PBR_render/pbr.frag');
}

function setup(){
    createCanvas(width, height, WEBGL);
    shader_texture = createGraphics(width, height, WEBGL);
    shader_texture.noStroke();
    
    
    noStroke();
    shader(my_shader);
}

function draw(){

    background(255);
    textureMode(NORMAL);

    my_shader.setUniform('texture', img);

    shader_texture.shader(my_shader);

    push();
        texture(img);
        sphere(side);
    pop();
    
    beginShape();
        vertex(-side, -side, -side/2, 0, 0);
        vertex(side, -side, -side/2, 1, 0);
        vertex(side, side, -side/2, 1, 1);
        vertex(-side, side, -side/2, 0, 1);
    endShape();

    specularMaterial(145)

    //camera(0, 0, 0, 0, 0, 0, 0, 1, 0);

    orbitControl();
}