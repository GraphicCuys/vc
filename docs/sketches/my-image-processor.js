let baseImg;
const width = 400;
const height = 300;

/*
const kernel = [ [ -1, -1, -1 ],
[ -1,  9, -1 ],
[ -1, -1, -1 ] ]; 
*/
/*
const kernel = [[0,0,0],
    [0,1,0],
    [0,0,0]];
*/

const kernel = [[1/9,1/9,1/9],
    [1/9,1/9,1/9],
    [1/9,1/9,1/9]];

/*
const kernel = [[0,-1,0],
    [-1,5,-1],
    [0,-1,0]];
*/
function preload(){
    baseImg = loadImage("/vc/docs/sketches/monte-fuji.jpg","");
}

function setup(){
    createCanvas(1200,900);
    image(baseImg, 0, 0, width, height);
    toNegative(baseImg);
    image(baseImg, 400, 0, width, height);
    toGray(baseImg);
    image(baseImg, 0, 300, width, height);
    betterToGray(baseImg);
    image(baseImg, 400, 300, width, height);
    imageConvolution(baseImg,kernel);
    image(baseImg, 0, 600, width, height);
}

/*Set the inverted colors for an image*/
function toNegative(img){
    img.loadPixels();
    for (let i = 0; i < 4 * img.width * img.height; i += 4) {
        img.pixels[i] = 255 - img.pixels[i];
        img.pixels[i + 1] = 255 - img.pixels[i + 1];
        img.pixels[i + 2] = 255 - img.pixels[i + 2];
        img.pixels[i + 3] = img.pixels[i + 3];
    }
    img.updatePixels();
};

/*Set the grayscale for an image*/
function toGray(img){
    img.loadPixels();
    let grayColor;
    for (let i = 0; i < 4 * img.width * img.height; i += 4) {
        //With the same weight for red, green and blue colors, get the mean of them and set the gray value
        grayColor = (img.pixels[i] + img.pixels[i + 1] + img.pixels[i + 2])/3;
        img.pixels[i] = grayColor;
        img.pixels[i + 1] = grayColor;
        img.pixels[i + 2] = grayColor;
        img.pixels[i + 3] = img.pixels[i + 3];
    }
    img.updatePixels();
};

/*Set the grayscale for an image with different weight*/
function betterToGray(img){
    img.loadPixels();
    let grayColor;
    for (let i = 0; i < 4 * img.width * img.height; i += 4) {
        //With different weight for red, green and blue
        grayColor = (img.pixels[i]*0.3 + img.pixels[i + 1]*0.59 + img.pixels[i + 2]*0.11)/3;
        img.pixels[i] = grayColor;
        img.pixels[i + 1] = grayColor;
        img.pixels[i + 2] = grayColor;
        img.pixels[i + 3] = img.pixels[i + 3];
    }
    img.updatePixels();
};

function imageConvolution(img, kernel){
    
    img.loadPixels();

    const imgHeight = img.height;
    const imgWidth = img.width;

    let kernelHeight = 3;
    let kernelWidth = 3;

    var sumR;
    var sumG;
    var sumB;

    for(let j = 0; j < imgHeight; j++){
        for(let i = 0; i < imgWidth; i++){

            sumR = 0;
            sumG = 0;
            sumB = 0;

            for(let l = -1; l < kernelWidth - 1; l++){
                for(let k = -1; k < kernelWidth  - 1; k++){
                    if(0 < i+k && i+k < imgWidth && 0 < j+k && j+k < imgHeight){
                        sumR += (img.pixels[((i + k) + img.width * (j + l)) * 4]) * kernel[k+1][l+1];          
                        sumG += (img.pixels[((i + k) + img.width * (j + l)) * 4 + 1]) * kernel[k+1][l+1];                
                        sumB += (img.pixels[((i + k) + img.width * (j + l)) * 4 + 2]) * kernel[k+1][l+1];                          
                    }
                }
            }

            img.pixels[(i+j*imgWidth)*4] = constrain(sumR,0,255);
            img.pixels[(i+j*imgWidth)*4 + 1] = constrain(sumG,0,255);
            img.pixels[(i+j*imgWidth)*4 + 2] = constrain(sumB,0,255);

        }
    }
    img.updatePixels();
}