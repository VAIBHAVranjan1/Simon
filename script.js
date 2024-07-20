let gamePattern = [];
let userClickedPattern = []
let buttonColours = ["red", "blue", "green", "yellow"]
isGameON = false

let level = 0;

nextSeq = () =>{
  let randomChosenColour = buttonColours[Math.floor(Math.random()*4)];
  gamePattern.push(randomChosenColour);
  $(`#${randomChosenColour}`).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour)
  $("#level-title").text(`Level: ${level}`)
  level+=1;
}

playSound = (naam) =>{
  let audio = new Audio("sounds/"+naam+".mp3")
  audio.play()
}

let indexing = 0;

$(".btn").click(function(){
  let userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour)
  animatePress(userChosenColour)

  if(chekUser(indexing)){
    indexing++;
  }else{
    $("#level-title").text(`Wrong Answer`)

    playSound("wrong")
    let webpage = $("body");
    webpage.addClass("game-over");
    setTimeout(function(){
      webpage.removeClass("game-over")
      $("#level-title").text(`Press A Key to Start`)
      StartOver()
    }, 500)
  }

  if(indexing == gamePattern.length){
    indexing = 0;
    userClickedPattern = []
    setTimeout(function(){
      nextSeq()
    }, 1000)
  }
})

animatePress = (currentColor) => {
  let name = $("."+currentColor)
  name.addClass("pressed");
  setTimeout(function(){
    name.removeClass("pressed")
  }, 100)
}


$(document).on("keypress", function(){
  if(isGameON == false){
    nextSeq();
  }
  isGameON = true;
})

function chekUser(number){
  if(gamePattern[number] == userClickedPattern[number]){
    return true;
  }else{
    return false;
  }
}

function StartOver(){
  indexing = 0;
  userClickedPattern = []
  gamePattern = []
  level = 0;
  isGameON = false;
}