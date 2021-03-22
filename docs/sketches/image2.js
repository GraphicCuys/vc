
// Imagen
let img;

// Carga archivos inicial
function preload() {
  // Cargar imagen
  img = loadImage('/vc/docs/sketches/green_planet.jpg');
}

// Configuración inicial
function setup(){
  // Crer canvas
  createCanvas(512, 512);
  //Dibujar imagen
  image(img, 0, 0, 200, 200);
  
}