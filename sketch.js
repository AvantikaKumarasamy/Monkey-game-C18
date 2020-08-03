//Global Variables
var PLAY = 1;
var END = 0;
var gameState = PLAY; 

var canvas;
var monkey;
var obstacles;
var banana;
var ground;
var scene;
var gameOver;
var resart;
var SurvivalTime = 0;

// function preload(){
//   monkey = loadAnimation ("Monkey_01.png", "Monkey_02.png", "Monkey_03.png","Monkey_04.png", "Monkey_05.png", 
//   "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
  
//   obstacles = loadImage ("stone.png"); 
//   banana = loadImage ("banana.png");
//   scene = loadImage ("jungle.jpg");
//   gameOver = loadImage ("gameOver.png");
//   restart = loadImage ("restart.png");
  
// }


function setup() {
  canvas = createCanvas(1200,800);
  
   monkey = createSprite(200,600,100,75);
  // monkey.addAnimation(monkey);
    
   ground= createSprite(600,400,1200,10);
   ground.velocityX=-6; 
   ground.x=ground.width/2;

   gameOver= createSprite(200,200,10,10);
   restart= createSprite(200,340,10,10);
  
  BananaGroup = new Group ();
  ObstacleGroup = new Group();
}


function draw(){
 background(255);
  
   if ( gameState === PLAY){
    
    if (keyDown("space")){
    monkey.velocityY = -15 ;
    }
    
    if (ground.x < 150){
    ground.x = ground.width/2;
    }
    
    monkey.velocityY = monkey.velocityY + 0.8;
    
    if (BananaGroup.isTouching(monkey)) {
      BananaGroup.setLifetimeEach(0); 
    }
    
    stroke("black");
    textSize(20);
    fill("black");
    SurvivalTime = round (frameCount/ frameRate());
    text("Survival Time: "+ SurvivalTime,100,50);
    
    if (ObstacleGroup.isTouching(monkey)) {
      gameState = END;
      
    }
    
    Banana();
    Obstacles(); 
  
  } else if(gameState === END){
    
    ObstacleGroup.setLifetimeEach(-1);
    BananaGroup.setLifetimeEach(-1);
    
    ground.velocityX=0;
    
    ObstacleGroup.setVelocityXEach(0);
    BananaGroup.setVelocityXEach(0);
    monkey.velocityX(0);
    monkey.velocityY(0);   
    
    //monkey.changeAnimation("Monkey_05.png");
    
    stroke("black");
    textSize(20); 
    fill("black");
    text("Survival Time: "+0,100,50);
    
    drawSprites();
    
  }  
}

function Banana(){
  if(frameCount%80 === 0){
    var banana = createSprite (600, random (200,250),100,75);
    //banana.addAnimation(banana);
    banana.scale=0.05;
    banana.velocityX=-4;
    banana.lifetime=110;
    BananaGroup.add(banana); 
  } 
}

function Obstacles (){
  if (frameCount%200 === 0) {
    var obstacles = createSprite (600,250,100,75);
   // obstacles.addAnimation(obstacles);
    obstacles.scale=0.15;
    obstacles.velocityX=-4;
    obstacles.lifetime=110;
    ObstacleGroup.add(obstacles); 
  }
}
