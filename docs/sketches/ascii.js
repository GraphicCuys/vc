let img;
let height = 200;
let width = 200;

function preload() {
    // load assets 
    img = loadImage('/vc/docs/sketches/black.png');
}

function setup() {
    // Create a canvas that's at least the size of the image.
    createCanvas(1000, 1000);
    reSize(img, 130)
    effectGray(img, "gray")
    image(img, 0, 0);
    console.log(img)
    toAscii(img, 150, 0)
}
const grayRamp =
    "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/|()1{}[]?-_+~<>i!lI;:,\"^`'. ";
const rampLength = grayRamp.length;
const getCharacterForGrayScale = grayScale =>
    grayRamp[Math.ceil(((rampLength - 1) * grayScale) / 255)];

const littlegray = " .:-=+*#%@";
ASCII_CHARS = ["@", "%", "#", "*", "+", "=", "-", " : ", " . ", " , ", " "]
const littlerampLength = littlegray.length;
const othergetCharacter = grayScale => {
    return ASCII_CHARS[Math.floor(grayScale / 26)];
}

function toAscii(img, x, y) {
    strToPrint = ""
    img.loadPixels();
    arrcols = []
    console.log(img.width, img.height)
    for (let i = 0; i < img.height; i++) {
        for (let j = 0; j < img.width; j++) {
            // colors of the pixel
            colors = img.get(j, i);
            arrcols.push(colors[0])
            // strToPrint +=othergetCharacter(colors[0])
        }
        // textSize(5)
        // // strp = ""
        // // for(let i = 0;i<77;i++){
        // //     strp += strToPrint.slice(100*i,(100*i)+100)
        // //     strp+="\n";
        // //     if(i==1)
        // //         console.log(strp.length)
        // // }
        // // console.log(strp.length)
        // text(strToPrint, x, y);
    }
    console.log(arrcols.length)
    drawAscii(arrcols, img.width,x,y)
}
const drawAscii = (grayScales, width,x,y) => {
    const ascii = grayScales.reduce((asciiImage, grayScale, index) => {
        let nextChars = getCharacterForGrayScale(grayScale);

        if ((index + 1) % width === 0) {
            nextChars += "\n";
        }

        return asciiImage + nextChars;
    }, "");

    strToPrint = ascii;
    textSize(5)
    textFont("Courier")
    text(strToPrint, x, y);
};
function reSize(img, new_width) {
    img_height = img.height
    img_width = img.width
    new_height = new_width * img_height / img_width
    return img.resize(new_width, new_height)
}
function gray(colors) {
    // alternative model to more smooth gray scale
    let c = (0.3 * colors[0]) + (0.59 * colors[1]) + (0.11 * colors[2])
    return c
}
function effectGray(img) {
    img.loadPixels();
    for (let i = 0; i < img.width; i++) {
        for (let j = 0; j < img.height; j++) {
            colors = img.get(i, j);
            img.set(i, j, gray(colors));
        }
    }
    img.updatePixels();
}