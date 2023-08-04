var standingImage, runningAnimation
var background,obstacle1, obstacle2,obstacle3
var obstacle,runner
var startImage
var gameState = 'serve'
var score


function preload() {

  runningAnimation = loadAnimation("running1.png", "running2.png", "running4.png")
  obstacle1 = loadImage("obstacle1.png")
  obstacle2 = loadImage("obstacle2.png")
  obstacle3 = loadImage("obstacle3.png")
 backgroundImg = loadImage("background.png")
  standingImage = loadAnimation("standingImage.png")
  startImage = loadImage("startImage.png")
  resetImage = loadImage("reset.png")
  gameOverImage = loadImage("gameOver.png")
}


function setup() {
  createCanvas(800,400);
  invisibleGround = createSprite(400,400,800,10)
  invisibleGround.visible=true

 fox = createSprite(50,350)
 fox.addAnimation("standingImage",standingImage)
 fox.addAnimation("runningAnimation",runningAnimation)
 fox.scale=0.5

 start = createSprite(400,200)
 start.addImage("startImage", startImage)
 start.scale = 0.2

 obstaclesGroup = new Group()

 restart = createSprite(400,230)
 restart.addImage("reset",resetImage)
 restart.scale=0.09
 restart.visible=false

 
 gameOver = createSprite(400,150)
 gameOver.addImage("gameOverImage",gameOverImage)
 gameOver.scale=0.4
 gameOver.visible=false
 score = 0
 

 

}

function draw() {
  background(backgroundImg);  
  drawSprites();
  console.log(fox.y)

  textSize(25)
  text("Score:"+score,10,50)



  if (gameState === "serve"){
    if (mousePressedOver(start)){
      gameState = "play"
    }
   }
   if (gameState === "play"){
    start.visible = false
    fox.changeAnimation("runningAnimation",runningAnimation)

    spawnObstacles()
    
    score = score+Math.round(getFrameRate()/60)

    if(keyDown("space")&&fox.y>250){
      fox.velocityY=-18
    }
    fox.velocityY+=1
  }

fox.collide(invisibleGround)

if (fox.isTouching(obstaclesGroup)){
  gameState = "end"

}

if(gameState === "end"){
  fox.changeAnimation("standingImage")
  obstaclesGroup.setVelocityXEach(0)
  restart.visible=true
  gameOver.visible=true
  score=0

}

if (mousePressedOver(restart)){
  reset()
}


}

function spawnObstacles(){
  
  if(frameCount%100==0){
obstacle = createSprite(800,360)
  obstacle.scale = 0.3
  obstacle.velocityX = -5
  obstaclesGroup.add(obstacle)
  

  
  obstacle.setCollider("rectangle",0,0,60,90)

  var rand = Math.round(random(1,3))
switch(rand){
  case 1:obstacle.addImage(obstacle1)
  break
  case 2:obstacle.addImage(obstacle3)
  break
  case 3:obstacle.addImage(obstacle2)
  break
 

}

  }


}

function reset(){
  gameState = "play"
  restart.visible=false
  gameOver.visible=false
  obstaclesGroup.destroyEach()
  fox.changeAnimation("runningAnimation")
  
}