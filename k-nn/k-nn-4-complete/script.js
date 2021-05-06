// UI variables
let canvasDiv;
let canvas;
let textDiv;
let textP;

let snake;
let resolution = 20;
let food;
let w;
let h;
let score = 0;

function setup() {
  // Setup the canvas
  canvasDiv = createDiv();
  canvas = createCanvas(640, 480);
  canvas.parent(canvasDiv);
  textDiv = createDiv();
  textP = createP("Score: " + score);
  textP.parent(textDiv);
  w = floor(width / resolution);
  h = floor(height / resolution);
  snake = new Snake();
  foodLocation();
  frameRate(5);
}

function foodLocation() {
  let x = floor(random(w));
  let y = floor(random(h));
  food = createVector(x, y);
}

function draw() {
  // Refresh the background
  scale(resolution);
  background(220);
  // Draw the snake
  if(snake.eat(food)) {
    foodLocation();
    score++;
    textP.html("Score: " + score);
  };

  snake.update();
  snake.show();
  // Draw the food
  noStroke();
  fill(255, 0, 0);
  rect(food.x, food.y, 1, 1);
  // Check end game
  if(snake.endGame()) {
    textP.html("YOU LOSE. Final Score: " + score);
    background(255, 0, 0);
    noLoop();
  }
}

function keyPressed() {
  if(keyCode === LEFT_ARROW && snake.xDir === 0) {
    snake.setDir(-1, 0);
  } else if(keyCode === RIGHT_ARROW && snake.xDir === 0) {
    snake.setDir(1, 0);
  } else if(keyCode === UP_ARROW && snake.yDir === 0) {
    snake.setDir(0, -1);
  } else if(keyCode === DOWN_ARROW && snake.yDir === 0) {
    snake.setDir(0, 1);
  }
}
