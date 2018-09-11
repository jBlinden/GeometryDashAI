var running = true;
var count;
var size;
var gravity;
var ground;
var player;
var jumpV;
var squareArray;
var spikeArray;
var speed;

var level1 =
{
  "squares":[
    {
    "x":1,
    "y":4
    },
    {
    "x":5,
    "y":4
    },
    {
    "x":7,
    "y":3
    },
    {
    "x":9,
    "y":2
    },
    {
    "x":12,
    "y":1
    },
    {
    "x":15,
    "y":3
    },
    {
    "x":18,
    "y":3
    },
    {
    "x":18,
    "y":2
    },
    {
    "x":18,
    "y":1
    },
    {
    "x":20,
    "y":5
    },
    {
    "x":20,
    "y":6
    },
    {
    "x":19,
    "y":1
    },
    {
    "x":20,
    "y":1
    },
    {
    "x":21,
    "y":1
    },
  
  ]
}

//var level1 = {"squares":[{"x":20,"y":1}]};


function setup() { 
  noCursor();
  createCanvas(windowWidth, windowHeight);
  count=0;
  gravity = 1;
  ground = 600;
  size=64;
  jumpV=18;
  speed = 5;
  setupWorld();
  spikeArray=[];
  player = new Player(200,ground-(size/2));

} 
function setupWorld(){
  squareArray=[];
  squares = level1["squares"];
  for (let a of squares){
    squareArray.push(new square(a.x,a.y));
  }
}

function draw() { 
  //console.log(frameRate());
  count=((count+1)%250);
  background(count);
  player.draw();
  player.collision();
  drawSquares();
  drawGround();
  checkKeyPress();
}

function drawSquares(){
  for (let square of squareArray){
    square.draw();
    square.collision(player);
  }
}
function drawGround(){
  fill(200);
  strokeWeight(4);
  stroke(51);
  rect(0,ground+2,windowWidth,windowHeight-ground);
  noStroke();
}
function checkKeyPress(){
  if (keyIsDown(32)) {
    player.jump();
  }

}

function stopGame(){
	if (running){
		noLoop();
		running = false;
	}
	else{
		loop()
		running = true;
	}
}

function keyPressed() {
  if (keyCode == 187){
  	stopGame()
  }
}
