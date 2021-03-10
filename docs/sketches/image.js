let img;
let img2;
function preload() {
  img = loadImage('/vc/docs/sketches/leaf.jpg');
}

function setup(){
  // Create a canvas that's at least the size of the image.
  createCanvas(512, 512);
  image(img, 0, 0,200,200);
  effect(img,"negative",250,0)
  effect(img,"gray",0,250)
  
}
function negative(colors){
  let c = []
  c = colors.map((e,i)=>{
    r = i<3 ? 255-e : e;
    return r
  })
  return c 
}
function gray(colors){
  sum = colors.slice(0,3).reduce((a, b) => a + b, 0)
  let c = (0.3 * colors[0]) + (0.59 * colors[1]) + (0.11 * colors[2])
  return c 
}
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
  image(img, x, y,200,200);
}

function draw(){
  // let imgs = createImage(200, 200);
  
  // img.loadPixels();
  // let d = pixelDensity();
  // for (let i = 0; i < d; i++) {
  //   for (let j = 0; j < d; j++) {
  //     // loop over
  //     index = 4 * ((y * d + j) * width * d + (x * d + i));
  //     pixels[index] = 0;
  //     pixels[index+1] = 255;
  //     pixels[index+2] = 0;
  //     pixels[index+3] = 0;
  //   }
  // }
  // img.updatePixels()
}
