var bg, bgImg, bgMusic;

var movementValx = 80;

var movementValy = 20;

var ground;

var gameState = 1;

var bluePlayer, bluePlayerImg, bluePlayerAnimation;

var brick, brickImg;

var obstaclesGroup, bomb1, bomb2, bomb3, bomb4, bombImg, explosionSound, explodedBombImg;
var flag, flagImg;

var nextLevelSound, deathSound;
var levelText;

var gameTitle, gameTitleImg;

var levelNumber = 1;

var levelUpSprite,levelUpImg;

var jumpPower = -20;

var playerState = "playing";

var middleLevelText, middleLevelImg;

var treeVillain, treeVillainImg;

function preload() {

    bgImage = loadImage("bg_image.png");

    bluePlayerImg = loadAnimation("blue_team.png");

    bluePlayerAnimation = loadAnimation("blue_team_walking1.png",
     "blue_team_walking2.png", "blue_team_walking3.png", "blue_team_walking4.png");

    bombImg = loadImage("bomb_exploding.png");
    explodedBombImg = loadImage("explosion.png");
    
    flagImg = loadImage("blue_flag.png");

    brickImg = loadImage("wall_brick.png");

    nextLevelSound = loadSound("sound_victory.m4a");

    levelUpImg = loadImage("levelUpdude.png");

    deathSound = loadSound("sound_lose.m4a");

    explosionSound = loadSound("sound_explosion.wav");

    bgMusic = loadSound("BG_music.m4a");

    middleLevelImg = loadImage("middleLevelImg.png");

    treeVillainImg = loadImage("tree.png");
}

function setup() {
    createCanvas(windowWidth,windowHeight-10);

    obstaclesGroup = createGroup();

    bg = createSprite(windowWidth/2,windowHeight/2,windowWidth,windowHeight);
    bg.addImage(bgImage);
    bg.scale = 1.4;
    //bg.velocityX = -5;

    bluePlayer = createSprite(150,windowHeight-250);
    bluePlayer.addAnimation("standing",bluePlayerImg);
    bluePlayer.addAnimation("walking",bluePlayerAnimation);
    bluePlayer.scale = 1.5;

    ground = createSprite(windowWidth/2, windowHeight, windowWidth,25);
    ground.visible = false;

    brick = createSprite(150,windowHeight-85);
    brick.addImage(brickImg);

    flag = createSprite(windowWidth-200,200);
    flag.addImage(flagImg);

    levelUpSprite = createSprite(1000000,1000000);
    levelUpSprite.addImage(levelUpImg);
    levelUpSprite.scale = 0.25;

    bomb1 = createSprite(100000,100000);
    bomb1.addImage(bombImg);
    bomb2 = createSprite(100000,100000);
    bomb2.addImage(bombImg);
    bomb3 = createSprite(100000,100000);
    bomb3.addImage(bombImg);
    bomb4 = createSprite(100000,100000);
    bomb4.addImage(bombImg);

    middleLevelText = createSprite(windowWidth/2,windowHeight/2);
    middleLevelText.addImage(middleLevelImg);
    middleLevelText.visible = false;

    treeVillain = createSprite(windowWidth - 100, windowHeight/2);
    treeVillain.addImage(treeVillainImg);
    treeVillain.visible = false;
}



