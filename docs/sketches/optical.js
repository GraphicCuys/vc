const height = 500;
const width = 800;

function setup(){
    createCanvas(width,height);
    noStroke();
    noLoop();
}

function draw(){
    drawIlusion(100, 250, 580, 250);
}

function drawIlusion(posx1, posy1, posx2, posy2){

    fill(255,150,0);
    circle(posx1, posy1, 75);
    circle(posx2, posy2, 75);

    fill(0,100,255);

    let circlesM = 8;

    for(let i = 0; i < circlesM; i++){
        circle(posx1 + sin(TWO_PI/circlesM * i)*65, posy1 + cos(TWO_PI/circlesM * i)*65, 40);
    }

    let circlesN = 6;

    for(let i = 0; i < circlesN; i++){
        circle(posx2 + sin(TWO_PI/circlesN * i)*160, posy2 + cos(TWO_PI/circlesN * i)*160, 150);
    }

}