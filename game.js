var userClickedPattern = [];

var gamePattern = [];

var buttonColours =["red", "blue", "green", "yellow"];

var level = 0;

var first = true;
$(".grey").click(function start() {
    if (first == true) {
        $("h1").text("Level " + level);
        nextSequence();
        first = false;
    }
});

$(".btn").click(function handller() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);

    check(userClickedPattern.length-1);
})



function nextSequence() {
    userClickedPattern = [];
    level++;
    $("h1").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);

    var randomChosenColour = buttonColours[randomNumber];
    
    gamePattern.push(randomChosenColour);
    
    $('#' + randomChosenColour).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
    

}

function playSound(name) {

    var audio = new Audio('sounds/'+name+'.mp3');
    
    audio.play();
}

function animatePress(currentColour) {
   $('#' + currentColour).addClass("pressed");
    setTimeout(() => {
        $('#' + currentColour).removeClass("pressed");
    }, 100);
    
}

function check(currentLevel) {
    
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
              nextSequence();
            }, 1000);
    
          }
    }else{
        
        playSound("wrong");
        
        $("body").addClass("game-over");
        
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}
function startOver(params) {
    level = 0;
    first = true;
    gamePattern = [];
}
