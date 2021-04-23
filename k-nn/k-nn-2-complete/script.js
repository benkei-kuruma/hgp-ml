// Interface elements
let canvasDiv;
let canvas;
let textDiv;
let label;

let video;
let featureExtractor;
let knn;
let ready = false;

function setup() {
  canvasDiv = createDiv();
  canvas = createCanvas(640, 480);
  canvas.parent(canvasDiv);
  video = createCapture(VIDEO);
  video.style("display", "none");
  featureExtractor = ml5.featureExtractor("MobileNet", modelReady);
  knn = ml5.KNNClassifier();
  textDiv = createDiv();
  label = createP();
  label.parent(textDiv);
  label.html("Waiting for training...");
}

function draw() {
  image(video, 0, 0);
  if(!ready && knn.getNumLabels() > 0) {
    myClassify();
    ready = true;
  }
}

function myClassify() {
  const features = featureExtractor.infer(video);
  knn.classify(features, function (error, result) {
    if(error) {
      console.error(error);
    } else {
      //console.log(result);
      label.html("Label: " + result.label);
      myClassify();
    }
  });
}

function keyPressed() {
  const features = featureExtractor.infer(video);
  // want to see the features? have a look!
  // console.log(features.dataSync());
  if(key == "ArrowLeft") {
    knn.addExample(features, "left");
    console.log("you pressed left");
  } else if(key == "ArrowRight"){
    knn.addExample(features, "right");
    console.log("you pressed right");
  } else if(key == " ") {
    knn.addExample(features, "fire");
    console.log("you pressed space");
  } else if(key == "s") {
    knn.save();
    console.log("model saved!");
  }
}

function modelReady() {
  console.log("Model Ready!");
}