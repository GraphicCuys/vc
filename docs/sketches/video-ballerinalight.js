let vid;
function setup() {
  noCanvas();

  vid = createVideo(
    ['/vc/docs/sketches/dancerlight.mp4'],
    vidLoad
  );

  vid.size(852, 480);
}

// This function is called when the video loads
function vidLoad() {
  vid.loop();
  vid.volume(0);
}