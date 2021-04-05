
var cont = 0;

function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);
}

function draw() {
  background(200);
  noStroke();
  translate(width / 2, height / 2);
  
  // Don’t look at this line
  rotate(frameCount / 50);
  
  for (let i = 0; i < 12; ++i) {
    push();
    rotate(360 / 12 * i);
    translate(width / 3, 0);
    
    if (i != cont) {
      fill(253, 173, 249);
    } else {
      fill(200);
    }
    
    ellipse(0, 0, 50, 50);
    pop();
  }  
  filter(BLUR, 5);
  fill(0);
  textSize(25);
  text('+', -10, 10);

  cont = (cont + 1) % 12;
}