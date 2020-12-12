//Create variables here
var  dog;
var dogImage,dogImage2;
var happyDog;
var database;
var foodS;
var foodStock;


function preload(){
//load images here
dogImage=loadImage("images/dogImg.png");
dogImage2=loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(500, 500);
  dog=createSprite(249,250);
  dog.addImage(dogImage);
  dog.scale = 0.15;

  database = firebase.database();
  console.log(database);

  foodStock = database.ref('food');
  foodStock.on("value", readStock, showError);
  foodStock.set(20);

 
}


function draw() { 
  background("red");
  
  

  if(foodS !== 0){
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogImage2);
   
   }
   if(keyWentUp(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogImage);
    
   }
  }
 











  if(foodS == 0){
    dog.addImage(dogImage);
    foodS = 20;
  }

 
  //add styles here
  drawSprites();
  textSize(17);
  fill("blue");
  text("Long Press up arrow key to feed your pet dog jery",50,50);
  fill("yellow");
  text("Milk Bottles Remaining  "+foodS,170,340);
}





function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if(x<=0){
    x = 0;
  }else{
    x=x-1
  }
  database.ref('/').update({
    food:x
  })
}

function showError(){
  console.log("Error in writing to the database");
}