function draw(){

if(bg.x<=-50){
    bg.x = windowWidth;
}

if(playerState === "playing"){
bluePlayer.velocityY = bluePlayer.velocityY + 2;
} else if(playerState === "brake"){
    bluePlayer.velocityY = 0;
}
if(keyDown(RIGHT_ARROW) && playerState === "playing"){
    bluePlayer.x = bluePlayer.x + 5;
    bluePlayer.changeAnimation("walking",bluePlayerAnimation);
    bg.x = bg.x - 2;
}

else if (keyDown(LEFT_ARROW) && playerState === "playing"){
    bluePlayer.x = bluePlayer.x - 5;
    bluePlayer.changeAnimation("walking",bluePlayerAnimation);
    bg.x = bg.x + 2;
}  else {
    bluePlayer.changeAnimation("standing",bluePlayerImg);
 }

if(bluePlayer.collide(brick) && keyDown("SPACE") && playerState === "playing") {
   bluePlayer.velocityY = jumpPower;
brick.x = brick.x + movementValx;
brick.y = brick.y - movementValy;
}

if(bluePlayer.collide(ground)){
    bluePlayer.x = 150;
    bluePlayer.y = windowHeight-250;
    brick.x = 150;
    brick.y = windowHeight-85;
}
  if(bluePlayer.isTouching(flag) && gameState === 1){
    playerState = "brake";
    middleLevelText.visible = true;
    levelUpSprite.x = windowWidth/2;
    levelUpSprite.y = windowHeight-(windowHeight-100);
    }

  if(keyDown("R") && playerState === "brake" && gameState === 1){
    middleLevelText.visible = false;
   
    playerState = "playing";
   
    gameState = 2;
    
    bluePlayer.x = 150;
    bluePlayer.y = windowHeight-250;
    
    brick.x = 150;
    brick.y = windowHeight-85;
    
    nextLevelSound.play();

    levelUpSprite.visible = false;

    movementValx += 10;
    movementValy +=20;
  }

  if(bluePlayer.isTouching(flag) && gameState === 2){
  playerState = "brake";
  middleLevelText.visible = true;
  levelUpSprite.visible = true;
}
  if(keyDown("R") && gameState === 2 && playerState === "brake"){
    gameState = 3;
    bluePlayer.x = 150;
    bluePlayer.y = windowHeight-250;
    brick.x = 150;
    brick.y = windowHeight-85;
    nextLevelSound.play();

  //  console.log(gameState);
    bomb1.x = windowWidth;
    bomb1.y = bluePlayer.y - 25;
    bomb1.velocityX = -2;
    bomb2.x = windowWidth;
    bomb2.y = bluePlayer.y - 100;
    bomb2.velocityX = -2;
    bomb3.x = windowWidth;
    bomb3.y = bluePlayer.y - 175;
    bomb3.velocityX = -2;
    bomb4.x = windowWidth;
    bomb4.y = bluePlayer.y - 250;
    bomb4.velocityX = -2;

    jumpPower = -50;
    movementValx = 100;
    movementValy = 0;

    levelUpSprite.visible = false;
    middleLevelText.visible = false;
}

if(bluePlayer.collide(bomb1) && playerState === "playing"){

    bluePlayer.x = 150;
    bluePlayer.y = windowHeight-250;
    brick.x = 150;
    brick.y = windowHeight-85;
    deathSound.play();
    explosionSound.play();
    levelUpSprite.x = windowWidth/2;
    levelUpSprite.y = windowHeight-(windowHeight-100);
  //  console.log(gameState);
    bomb1.destroy();
    bomb2.x = windowWidth;
    bomb2.y = bluePlayer.y - 125;
    bomb2.velocityX = -2;
    bomb3.x = windowWidth;
    bomb3.y = bluePlayer.y - 225;
    bomb3.velocityX = -2;
    bomb4.x = windowWidth;
    bomb4.y = bluePlayer.y - 325;
    bomb4.velocityX = -2;
    bluePlayer.velocityX = 0;
}
if(bluePlayer.collide(bomb2) && playerState === "playing"){

    bluePlayer.x = 150;
    bluePlayer.y = windowHeight-250;
    brick.x = 150;
    brick.y = windowHeight-85;
    deathSound.play();
    explosionSound.play();
    levelUpSprite.x = windowWidth/2;
    levelUpSprite.y = windowHeight-(windowHeight-100);
  //  console.log(gameState);
    bomb2.destroy();
    bomb1.x = windowWidth;
    bomb1.y = bluePlayer.y - 125;
    bomb1.velocityX = -2;
    bomb3.x = windowWidth;
    bomb3.y = bluePlayer.y - 225;
    bomb3.velocityX = -2;
    bomb4.x = windowWidth;
    bomb4.y = bluePlayer.y - 325;
    bomb4.velocityX = -2;
    bluePlayer.velocityX = 0;
}
if(bluePlayer.collide(bomb3) && playerState === "playing"){

    bluePlayer.x = 150;
    bluePlayer.y = windowHeight-250;
    brick.x = 150;
    brick.y = windowHeight-85;
    deathSound.play();
    explosionSound.play();
    levelUpSprite.x = windowWidth/2;
    levelUpSprite.y = windowHeight-(windowHeight-100);
  //  console.log(gameState);
    bomb3.destroy();
    bomb2.x = windowWidth;
    bomb2.y = bluePlayer.y - 125;
    bomb2.velocityX = -2;
    bomb4.x = windowWidth;
    bomb4.y = bluePlayer.y - 325;
    bomb4.velocityX = -2;
    bluePlayer.velocityX = 0;
}
if(bluePlayer.collide(bomb4) && playerState === "playing"){

    bluePlayer.x = 150;
    bluePlayer.y = windowHeight-250;
    brick.x = 150;
    brick.y = windowHeight-85;
    deathSound.play();
    explosionSound.play();
    levelUpSprite.x = windowWidth/2;
    levelUpSprite.y = windowHeight-(windowHeight-100);
  //  console.log(gameState);
    bomb4.destroy();
    bomb2.x = windowWidth;
    bomb2.y = bluePlayer.y - 125;
    bomb2.velocityX = -2;
    bomb3.x = windowWidth;
    bomb3.y = bluePlayer.y - 225;
    bomb3.velocityX = -2;
    bluePlayer.velocityX = 0;
}

if(bluePlayer.isTouching(flag) && gameState === 3){
playerState = "brake";
middleLevelText.visible = true;
levelUpSprite.visible = true;
}

if(keyDown("R") && gameState === 3 && playerState === "brake"){
    gameState = 4;
    
    playerState = "playing";
    bomb1.x = windowWidth;
    bomb1.y = bluePlayer.y - 25;
    bomb1.velocityX = -2;
    bomb2.x = windowWidth;
    bomb2.y = bluePlayer.y - 125;
    bomb2.velocityX = -2;
    bomb3.x = windowWidth;
    bomb3.y = bluePlayer.y - 225;
    bomb3.velocityX = -2;
    bomb4.x = windowWidth;
    bomb4.y = bluePlayer.y - 325;
    bomb4.velocityX = -2;
    bluePlayer.velocityX = 0;
    middleLevelText.visible = false;
    levelUpSprite.visible = false;
}

if(bluePlayer.isTouching(flag) && gameState === 4){
playerState = "brake";
middleLevelText.visible = true;
levelUpSprite.visible = true;

bomb1.destroy();
bomb2.destroy();
bomb3.destroy();
bomb4.destroy();
}


//console.log(bluePlayer.y);
    drawSprites();
}