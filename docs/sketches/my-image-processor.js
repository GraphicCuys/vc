let baseImg;
const width = 400;
const height = 300;


function preload(){
    baseImg = loadImage("/vc/docs/sketches/monte-fuji.jpg","");
}

function setup(){
    createCanvas(800,600);
    image(baseImg, 0, 0, width, height);
    toNegative(baseImg, 0, 300);
    toGray(baseImg, 400, 0);
    betterToGray(baseImg, 400, 300);
}

/*Set the inverted colors for an image*/
function toNegative(img, posx, posy){

    let newImage = createImage(img.width, img.height); 
    img.loadPixels();
    
    newImage.loadPixels();

    for (let i = 0; i < 4 * img.width * img.height; i += 4) {
        newImage.pixels[i] = 255 - img.pixels[i];
        newImage.pixels[i + 1] = 255 - img.pixels[i + 1];
        newImage.pixels[i + 2] = 255 - img.pixels[i + 2];
        newImage.pixels[i + 3] = img.pixels[i + 3];
    }
    newImage.updatePixels();
    image(newImage, posx, posy, width, height);
};

/*Set the grayscale for an image*/
function toGray(img, posx, posy){

    let newImage = createImage(img.width, img.height); 
    img.loadPixels();

    newImage.loadPixels();
    let grayColor;
    for (let i = 0; i < 4 * img.width * img.height; i += 4) {
        //With the same weight for red, green and blue colors, get the mean of them and set the gray value
        grayColor = (img.pixels[i] + img.pixels[i + 1] + img.pixels[i + 2])/3;
        newImage.pixels[i] = grayColor;
        newImage.pixels[i + 1] = grayColor;
        newImage.pixels[i + 2] = grayColor;
        newImage.pixels[i + 3] = img.pixels[i + 3];

    }
    newImage.updatePixels();
    image(newImage, posx, posy, width, height);
};

/*Set the grayscale for an image with different weight*/
function betterToGray(img, posx, posy){

    let newImage = createImage(img.width, img.height); 
    img.loadPixels();

    newImage.loadPixels();
    let grayColor;
    for (let i = 0; i < 4 * img.width * img.height; i += 4) {
        //With different weight for red, green and blue
        grayColor = (img.pixels[i]*0.3 + img.pixels[i + 1]*0.59 + img.pixels[i + 2]*0.11);
        newImage.pixels[i] = grayColor;
        newImage.pixels[i + 1] = grayColor;
        newImage.pixels[i + 2] = grayColor;
        newImage.pixels[i + 3] = img.pixels[i + 3];
    }
    newImage.updatePixels();
    image(newImage, posx, posy, width, height);
};
