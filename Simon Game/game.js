var buttonColors = ["red","blue","yellow","green"];

var useClickedPattern = []

var started = false;

var level = 0;

var gamePattern = [];

$(document).keypress(function() {

    if(!started){

        $("#level-title").text("Level" + level);
        nextSequence();
        started = true;

    }
});




$(".btn").on("click", function () {
    var userChosenColor = $(this).attr("id");
    
    useClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(useClickedPattern.length-1);
    
})

function checkAnswer(currentLevel) {

    if(gamePattern[currentLevel] === useClickedPattern[currentLevel]) {

        console.log("success");

        if(useClickedPattern.length === gamePattern.length) {

            setTimeout(() => {
                nextSequence();
            }, 1000);

        }
    } else {

        console.log("wrong");

        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver();
    }


}

function nextSequence() {

    useClickedPattern = [];

    level++;

    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor((Math.random() * 4));
    
    let randomChosenColor = buttonColors[randomNumber];
    
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);


    playSound(randomChosenColor);
}

function playSound(name) {
    
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {

    $("#" + currentColor).addClass("pressed");


    setTimeout(function() {

        $("#" + currentColor).removeClass("pressed");

    },100);

}

function startOver() {

    level = 0 ;
    gamePattern = [];
    started = false;


}