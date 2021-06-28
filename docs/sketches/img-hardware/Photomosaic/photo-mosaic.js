let img, my_shader;
let width = 480;
let height = 320;
var images = [];

let links = [
    "https://i.picsum.photos/id/315/200/300.jpg?hmac=C67WPcnxkaV_SPowHi-8nl3yoODZSBZqnoOdBObP5Ys",
    "https://i.picsum.photos/id/349/200/300.jpg?hmac=gEjHZbjuKtdD2GOM-qQtuaA95TCvDUs6iVvKraQ94nU",
    "https://i.picsum.photos/id/436/200/300.jpg?hmac=OuJRsPTZRaNZhIyVFbzDkMYMyORVpV86q5M8igEfM3Y",
    "https://i.picsum.photos/id/260/200/300.jpg?hmac=_VpBxDn0zencTyMnssCV14LkW80zG7vw2rw7WCQ2uVo",
    "https://i.picsum.photos/id/54/200/300.jpg?hmac=Vj23spqBn9b_PrCh4LPiDrcffi6svfFFmjWMfycPVRE",
    "https://i.picsum.photos/id/483/200/300.jpg?hmac=D_dBiQY-_Hb5jICLp91Jagw6tJ3CeHNGJOkAJznIfCw",
    "https://i.picsum.photos/id/476/200/300.jpg?hmac=_vE--dw3keZ1r73AbtN9I362ItgpZJkRbRrJsB688Kw",
    "https://i.picsum.photos/id/1045/200/300.jpg?hmac=Y71-83LHDOPyoD5nAk5iDk1IJKvlnjBznGezsMIZyJ8",
    "https://i.picsum.photos/id/397/200/300.jpg?hmac=9VBInLrifj_yyc2JuJSAVIfj9yQdt5Ovm2sHmvva-48",
    "https://i.picsum.photos/id/639/200/300.jpg?hmac=dITw9zyqi0A4tZ6lMk191HJezQPJDDKG4wyJXadYRH0",
    "https://i.picsum.photos/id/533/200/300.jpg?hmac=eehg5zb3wyJViBC8IiDL85fqqk9z85uHtRciYvDovgA",
    "https://i.picsum.photos/id/6/200/300.jpg?hmac=a4Gfsl7hyAvOnmQtzoEkQmbiLJFl7otISIdoYQWqJCo",
    "https://i.picsum.photos/id/546/200/300.jpg?hmac=WRVm_tMObPuM2HqJCr5D6N59Mboh73aqEno4MCuu5AE",
    "https://i.picsum.photos/id/791/200/300.jpg?hmac=Ah_2kp5UqnZv5O0c333s3M4p-FqkCZ6ViRd1V_pAHYk",
    "https://i.picsum.photos/id/444/200/300.jpg?hmac=xTzo_bbWzDyYSD5pNCUYw552_qtHzg0tQUKn50R6FOM",
    "https://i.picsum.photos/id/1026/200/300.jpg?hmac=Thvj4aJ_VnAGT6DKAcy1yTs100zlstJTyImDWphGDFI",
    "https://i.picsum.photos/id/691/200/300.jpg?hmac=1nouilaOHm3p-SqXPrCLcCcFEtJ60GlDAwkLAHq4x-c",
    "https://i.picsum.photos/id/279/200/300.jpg?hmac=fYDbVmnm7vDGt7SA51v-qMUKHIn7HKCp5v9d8Wx_SVM",
    "https://i.picsum.photos/id/1039/200/300.jpg?hmac=6ltGhc0bwc07wl0cbQxDwnJd-vpqJcHZLTO8xm-M15o",
    "https://i.picsum.photos/id/361/200/300.jpg?hmac=unS_7uvpA3Q-hJTvI1xNCnlhta-oC6XnWZ4Y11UpjAo",
    "https://i.picsum.photos/id/338/200/300.jpg?hmac=rE5P3WDLKY1VMpd9y_FLo_OKhTzG4_3zCbGjKvgOL5w",
    "https://i.picsum.photos/id/727/200/300.jpg?hmac=YAlAwltwjf1ivXTPLvMU4JLzPsOLmXi9_O1aoYF7hcg",
    "https://i.picsum.photos/id/496/200/300.jpg?hmac=demLRv0UMwDhQHH6AEmbkJqlYuX27lnRH5N9FYcHBgw",
    "https://i.picsum.photos/id/657/200/300.jpg?hmac=EHK6W3Q_p0WAYArHzSre54j6vS3QLdqcMKvty45Bo40",
    "https://i.picsum.photos/id/893/200/300.jpg?hmac=7jsxm2l6ji-5CBnfrJO7IqDUekLtP4PvA7taLcRW2NI",
    "https://i.picsum.photos/id/908/200/300.jpg?hmac=guEHon4cM5wVkD_yaCyg37gD09iEjrpqzKfo-YU-Iwc",
    "https://i.picsum.photos/id/1069/200/300.jpg?hmac=z7ef02jy_-2I0_UTVob-AN6AWxP7-4bTJmZZnnLKMgk",
    "https://i.picsum.photos/id/236/200/300.jpg?hmac=k9j4rU4XMUV_jh877uh_7LxlkJ5B9vEl1fA6lj3ynuE",
    "https://i.picsum.photos/id/785/200/300.jpg?hmac=qs0LQ_CpnnXSsfMqlW0lnJPhNXYfXJ0BGoELuQxnHME",
    "https://i.picsum.photos/id/883/200/300.jpg?hmac=L62LMsIBfvhnxlTirzshbyv6HarwJvd-tSSBcIvbCVw",
    "https://i.picsum.photos/id/433/200/300.jpg?hmac=Y75_deyseM49Q8smDAbeRflgTmOchUngpd-QeDllW0g",
    "https://i.picsum.photos/id/215/200/300.jpg?hmac=Nt1epjkKo-29FLbrKGINDjceT_uNiqOG_pah7r52Wss",
    "https://i.picsum.photos/id/853/200/300.jpg?hmac=-vUTO-GMdNHJbNIJrZtC4jsw0ybpHVgCrtWkg1DZugg",
    "https://i.picsum.photos/id/399/200/300.jpg?hmac=qEzeLaSETRM-rnt81YtrfXeUeHQnjAkbWh7rc8NBaMQ",
    "https://i.picsum.photos/id/1054/200/300.jpg?hmac=2AMkQJkHozCbGVYoPJsFwSYmOfmPcPMYd0RtXMm-I2A",
    "https://i.picsum.photos/id/292/200/300.jpg?hmac=zm-TXplXe70N7LGm2HWu9iOPXoBtQvwyhAF2CSj0ccs",
    "https://i.picsum.photos/id/90/200/300.jpg?hmac=yKaRyhG3EFez3DuYnuPdh29pSCXLc8DDXROYdKQQp30",
    "https://i.picsum.photos/id/685/200/300.jpg?hmac=0R7Bu0AY8CbakSrvbQHtFb_swiFQbJqQe7bKpbV6viA",
    "https://i.picsum.photos/id/787/200/300.jpg?hmac=XItcL1ki66gQzP2FwRZjLbruiohUmaOYs9mmlDZe9KE",
    "https://i.picsum.photos/id/39/200/300.jpg?hmac=CcUiRU6-82MldMqtiF9shpKCbwzwkILEWuRi90JsADs"
]  

function preload(){
    img = loadImage('/vc/docs/sketches/monte-fuji.jpg');
    my_shader = loadShader('/vc/docs/sketches/img-hardware/Photomosaic/photo-mosaic.vert','/vc/docs/sketches/img-hardware/Photomosaic/photo-mosaic.frag');

    for(let i=0;i<10;i++){
        images[i] = loadImage(links[i]);
    }
    console.log(img);
    console.log(images);
}

function setup(){
    createCanvas(width, height, WEBGL); 
    textureMode(NORMAL);
    noStroke();
    shader(my_shader);
    
    my_shader.setUniform('base_img', img);
    my_shader.setUniform('images', [images[0]]);
    my_shader.setUniform('resolution', 50.0);
}

function draw(){

    background(255);

    let side = width/2

    beginShape();
        vertex(-side, -side, 0, 0, 0);
        vertex(side, -side, 0, 1, 0);
        vertex(side, side, 0, 1, 1);
        vertex(-side, side, 0, 0, 1);
    endShape();

    orbitControl();
}