var Trex,trex_running, trex_collided;

var ground, invisibleground, groundImg;

var cloud, cloudImg;

var obstacleGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score = 0;

function preload() {
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trex_collided = loadImage("trex_collided.png");
  groundImg = loadImage("ground2.png");
  cloudImg = loadImage("cloud.png");
}

function setup() {
  createCanvas(600, 200);
  
  Trex = createSprite(50,180,20,50);
  Trex.addAnimation("running", trex_running);
  Trex.scale = 0.5;
  
  ground = createSprite(300,180,600,10);
  ground.addImage("ground", groundImg);
  
  invisibleground = createSprite(300,190,600,10);
  invisibleground.visible = false;
}

function draw() {
  background(220);
  
  
  trex.collide(invisibleground);
  
  text("Score: "+ count, 500, 50);
  console.log(gameState);
  
  if(gameState === PLAY){
    
    ground.velocityX= -(6 + 3 * count/100);
    score = Math.round(World.frameCount/4);
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
     //jump when the space key is pressed
    if(keyDown("space") && trex.y >= 359){
      trex.velocityY = -12 ;
    }

    
    //spawn the clouds
    spawnClouds();
  
    //spawn obstacles
    spawnObstacles();
    
    if (count > 0 && count%100 === 0) {
    }
    
    //End the game when trex is touching the obstacle
    if(ObstaclesGroup.isTouching(trex)){
      //gameState = END;
      //playSound("die.mp3");
      trex.velocityY = -10;
    }
  }
  
  else if(gameState === END) {
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    ObstaclesGroup.setVelocityXEach(0);
    CloudsGroup.setVelocityXEach(0);
    
    //change the trex animation
    trex.setAnimation("trex_collided");
    
    //set lifetime of the game objects so that they are never destroyed
    ObstaclesGroup.setLifetimeEach(-1);
    CloudsGroup.setLifetimeEach(-1);
    
    //place gameOver and restart icon on the screen
    var gameOver = createSprite(200,300);
    var restart = createSprite(200,340);
    
    gameOver.setAnimation("gameOver");
    gameOver.scale = 0.5;
    restart.setAnimation("restart");
    restart.scale = 0.5;
  }
  
  //console.log(trex.y);
  
  //stop trex from falling down
  trex.collide(invisibleGround);
  
  drawSprites();
}

function spawnObstacles() {
  if(World.frameCount % 60 === 0) {
    var obstacle = createSprite(400,365,10,40);
    obstacle.velocityX = -(6 + 3 * count/100);
    
    //generate random obstacles
    var rand = randomNumber(1,6);
    obstacle.setAnimation("obstacle" + rand);
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 70;
    //add each obstacle to the group
    ObstaclesGroup.add(obstacle);
  }
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(400,320,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage("cloud", cloudImg);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
  }
  
}