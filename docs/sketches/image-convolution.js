let baseImg;
const width = 400;
const height = 300;

const kernel = [[0,0,0],
    [0,1,0],
    [0,0,0]];

const kernel2 = [ [ -1, -1, -1 ],
[ -1,  8, -1 ],
[ -1, -1, -1 ] ]; 

const kernel3 = [[1/9,1/9,1/9],
    [1/9,1/9,1/9],
    [1/9,1/9,1/9]];

const kernel4 = [[0,-1,0],
    [-1,5,-1],
    [0,-1,0]];

function preload(){
    baseImg = loadImage("/vc/docs/sketches/monte-fuji.jpg","");
}

function setup(){
    createCanvas(800,600);
    image(baseImg, 0, 0, width, height);
    imageConvolution(baseImg, kernel2, 0, 300);
    imageConvolution(baseImg, kernel3, 400, 0);
    imageConvolution(baseImg, kernel4, 400, 300);
}

/*Image convolution with a matrix*/

function imageConvolution(img, kernel, posx, posy){

    let newImage = createImage(img.width, img.height); 
    img.loadPixels();

    newImage.loadPixels();

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
            newImage.pixels[(i+j*imgWidth)*4] = constrain(sumR,0,255);
            newImage.pixels[(i+j*imgWidth)*4 + 1] = constrain(sumG,0,255);
            newImage.pixels[(i+j*imgWidth)*4 + 2] = constrain(sumB,0,255);
            newImage.pixels[(i+j*imgWidth)*4 + 3] = 255;
        }
    }

    newImage.updatePixels();
    image(newImage, posx, posy, width, height);
}