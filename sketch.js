var balloon, bAni;
var bg, bgIm;
var database;
var position;

function preload() {
  bgIm = loadImage("images/bg.png");
  bAni = loadAnimation("images/1.png", "images/1.png", "images/1.png", "images/1.png", "images/1.png", "images/1.png", "images/2.png", "images/2.png", "images/2.png", "images/2.png", "images/2.png", "images/2.png", "images/3.png", "images/3.png", "images/3.png", "images/3.png", "images/3.png", "images/3.png");
}

function setup() {
  createCanvas(800, 400);

  balloon = createSprite(100, 100);
  balloon.addAnimation("bAni", bAni);
  balloon.scale = 0.3;


  database = firebase.database();

  var bPos = database.ref("balloon/height");
  bPos.on("value", readPosition, showError);
}

function updateHeight(x, y){
  database.ref('balloon/position').set({
    'x' : height.x + x,
    'y' : height.y + y
  })
}

function readPosition(data){
  height = data.val();
  balloon.x = height.x;
  balloon.y = height.y;
}
function showError(){
  console.log("ERROR! ERROR! ERROR!");
}

function draw() {
  background(bgIm);

  textSize(10);
  textFont("timesnewroman");
  fill("black");
  text("***USE UP/DOWN ARROW KEYS TO MOVE THE BALLOON*** Hello ma'am, there is an error in this project... please correct it... I can also send the database link if you want...", 20, 20);

  if (keyDown(LEFT_ARROW)) {
    balloon.x = balloon.x - 5;
  }
  if (keyDown(RIGHT_ARROW)) {
    balloon.x = balloon.x + 5;
  }
  if (keyDown(UP_ARROW)) {
    balloon.y = balloon.y - 5;
  }
  if (keyDown(DOWN_ARROW)) {
    balloon.y = balloon.y + 5;
  }
  if(keyDown(UP_ARROW)){
    updateHeight(0, -10);
    balloon.addAnimation("balloon", bAni);
    balloon.scale = ballon.scale-0.01;
  }
  drawSprites();
}