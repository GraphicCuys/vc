var myp5 = new p5((p) => {
	let img;
  
	p.setup = function () {
		img = createImage("https://revistamvz.unicordoba.edu.co/public/journals/1/article_1384_cover_es_ES.jpg");
		p.createCanvas(img.width, img.height);
	}

	p.draw = function () {
		image(img, 0, 0);
	}

}, "colors");