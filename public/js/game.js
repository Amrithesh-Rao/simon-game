let buttonColours=["red","green","yellow","blue"]
let gamePattern=[]
let userClickedPattern=[]
let level=0

$(".start").click(function (){
  if(level===0){
    if(getName()){
      nextSequence()
    }
    
  }
})

$(".start").on("touchstart",function(){
  if(level===0){
    if(getName()){
      nextSequence()
    }
    
  }
})


$(".btn").click(function (){
  if(level==0){
    return
  }
  var userChosenColour=this.id
  userClickedPattern.push(userChosenColour)
  playSound(userChosenColour)
  animatePress(userChosenColour)
  checkAnswer((userClickedPattern.length)-1)
})

function getName(){
  $("#inputName").val(prompt("Enter your name to start game"))
  if($("#inputName").val()==""){
    alert("Enter name to be displayed on leaderboard");
    return 0;
  }
  return 1;
}

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
  $("h1").text("Game Over!☠")
  setTimeout(() => {
    $("#score").val(level);
  $("form").submit();
  level=0
  gamePattern=[]
  }, 1500);
  
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
  }, 200);
}