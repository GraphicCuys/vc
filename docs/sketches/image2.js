
// Variables
let url;
let img1, img2, img3, img4, img5;
let size;

// Carga archivos inicial
function preload() {
  // Cargar imagen
  url = '/vc/docs/sketches/mario.jpg';
  img1 = loadImage(url);
  img2 = loadImage(url);
  img3 = loadImage(url);
  img4 = loadImage(url);
  img5 = loadImage(url);
  size = 100;
}

// Configuración inicial
function setup(){
  // Crer canvas
  createCanvas(size, size * 5);
  // Imagen original
  image(img1, 0, 0, size, size);
  // Imagen en escala de grises
  image(grayScale(img2), 0, size, size, size);
  // Imagen en escala de grises estandar
  image(optimalGrayScale(img3), 0, size * 2, size, size);
  // Imagen en negativo
  image(negative(img4), 0, size * 3, size, size);
  // Imagen con trabformación kernel
  image(kernel(img5, [[1, 2, 3], [1, 2, 3], [1, 2, 3]]), 0, size * 4, size, size);
}

// Escala de grises
function grayScale(img) {
  // Cargar pixeles de la imagen
  img.loadPixels();
  // Transformar pixeles
  for (let i = 0; i < img.width; i++) {
    for (let j = 0; j < img.height; j++) {
      colors = img.get(i,j);  
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
      colors = img.get(i,j);  
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
      colors = img.get(i,j);  
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
  for (let i = 0; i < img.width - matrix.length; i++) {
    for (let j = 0; j < img.height - matrix[0].length; j++) {
      for (let k = 0; k < matrix.length; k++) {
        for (let l = 0; l < matrix[0].length; l++) {
          colors = img.get(i, j);
          colors[0] = (255 - colors[0]);
          colors[1] = (255 - colors[1]);
          colors[2] = (255 - colors[2]);
          img.set(i, j, colors);
        }
      }
    }
  }
  // Actualizar pixeles de la imagen
  img.updatePixels();
  //Retornar imagen
  return img;
}