let img;
let height =200;
let width = 200;
function preload() {
  // load the image
  // is not necessary bring the image more than once
  img = loadImage('/vc/docs/sketches/leaf.jpg');
}

function setup(){
  // Create a canvas that's at least the size of the image.
  createCanvas(512, 512);
  // draw the original imaga
  image(img, 0, 0,height,width);
  // apply negative effect
  effect(img,"negative",250,0)
  // apply grayscale effect
  effect(img,"gray",0,250)
  
}
// get the negative colors function
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
// apply the effect and draw the image
function effect(img,type,x,y){
  img.loadPixels();
  for (let i = 0; i < img.width; i++) {
    for (let j = 0; j < img.height; j++) {
      colors = img.get(i,j);      
      if(type =="negative") {
        img.set(i, j,negative(colors));
      }else{
        img.set(i, j,gray(colors));
      }
    }
  }
  img.updatePixels();
  image(img, x, y,height,width);
}
