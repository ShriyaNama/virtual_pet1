var dog, happyDog, database, foodS, foodStock, dogImg;

function preload()
{
  dogImg = loadImage("Dog.png");
  happyDog = loadImage("happydog.png");
}

function setup() {
  createCanvas(500, 500);
  
  dog = createSprite(250, 250);
  dog.addImage(dogImg);
  dog.scale = 0.5;
  database = firebase.database();

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
}


function draw() {  
  background(46, 139, 87);

  if(keyWentDown(UP_ARROW)) {
    writeStock(foodS);
    dog.addImage(happyDog);
  }

  drawSprites();

  textSize(18);
  fill("white");
  stroke("white");
  text("Press 'Up Arrow' To Feed Milk", 20, 40);
}

function readStock(data) {
  foodS = data.val();
}

function writeStock(x) {
  if( x<= 0) {
    x = 0;
  }
  else {
    x=x-1;
  }
  database.ref('/').update({
    Food: x
  })
}

