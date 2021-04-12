// Interface elements
let canvas;

let detector;
let video;
let detections = [];

function preload() {
  video = createCapture(VIDEO);
  detector = ml5.objectDetector("cocossd");
}

function setup() {
  canvas = createCanvas(640, 480);
  video.size(640, 480);
  video.hide();
  detector.detect(video, gotResults);
}

function draw() {
  image(video, 0, 0);
  for(let i = 0; i < detections.length; i++) {
    let object = detections[i];
    stroke("green");
    noFill();
    rect(object.x, object.y, object.width, object.height);
    noStroke();
    fill("red");
    textSize(20);
    text(object.label + ": " + (round(object.confidence, 2) * 100) + "%", object.x + 10, object.y + 20);
  }
}

function gotResults(error, results) {
  if(error) {
    console.error(error);
  } else {
    detections = results;
    //console.log(results);
    detector.detect(video, gotResults);
  }
}