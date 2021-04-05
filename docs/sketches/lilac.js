let img;
let height = 500;
let width = 500;
let x=0
let y =0    

let anglem =0
function setup() {
    // Create a canvas that's at least the size of the image.
    createCanvas(500, 500);
    r = 400/2
    
}

function draw(){
    frameRate(5)
    background("#BFBFBF")
    
    let angle = 0;
    for(let i=0;i<12;i++){
        angle=angle+(Math.PI/6)
        pg = createGraphics(100,100);
        pg.background('#BFBFBF');
        pg.noStroke();
        pg.fill('#FF00FF');
        pg.circle(50,50,40)
        pg.filter(BLUR, 10);
        pg.loadPixels();
        pg.updatePixels();
        pg.filter(DILATE);
        image(pg, 200+r*Math.cos(angle),200+r*Math.sin(angle));
    }
    fill("#BFBFBF")
    noStroke()
    x =250+r*Math.cos(anglem)
    y = 250+r*Math.sin(anglem)
    circle(x,y,70);
    anglem = anglem+(Math.PI/6)
    stroke(20)
    line(240,250,260,250)
    line(250,240,250,260)
}