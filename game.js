var buttonColours=["red","green","yellow","blue"]
var gamePattern=[]
var userClickedPattern=[]
var level=0

$(document).keydown(function (){
  if(level===0){
    nextSequence()
  }
})

$(document).click(function(){
  if(level===0){
    nextSequence()
  }
})


$(".btn").click(function (){
  var userChosenColour=this.id
  userClickedPattern.push(userChosenColour)
  playSound(userChosenColour)
  animatePress(userChosenColour)
  checkAnswer((userClickedPattern.length)-1)
})

function nextSequence(){
  userClickedPattern=[]
  level=level+1
  $("h1").text("Level "+level)
  var randomNumber=Math.floor(Math.random()*4);
  var randomChosenColour=buttonColours[randomNumber]
  gamePattern.push(randomChosenColour)
  playSound(randomChosenColour)
  animatePress(randomChosenColour)
}

function checkAnswer(currentLevel){

  if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){

  if (userClickedPattern.length === gamePattern.length){

    setTimeout(function () {
      nextSequence();
    }, 1000);

  }
}else{
  playSound("wrong")
  $("body").addClass('game-over')
  setTimeout(function (){
    $("body").removeClass('game-over')
  },200)
  $("h1").text("Game Over!Press any key to start again")
  level=0
  gamePattern=[]
}
}

function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.preload="auto"
  audio.currentTime=0
  audio.play();
}

function animatePress(buttonPressed){
  $("#" + buttonPressed).addClass('pressed')
  setTimeout(function () {
    $("#" + buttonPressed).removeClass('pressed')
  }, 100);
}
