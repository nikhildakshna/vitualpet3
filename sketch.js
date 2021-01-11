//Create variables here
var dog;
var food;
var Food;
var stock;
var petstate = 0;
var HAPPY = 0;
var GARDEN = 1;
var LIVINGROOM = 2;
var BATHROOM = 3;
var BEDROOM = 4;
var DEAD = 5;
var VACCINE = 6;

/*
var second;
var minute;
var hour;
var day;
var week;
var month;
var year;
*/

var dogIMG,happydogIMG,milkIMG,bedroomIMG,deaddogIMG,tableIMG,gardenIMG;
var injectionIMG,lazydogIMG,livingroomIMG,runrightIMG,runleftIMG,vaccineIMG,bathroomIMG;
function preload()
{
  //load images here
  dogIMG = loadImage("dogImg.png");
  happydogIMG = loadImage("dogImg1.png");
  milkIMG = loadImage("Food Stock.png");
  bedroomIMG = loadImage("Bed Room.png");
  deaddogIMG = loadImage("deadDog.png");
  tableIMG = loadImage("dogVaccination.png");
  gardenIMG = loadImage("Garden.png");
  injectionIMG = loadImage("Injection.png");
  lazydogIMG = loadImage("Lazy.png");
  livingroomIMG = loadImage("Living Room.png");
  runrightIMG = loadImage("running.png");
  runleftIMG = loadImage("runningLeft.png");
  vaccineIMG = loadImage("Vaccination.jpg");
  bathroomIMG = loadImage("Wash Room.png"); 
}

function setup() {
  createCanvas(800, 800);
  database = firebase.database();
  dog = createSprite(650,500,10,10);
  dog.addImage(dogIMG);
  dog.scale = 0.2;

  food = database.ref('food');
  food.on("value",readstock);

  milk = new Foodtype();

  stock = 20;

  if(petstate === 1){
  for(var N = 20;N < 520;N += 50){
  milkspr = createSprite(N,400,10,30);
  milkspr.addImage(milkIMG);
  milkspr.scale = 0.1;
  milkspr2 = createSprite(N,500,10,30);
  milkspr2.addImage(milkIMG);
  milkspr2.scale = 0.1;
  }
  }

}


function draw() {  
  //add styles here

console.log();
  
if(petstate === GARDEN){
background(gardenIMG);
imageMode(CENTER);
image(gardenIMG,400,400,800,800);
var second = frameCount/10;
var minute = (second/60);
var hour = (minute/60);
var day = (hour/24);
var week = (day/7);
var month = (week/4);
var year = (month/12);
console.log(year);
drawSprites();
textSize(20);
fill("black");

dog.visible = false;

milk.draw();
milk.feed();
text("food remaining:" + stock,400,dog.y - 50);

feedbutton = createButton("feed drago");
addstockbutton = createButton("add stock");
feedbutton.position(500,100);
addstockbutton.position(600,100);

feedbutton.mousePressed(()=>{
if(stock > 0)
stock -= 1,
writeStock(stock),
petstate = HAPPY;



});

addstockbutton.mousePressed(()=>{
stock = 20;
writeStock(20);
});



if(stock == 0){
  textSize(30);
  fill(255,0,0);
  text("you have no food",375,200);
}



console.log(minute);

if(hour%2 === 0){
petstate = BEDROOM;
}

}

if(petstate === HAPPY){
background("teal");
var spr = createSprite(400,400);
spr.addImage(dogIMG);
spr.scale = 0.2;
dog.visible = false;
drawSprites();  
var second = frameCount/10;
var minute = (second/60);
var hour = (minute/60);
var day = (hour/24);
var week = (day/7);
var month = (week/4);
var year = (month/12);

if(hour%1.1 === 0){
petstate = GARDEN;

}


console.log(second,minute);
}

if(petstate === BEDROOM){
  second = frameCount/10;
  minute = (second/60);
  hour = (minute/60);
  day = (hour/24);
  week = (day/7);
  month = (week/4);
  year = (month/12);
  
  if(hour%4 === 0){
  petstate = BATHROOM;
  }
}

if(petstate === LIVINGROOM){
background(livingroomIMG);

second = frameCount/10;
minute = (second/60);
hour = (minute/60);
day = (hour/24);
week = (day/7);
month = (week/4);
year = (month/12);

if(day%4 === 0){
petstate = DEAD;
}

}

if(petstate === BATHROOM){
background(bathroomIMG);

second = frameCount/10;
minute = (second/60);
hour = (minute/60);
day = (hour/24);
week = (day/7);
month = (week/4);
year = (month/12);

if(hour%6 === 0){
petstate = LIVINGROOM;
}

}

if(petstate === DEAD){
background("teal");
drawSprites();
dog.addImage(deaddogIMG);
}

if(petstate === VACCINE){
background("teal");
var spr = createSprite(400,400);
spr.addImage(tableIMG);
if(keyDown("space")){
spr.addImage(vaccineIMG);
}
}

}

function readstock(data){
stock = data.val();
}

function writeStock(number){
database.ref('/').update({
food: number
})
}
