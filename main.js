var running = true;
var numberOfSteps = 50;
var populationSize=50;
var mutationRate = 0.01;
var goal = 6*64;
var increaseMovesBy = 40;
var count;
var size;
var gravity;
var ground;
var player;
var jumpV;
var squareArray;
var spikeArray;
var speed;
var population;


var level1 =
{
  "squares":[
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
    {
    "x":27,
    "y":1
    },
    {
    "x":27,
    "y":2
    },

    {
    "x":30,
    "y":2
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
  population = new Population(populationSize);

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
  count=((count+0.5)%128);
  
  background(count);
  if (population.solutionFound){
    noLoop();
  }
  population.draw();
  population.update();
  if (population.allPlayersDead()){
    population.naturalSelection();
    population.mutate();
    count = 0;
    if (population.solutionFound){
      noLoop();
      return;
    }
    setupWorld();
    console.log(population.gen);
    if (population.gen%5==0){
      population.increaseMoves();
    }
  }
  drawSquares();
  drawGround();
  textSize(40);
  fill(0,0,0);
  text('Generation:'+str(population.gen), 10, windowHeight-60);
  checkKeyPress();
}

function drawSquares(){
  for (let square of squareArray){
    square.draw();
    for (let i=0;i<population.players.length;i++){
      square.collision(population.players[i]);
    }
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
