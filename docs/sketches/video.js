let fingers;
let fingers1;
function setup() {
  createCanvas(160, 224);
  // specify multiple formats for different browsers
  fingers = createVideo("/vc/docs/sketches/pacman.mp4");
// fingers.loop();
  fingers.hide();
  noStroke();
  fill(0);
}
function negative(colors){
    let c = []
    c = colors.map((e,i)=>{
      r = i<3 ? 255-e : e;
      return r
    })
    return c 
  }
// get the grayscale color function
function gray(colors){
    // alternative model to more smooth gray scale
    let c = (0.3 * colors[0]) + (0.59 * colors[1]) + (0.11 * colors[2])
    return c 
  }
  function grayaverage(colors){
    // alternative model to more smooth gray scale
    let c = (colors[0] + colors[1] + colors[2])/3
    return c 
  }
function draw() {
  background(255);
  fingers.loadPixels();
  for (var y = 0; y < height; y += 1) {
    for (var x = 0; x < width; x += 1) {
      var offset = ((y*width)+x)*4;
      fill(negative([fingers.pixels[offset],
        fingers.pixels[offset+1],
        fingers.pixels[offset+2]]));
      rect(x, y, 1, 1); 
    }
  }
}


function mousePressed() {
    fingers.loop(); // set the video to loop and start playing
    fingers1.loop()
}