var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var started = false;

var level = 0;


// to check for keypress function
$("body").keydown(function(){
    if (!started){
        $("#level-title").text("level " + level);
        nextSequence();
        started = true;
    }
});



// checkanswer function
function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success");

        if (userClickedPattern.length === gamePattern.length){
            setTimeout( function (){
                nextSequence();
            }, 1000);
        }
    } else {
        console.log("wrong");
        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function (){
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key To Restart");

        startOver();

    
    }

}


//  button click function
$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
});




// game sequence function
function nextSequence() {
    
    userClickedPattern = [];

    level++;
     
    $("#level-title").text("level " + level);

    var randomNumber = Math.random() * 4;
    randomNumber = Math.floor(randomNumber);

    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);

}



// sound function
function playSound(name) {

    // $("#" + randomChosenColour).on("click", function(){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
    // });
}

// animation function
function animatePress(currentColour){

    $("#" + currentColour).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    }, 100)
}


// restart game function
function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}



// setInterval(nextSequence, 1450);


