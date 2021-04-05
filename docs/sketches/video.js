let vid;
let vidw = 160;
let vidh = 224;
let n = 0
function setup() {
  createCanvas(280, 300);
  // specify multiple formats for different browsers
  vid = createVideo("/vc/docs/sketches/pacman.mp4");
// vid.loop();
  vid.hide();
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
  eff = ["original","negative","gray-average","luma"]
  names = ["Original","Negative","Gray-average","Luma"]
  drawmultiple(0,0,eff[n%eff.length],vid)
  fill(0)
  textSize(18)
  text(names[n%eff.length],170,60)
  // drawmultiple(170,0,"gray",vid1)
}

function drawmultiple(xp,yp,filter,vid){
  background(255);
  vid.loadPixels();
  for (var y = 0; y < vidh; y += 1) {
    for (var x = 0; x < vidw; x += 1) {
      var offset = ((y*vidw)+x)*4;
      if(filter=="original"){
        fill([vid.pixels[offset],
          vid.pixels[offset+1],
          vid.pixels[offset+2]]);
      }
      else if(filter == "negative"){
        fill(negative([vid.pixels[offset],
          vid.pixels[offset+1],
          vid.pixels[offset+2]]));
      }else if(filter = "luma"){
        fill(gray([vid.pixels[offset],
          vid.pixels[offset+1],
          vid.pixels[offset+2]]));
      }else{
        fill(grayaverage([vid.pixels[offset],
          vid.pixels[offset+1],
          vid.pixels[offset+2]]));
      }
      rect(x+xp, y+yp, 1, 1); 
    }
  }
}
function mousePressed() {
    vid.loop(); // set the video to loop and start playing
}
function keyTyped() {
  if (key === 'n') {
    n+=1
  }
  // uncomment to prevent any default behavior
  // return false;
}