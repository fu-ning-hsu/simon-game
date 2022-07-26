let userClickedPattern = [];
let gamePattern = [];
let buttonColors = ["red", "blue", "green", "yellow"];
let started = "false";
let level = 0;

function nextSequence() {
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor ).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
  level++;
  $("#level-title").text("Level " + level);
  userClickedPattern = [];
};

$(".btn").click(function(e) {
  let userChosenColor = e.target.id;
  userClickedPattern.push(userChosenColor);

  checkAnswer(userClickedPattern.length - 1);

  playSound(userChosenColor);
  animatePress(userChosenColor);

});

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout( function() {nextSequence();}, 1000);
    }
  } else {
    playSound("wrong")
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver() {
  started = "false";
  level = 0;
  gamePattern = [];
}


function playSound(name) {
  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");

  setTimeout (function() {
    $("#" + currentColor).removeClass("pressed")}, 100
  )
}

$(document).keydown(function() {
  if (started === "false") {
    nextSequence();
    started = "true";
    $("#level-title").text("Level " + level);
  };
});
