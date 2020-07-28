let song;
let toggle, tropical, upbeat;
let bands16, bands64, bands256, bands1024;
let fft;
let numBands = 64; //must be power of 2 >= 16
let w;
let smoothing = 0.9;
let offset = 50; //start point of visualizer
let buffer = 50; //space from top of canvas
let loadSong = 1;

function preload() {
  song1 = loadSound('sounds/upbeat.mp3');
  song2 = loadSound('sounds/tropical.mp3');

  song = song1;

}

function setup() {
  createCanvas(512, 512);

  toggle = createButton('Play/Pause');
  toggle.position(50, height - 90);
  toggle.mousePressed(toggleSong);

  tropical = createButton('Load Tropical');
  tropical.position(40, height - 60);
  tropical.mousePressed(playTropical);

  upbeat = createButton('Load Upbeat');
  upbeat.position(40, height - 30);
  upbeat.mousePressed(playUpbeat);

  bands16 = createButton('16 Bands');
  bands16.position(200, height - 75);
  bands16.mousePressed(setBands16);

  bands64 = createButton('64 Bands');
  bands64.position(200, height - 50);
  bands64.mousePressed(setBands64);

  bands256 = createButton('256 Bands');
  bands256.position(300, height - 75);
  bands256.mousePressed(setBands256);

  bands1024 = createButton('1024 Bands');
  bands1024.position(300, height - 50);
  bands1024.mousePressed(setBands1024);

  fft = new p5.FFT(smoothing, numBands);
  w = width / numBands;
}

function draw() {
  background(0);
  let spectrum = fft.analyze();
  stroke(255);
  noFill();
  //console.log(spectrum);

  for (i = 0; i < spectrum.length; i++) {
    let amp = spectrum[i];
    let y = map(amp, 0, 255, height - offset, offset + buffer);
    rect(i * w, y - offset, w, height - y - offset, w);
  }

}

function toggleSong() {
  if (song.isPlaying()) {
    song.pause();
  } else song.play();
}

function playTropical() {
  if (song.isPlaying()) {
    song.stop();
  }
  song = song2;
}

function playUpbeat() {
  if (song.isPlaying()) {
    song.stop();
  }
  song = song1;
}


function setBands16() {
  numBands = 16;
  fft = new p5.FFT(smoothing, numBands);
  w = width / numBands;
}

function setBands64() {
  numBands = 64;
  fft = new p5.FFT(smoothing, numBands);
  w = width / numBands;
}

function setBands256() {
  numBands = 256;
  fft = new p5.FFT(smoothing, numBands);
  w = width / numBands;
}

function setBands1024() {
  numBands = 1024;
  fft = new p5.FFT(smoothing, numBands);
  w = width / numBands;
}