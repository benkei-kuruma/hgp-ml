// Interface variables
let canvasDiv;
let canvas;
let textDiv;
let textP;

let model;
let targetLabel = "C";
let state = "collection";

function setup() {
  canvasDiv = createDiv();
  canvas = createCanvas(640, 480);
  textDiv = createDiv();
  textP = createP();
  textP.parent(textDiv);
  textP.html("Step 1: Data Collection");
  let options = {
    inputs: ["x", "y"],
    outputs: ["label"],
    task: "classification",
    debug: true
  };
  model = ml5.neuralNetwork(options);
}

function keyPressed() {
  if(key == "t") {
    state = "training";
    console.log("Training started!");
    textP.html("Step 2: Training");
    model.normalizeData();
    let options = {
      epochs: 100
    };
    model.train(options, whileTraining, finishedTraining);
  } else {
    targetLabel = key.toUpperCase();
  }
}

function whileTraining(epoch, loss) {
  console.log(epoch);
}

function finishedTraining() {
  console.log("Finished Training!");
  state = "prediction";
  textP.html("Step 3: Prediction");
}

function mousePressed() {
  let inputs = {
    x: mouseX,
    y: mouseY
  };
  if(state === "collection") {
    let target = {
      label: targetLabel
    };
    model.addData(inputs, target);
    stroke(0);
    noFill();
    ellipse(mouseX, mouseY, 24);
    fill(0);
    noStroke();
    textAlign(CENTER, CENTER);
    text(targetLabel, mouseX, mouseY);
  } else if(state === "prediction") {
    model.classify(inputs, gotResults);
  }
}

function draw() {
  //background(255);
}

function gotResults(error, results) {
  if(error) {
    console.error(error);
  } else {
    console.log(results);
    stroke(0);
    fill(0, 0, 255);
    ellipse(mouseX, mouseY, 24);
    fill(255);
    noStroke();
    textAlign(CENTER, CENTER);
    text(results[0].label, mouseX, mouseY);
  }
}
