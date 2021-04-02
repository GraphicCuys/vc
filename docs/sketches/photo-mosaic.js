let quadrille;
let tilePerRow = 200;
let baseImg;
let images; 

function preload() {
    /* Base image to do the photo mosaic */
    baseImg = loadImage('/vc/docs/sketches/monte-fuji.jpg');
    /* List of reference images to do the photo mosaic 
       colorM = Average color per image
    */
    
    images = {
        i1: {
            img : loadImage('/vc/docs/sketches/monte-fuji.jpg'),
            colorM: null
        }, 
        i2: {
            img : loadImage('/vc/docs/sketches/animal.jpg'),
            colorM: null
        }, 
        i3: {
            img : loadImage('/vc/docs/sketches/leaf.jpg'),
            colorM: null
        }, 
        i4:{
            img : loadImage('/vc/docs/sketches/mahakala.jpg'),
            colorM: null
        }, 
        i5:{
            img : loadImage('/vc/docs/sketches/mario.jpg'),
            colorM: null
        }
    }
}

function setup() {
  createCanvas(800, 1200);
  quadrille = createQuadrille(tilePerRow, baseImg);; 
  image(baseImg, 0, 600, 800, 600);
  getImagesPixelsAverage(images);

  listOfImages(quadrille, images);
  console.log(quadrille.width+"->"+quadrille.height);
}

/* Get the average color for all images and save it*/
function getImagesPixelsAverage(images){
    
    Object.keys(images).forEach(function(index) {
        images[index].colorM = colorPixelsAverage(images[index].img) 
    });
}

/* Get the mean of the pixels colors in a image*/
function colorPixelsAverage(img){

    let xpixels = img.width;
    let ypixels = img.height;

    let redM = 0;
    let greenM = 0;
    let blueM = 0;

    img.loadPixels();

    for(let i = 0; i < xpixels * ypixels * 4; i+=4){

        redM += img.pixels[i];
        greenM += img.pixels[i+1];
        blueM += img.pixels[i+2];

    }

    redM = redM / (ypixels*xpixels);
    greenM = greenM / (ypixels*xpixels);
    blueM = blueM / (ypixels*xpixels);
    
    return color(redM,greenM,blueM);
}

/* Return a list with the corresponding images for each tile*/

function listOfImages(quadrille, images){
    tilesx = quadrille.width;
    tilesy = quadrille.height;
    xpixels = 800;
    ypixels = 600;

    subImageWidth = xpixels/tilesx;
    subImageHeight = ypixels/tilesy;

    let imagesList = [];
    for(let j = 0; j < tilesy; j++){
        for(let i = 0; i < tilesx; i++){
            imagesList.push(bestAproximation(quadrille.read(j,i), images));
            image(bestAproximation(quadrille.read(j,i), images),
                                i*subImageWidth,j*subImageHeight,
                                subImageWidth,subImageHeight);
        }
    }
    return imagesList;
}

/* Calculate the distance on colors and return the image with the best distance */

function bestAproximation(colorTile,images){

    let bestDistance = 765;
    let colorImage, distance, bestImageIndex; 
    Object.keys(images).forEach(function(index) {
        colorImage = images[index].colorM; ;

        distance = dist(colorTile[0], colorTile[1], colorTile[2], 
            red(colorImage),green(colorImage),blue(colorImage));

        if(distance < bestDistance){
            bestDistance = distance;
            bestImageIndex = index;
        }
        
    });

    return images[bestImageIndex].img;
}