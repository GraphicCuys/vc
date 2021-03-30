
// Variables
let url;
let img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12, img13;
let size;

// Carga archivos inicial
function preload() {
  // Cargar imagen
  url = '/vc/docs/sketches/animal.jpg';
  img1 = loadImage(url);
  img2 = loadImage(url);
  img3 = loadImage(url);
  img4 = loadImage(url);
  img5 = loadImage(url);
  img6 = loadImage(url);
  img7 = loadImage(url);
  img8 = loadImage(url);
  img9 = loadImage(url);
  img10 = loadImage(url);
  img11 = loadImage(url);
  img12 = loadImage(url);
  img13 = loadImage(url);
  size = 100;
}

// Configuración inicial
function setup(){
  // Crer canvas
  createCanvas(size * 3, size * 5);
  // Imagen original
  image(img1, 0, 0, size, size);
  // Imagen en escala de grises
  image(grayScale(img2), 0, size, size, size);
  // Imagen en escala de grises estandar
  image(optimalGrayScale(img3), 0, size * 2, size, size);
  // Imagen en negativo
  image(negative(img4), 0, size * 3, size, size);
  // Imagen con transformación identidad
  image(kernel(img5, [[0, 0, 0], [0, 1, 0], [0, 0, 0]]), 0, size * 4, size, size);
  // Imagen con transformación de bordes 1
  image(kernel(img6, [[1, 0, -1], [0, 0, 0], [-1, 0, 1]]), size, 0, size , size);
  // Imagen con transformación de bordes 2
  image(kernel(img7, [[0, -1, 0], [-1, 4, -1], [0, -1, 0]]), size, size, size, size);
  // Imagen con transformación de bordes 30
  image(kernel(img8, [[-1, -1, -1], [-1, 8, -1], [-1, -1, -1]]), size, size * 2, size, size);
  // Imagen con transformación Sharpen	
  image(kernel(img9, [[0, -1, 0], [-1, 5, -1], [0, -1, 0]]), size,size * 3, size, size);
  // Imagen con transformación Box blur
  image(kernel(img10, [[1/9.0, 1/9.0, 1/9.0], [1/9.0, 1/9.0, 1/9.0], [1/9.0, 1/9.0, 1/9.0]]), size, size * 4, size, size);
  // Imagen con transformación Gaussian blur 3 × 3
  image(kernel(img11, [[1/16.0, 2/16.0, 1/16.0], [2/16.0, 4/16.0, 2/16.0], [1/16.0, 2/16.0, 1/16.0]]), size * 2, 0, size, size);
  // Imagen con transformación Gaussian blur 5 × 5
  image(kernel(img12, [[1/256.0, 4/256.0, 6/256.0, 4/256.0, 1/256.0], [4/256.0, 16/256.0, 24/256.0, 16/256.0, 4/256.0], [6/256.0, 24/256.0, 36/256.0, 24/256.0, 6/256.0], [4/256.0, 16/256.0, 24/256.0, 16/256.0, 4/256.0], [1/256.0, 4/256.0, 6/256.0, 4/256.0, 1/256.0]]), size * 2, size, size, size);
  // Imagen con transformación kernel Unsharp masking 5 × 5
  image(kernel(img13, [[-1/256.0, -4/256.0, -6/256.0, -4/256.0, -1/256.0], [-4/256.0, -16/256.0, -24/256.0, -16/256.0, -4/256.0], [-6/256.0, -24/256.0, 476/256.0, -24/256.0, -6/256.0], [-4/256.0, -16/256.0, -24/256.0, -16/256.0, -4/256.0], [-1/256.0, -4/256.0, -6/256.0, -4/256.0, -1/256.0]]), size * 2, size * 2, size, size);
}

// Escala de grises
function grayScale(img) {
  // Cargar pixeles de la imagen
  img.loadPixels();
  // Transformar pixeles
  for (let i = 0; i < img.width; i++) {
    for (let j = 0; j < img.height; j++) {
      let colors = img.get(i,j);  
      let grayColor = (colors[0] + colors[1] + colors[2]) / 3;
      colors[0] = grayColor;
      colors[1] = grayColor;
      colors[2] = grayColor;
      img.set(i, j, colors);
    }
  }
  // Actualizar pixeles de la imagen
  img.updatePixels();
  //Retornar imagen
  return img;
}

// Escala de grises
function optimalGrayScale(img) {
  // Cargar pixeles de la imagen
  img.loadPixels();
  // Transformar pixeles
  for (let i = 0; i < img.width; i++) {
    for (let j = 0; j < img.height; j++) {
      let colors = img.get(i,j);  
      colors = 0.299 * colors[0] + 0.587 * colors[1] + 0.114 * colors[2];
      img.set(i, j, colors);
    }
  }
  // Actualizar pixeles de la imagen
  img.updatePixels();
  //Retornar imagen
  return img;
}

// Negativo
function negative(img) {
  // Cargar pixeles de la imagen
  img.loadPixels();
  // Transformar pixeles
  for (let i = 0; i < img.width; i++) {
    for (let j = 0; j < img.height; j++) {
      let colors = img.get(i,j);  
      colors[0] = (255 - colors[0]);
      colors[1] = (255 - colors[1]);
      colors[2] = (255 - colors[2]);
      img.set(i, j, colors);
    }
  }
  // Actualizar pixeles de la imagen
  img.updatePixels();
  //Retornar imagen
  return img;
}

// Tranformación con kernel
function kernel (img, matrix) {
  // Cargar pixeles de la imagen
  img.loadPixels();
  // Transformar pixeles
  for (let i = 0; i < img.width; i++) {
    for (let j = 0; j < img.height; j++) {
      let colors = img.get(i, j);
      let acum = [0, 0, 0];
      for (let k = 0; k < matrix[0].length; k++) {
        for (let l = 0; l < matrix.length; l++) {
          let kernelValue = matrix[matrix.length-1-l][matrix[0].length-1-k];
          let colors2 = img.get((i + k - (((matrix[0].length + 1) / 2) - 1)) % img.width, (j + l - (((matrix.length + 1) / 2) - 1)) % img.height);
          acum[0] += colors2[0] * kernelValue;
          acum[1] += colors2[1] * kernelValue;
          acum[2] += colors2[2] * kernelValue;
        }
      }
      colors[0] = acum[0];
      colors[1] = acum[1];
      colors[2] = acum[2];
      img.set(i, j, colors);
    }
  }
  // Actualizar pixeles de la imagen
  img.updatePixels();
  //Retornar imagen
  return img;
}