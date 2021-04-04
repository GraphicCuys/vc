
// Variables
let url;
let vid1, vid2, vid3, vid4, vid5, vid6, vid7, vid8, vid9, vid10, vid11, vid12, vid13;
let size;

// Carga archivos inicial
function preload() {
  // Cargar imagen
  url = '/vc/docs/sketches/pacman.mp4';
  vid1 = createVideo(url);
  console.log("Video: ");
  console.log(vid1);
  /*vid2 = createVideo(url);
  vid2.hide();
  vid3 = createVideo(url);
  vid3.hide();
  vid4 = createVideo(url);
  vid4.hide();
  vid5 = createVideo(url);
  vid5.hide();
  vid6 = createVideo(url);
  vid6.hide();
  vid7 = createVideo(url);
  vid7.hide();
  vid8 = createVideo(url);
  vid8.hide();
  vid9 = createVideo(url);
  vid9.hide();
  vid10 = createVideo(url);
  vid10.hide();
  vid11 = createVideo(url);
  vid11.hide();
  vid12 = createVideo(url);
  vid12.hide();
  vid13 = createVideo(url);
  vid13.hide();*/
  size = 100;
}

// Configuración inicial
function setup(){
  // Crer canvas
  createCanvas(size * 3, size * 5);
  // Imagen original
  /*image(img1, 0, 0, size, size);
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
  */

  vid1.loop();
  noStroke();
  noFill();
  //image(grayScale(vid1), 100, 100);
  /*vid2.loop();
  vid3.loop();
  vid4.loop();
  vid5.loop();
  vid6.loop();
  vid7.loop();
  vid8.loop();
  vid9.loop();
  vid10.loop();
  vid11.loop();
  vid12.loop();
  vid13.loop();*/
}

function draw() {
    image(vid1, 10, 10); // dibuja el cuadro del video en el lienzo.
    filter(GRAY);
    image(vid1, 150, 150); // dibuja una segunda copia en el lienzo.
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