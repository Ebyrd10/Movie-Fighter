

//This variable handles if the current MovieA and Movie B have been used before
var repeatingMovieTF = false;

// the winningCreteria must match one of the properites of the currentMovie objects
var winningCreteria;

//The two variables below are how they wil actaully look in the code at the end of the day
var currentMovieA;
var currentMovieB;
var currentMovieAObj;
var currentMovieBObj;
var currentMovieAObj;


//This variable is the movie array in use. It should be set equal to a pre-made array at the beginning of the game.
var currentMovieArray = [];

//A past movie array that is pushed to after every round to make sure that the same two movies dont appear twice
var pastMovies = [];

//This array stores the avilable parameters
var allParameters = [
    rating = { name: "rating", menuDesc: "Higher Rating", description: "Choose the higher rated movie" },
    runtime = { name: "runtime", menuDesc: "Longer Runtime", description: "Choose the longer movie" },
    year = { name: "year", menuDesc: "Newer Movie", description: "Choose the newer movie" },
    boxOffice = { name: "boxOffice", menuDesc: "Highest Box Office", description: "Choose the movie with the higher box office" }
];

//A score keeping variable
var score = 0;
//An array of the numbers that keeps track of high scores
var highScoreList = [];

//Inital behavior
var init = function () {
    //Creates the movie menu
    var movieMenu = $("#movieSetMenu"); //TODO: Make this sync up with the HTML
    for (var i = 0; i < allMovieSets.length; i++) {
        var newOption = $("<option>");
        newOption.val(i);
        newOption.text(allMovieSets[i].name);
        movieMenu.append(newOption);
    }

    //Creates an option selection for each parameter
    var paraMenu = $("#parameterMenu"); //TODO: Make this sync up with the HTML
    for (var i = 0; i < allParameters.length; i++) {
        var newOption = $("<option>");
        newOption.val(i);
        newOption.text(allParameters[i].menuDesc);
        paraMenu.append(newOption);
    }

    //Loads the highscore list from local storage if it exists
    if (localStorage.getItem("movieFighterHighScoreList") !== null) {
        highScoreList = JSON.parse(localStorage.getItem("movieFighterHighScoreList"));
    }

};//End of initialzing function 
//Calls the initializing function
init();

var gameStarted = false;

//This function begins the game when the player pushes the start button
$("#start-button").on("click", startGame);
document.body.onkeyup = function (e) {
    if (!gameStarted)
    {
    console.log(e.keyCode)
    if (e.keyCode === 32){
    startGame();
    }
}
}
function startGame() {
    gameStarted = true;
    //This sets the currentMovieArray to the player's choice
    var movieChoice = $("#movieSetMenu option:selected").val();
    currentMovieArray = allMovieSets[movieChoice].array;
    if (!currentMovieArray) {
        currentMovieArray = movieNames
        console.log("set movie array to default movieNames array in MovieNames.js")
    };

    //This sets the parameter to the player's choice
    var paraChoice = $("#parameterMenu option:selected").val();
    winningCreteria = allParameters[paraChoice];
    //This promise waits for selectMovies to finish, or maybe it does nothing
    return new Promise(function (resolve, reject) {
        selectMovies();
        //This deletes the start button once it has been pressed
        $("#start-button").remove();
        //hides the start screen
        $("#startScreenContainer").attr("style", "display: none");
        //displays the game screen
        $("#game-container").attr("style", "display: inline");
        //displays the currently selected parameter/winning creteria
        $("#vsParameter").text(winningCreteria.description)
        resolve()
    })
}

//This function pushes the current movies as an object into the past movies array
function storepastMovies() {
    var newEntry = {
        movieA: currentMovieAObj.title,
        movieB: currentMovieBObj.title
    };
    pastMovies.push(newEntry);
};

var repeatObj = {
    movieA: "",
    movieB: ""
};
var repeatObjInverse = {
    movieA: "",
    movieB: ""
};
//Returns true for a repeat, false for a new set
function checkRepeats() { //check for repeats is breaking the game functionality, it becomes impossible to lose
    if ((!currentMovieAObj.title) || (!currentMovieBObj.title)) {
        console.log("one or more movies in not defined for check repeats function")
        return;
    }
    else {
        repeatObj.movieA = currentMovieAObj.title;
        repeatObj.movieB = currentMovieBObj.title;

    };
    repeatObjInverse = {
        movieA: currentMovieBObj.title,
        movieB: currentMovieAObj.title
    };
    //If the current movie, or a variation of the current movies placement is already in the pastMovies array, then checkRepeats is true
    if ((pastMovies.includes(repeatObj)) || (pastMovies.includes(repeatObjInverse))) { //this if statement is broken, use a for loop?
        console.log("repeat is true")
        repeatingMovieTF = true;
    }
    else {
        repeatingMovieTF = false;
    }
};

// A function that adds the current score as a high score
var addHighScore = function () {
    var newScore = {
        name: $("#highscore-form input").val(),
        playerScore: score
    };

    //do not allow scores of 0 to be entered into the highscore list
    if (newScore.playerScore > 0) {
        //if there is no name, set the name to anonymous
        if (!newScore.name) {
            newScore.name = "Anonymous"
        };
        
        highScoreList.push(newScore)
    }
}
//A function to save our highscore list to local storage
function saveToLocalStorage() {
    var highScoreListStr = JSON.stringify(highScoreList);
    localStorage.setItem("movieFighterHighScoreList", highScoreListStr);
};

//A function to clear the highscore list
function clearLocalStorage() {
    highScoreList = [];
    var highScoreListStr = JSON.stringify(highScoreList);
    localStorage.removeItem("movieFighterHighScoreList");
};

//A variable to determine whether or not a special scenerio of ties/draws is encountered
var isDraw = false;



//The user makes a choice between movie A and movie B
var userChoice;

function determineWinner() {
    var winningCreteriaName = winningCreteria.name;

    if (currentMovieAObj[winningCreteriaName] > currentMovieBObj[winningCreteriaName]) {
        console.log("log: movieA wins")
        return currentMovieAObj;
    }
    else if (currentMovieAObj[winningCreteriaName] < currentMovieBObj[winningCreteriaName]) {
        console.log("log: movieA losses")
        return currentMovieBObj;
    }
    else if (currentMovieAObj[winningCreteriaName] === currentMovieBObj[winningCreteriaName]) {
        console.log("log: movies are tied")
        return isDraw = true;
    }
    else {
        console.log("log: no winner was successfully declared")
    }
}

//Comparing userChoice to the actual winner
var winOrLose = function () {
    //Calling the result of the determineWinner function as a winner variable
    var winner = determineWinner();
    //If the user correctly choses the winner, OR a draw is encountered, the game goes on

    if ((userChoice === winner) || (isDraw)) {
        //Reset isDraw to false
        isDraw = false;
        //increment the current score
        score++;
        //Stores the past movies to avoid repeats
        storepastMovies();
        //Pick 2 new movies
        selectMovies();
        //Render the new movies onto the screen after a brief delay
        // setTimeout(displayMovies(), 250)
    }
    else {
        displayHighScores();
    }

};

//This function sets currentMovieA and currentMovieB to two new valid choices from the array
function selectMovies() {

    //Gets two movie names at random from the currentMovieArray
    var movieAIndex = Math.floor(Math.random() * currentMovieArray.length);
    currentMovieA = currentMovieArray[movieAIndex];
    var movieBIndex = Math.floor(Math.random() * currentMovieArray.length);
    currentMovieB = currentMovieArray[movieBIndex];

    // //Populates the current movies with their API data, transforming just a string into an object with different properties
    var promiseA = GetMovieData(currentMovieA) //a promise {ajax} function that returns a movie object
    var promiseB = GetMovieData(currentMovieB) //same function as before, but a different name
    Promise.all([promiseA, promiseB]).then(function (PromiseVortexArray) { //Waits for both promises to complete before returning an array of return values
        currentMovieAObj = PromiseVortexArray[0]; //assigns the first return value to an object
        currentMovieBObj = PromiseVortexArray[1]; //assigns the second return value to a different object
        //This if statement handle the possibilty that Movie A and Movie B are the same
        if ((currentMovieAObj.title === currentMovieBObj.title)) {
            selectMovies();
        }
        else if ((!currentMovieAObj.title) || (!currentMovieBObj.title)) {
            console.log("select movies returned early")
            selectMovies();
        }
        else {
            checkRepeats();
            if (repeatingMovieTF === true) {
                console.log("repeat found")
            }
        }
        displayMovies();
    })
}

//This function sets the HTML elements to display summaries and images for the movies
function displayMovies() {

    $("#button-A").text(currentMovieAObj.title);
    $("#button-B").text(currentMovieBObj.title);

    var movieAImage = $("#movAImg");
    var movieBImage = $("#movBImg");
    movieAImage.attr("src", currentMovieAObj.posterRef);
    movieBImage.attr("src", currentMovieBObj.posterRef);
    movieAImage.attr("alt", currentMovieAObj.title);
    movieBImage.attr("alt", currentMovieBObj.title);
}


//A function that clear the main image/moive section if ever needed
var clearInfo = function () {
    $("#movie-images").html = "";
    $("#movie-info").html = "";
};

//A function that clears the highscores display div
var clearHighScoresDisplay = function () {
        $("#DisplayHighScores").empty();
};


//This function displays the current high scores list
displayHighScores = function () {
    //Sorts the highscore array before displays the data
    var sortedList = highScoreList;
    sortedList.sort(function (a,b){
        return b.playerScore - a.playerScore
    })
    //This deals with the positioning of the list
    //Clears the movie cards to make way for a highscore list
    clearInfo();
    //Clears the highscore list if it exists to make way for new highscores
    clearHighScoresDisplay();

    $("#game-container").attr("style", "display: hidden")
    $("#endPage").attr("style", "display: inline")

    //Display the Highscores onto the page
    $("#game-container").attr("style", "display: none");
    $("#end-container").attr("style", "display: in-line");

    //Displays the user's final score
    $("#finalScore").text(`Your Score: ${score}`)

    //This deals with the creation of the actual highscore display section
    displayHighScoresList = $("<div>").attr("id", "DisplayHighScores")
    $("#highscore-form").append(displayHighScoresList)

    //This deal with the creation of the list
    //loops through the HighScores array and create a new listitem for every entry
    for (i = 0; i < sortedList.length; i++) {
        var listitem = $("<li>");
        listitem.text(sortedList[i].name + " : " + sortedList[i].playerScore + " points");
        $("#DisplayHighScores").append(listitem);
    }
};

//If the highscores button is clicked then then it triggers the display Highscores function
// $("#highscore-button").on("click", displayHighScores());

//On clicking an image, that image becomes  userChoice and it calls the winOrlose function to see if the userChoice was correct
//user choice can also be set by clicking on the image itself
$("#button-A").on("click", function () {
    determinePlayerChoice(true);
});

$("#button-B").on("click", function () {
    determinePlayerChoice(false);
});

$("#movAImg").on("click", function () {
    determinePlayerChoice(true);
});

$("#movBImg").on("click", function () {
    determinePlayerChoice(true);
});

function determinePlayerChoice(choiceA) {
    if (choiceA) {
        userChoice = currentMovieAObj;
    }
    else {
        userChoice = currentMovieBObj;
    }
    winOrLose();
}

$("#addHighScoreBtn").on("click", function () {
    //Add the final score to the highscore list
    addHighScore();
    //Save the highscore list to local storage
    saveToLocalStorage();
    //Hides the add button
    $("#addHighScoreBtn").hide();
    //Hides the name form
    $("#highscore-form input").hide();
    clearHighScoresDisplay();
    displayHighScores();

});

$("#clearLocalStorageBtn").on("click", clearLocalStorage)

// //Animates the start button to move every half second in a random direction
var movingStartMenu = function () {
    var startSection = $("#start-button");
    startSection.attr("style", "position:relative")
    startSection.animate({ top: "-=100px" }, "fast");
    startSection.animate({ top: "+=275px" }, "fast");
    var rando;
    randomPick = function () {
        rando = Math.floor((Math.random() * 4) + 1);
    }
    var moveStartTimer = setInterval(function () {
        randomPick();
        switch (rando) {
            case 1:
                startSection.animate({ top: "-=20px" }, "fast");
                startSection.animate({ top: "+=20px" }, "fast");
                break;

            case 2:
                startSection.animate({ top: "+=20px" }, "fast");
                startSection.animate({ top: "-=20px" }, "fast");
                break;

            case 3:
                startSection.animate({ left: "-=20px" }, "fast");
                startSection.animate({ left: "+=20px" }, "fast");
                break;

            case 4:
                startSection.animate({ left: "+=20px" }, "fast");
                startSection.animate({ left: "-=20px" }, "fast");
                break;
            default:
                console.log("RandomPicker or swtich statement failed");
        }
    }, 250)//End of setInterval
    if (!($("#start-button"))) {
        clearInterval(moveStartTimer); //Clears the timer if the start section on longer exists
    }
};//end of movingStartMenu
movingStartMenu();

$("#go-home").on("click", function refreshPage() {
    window.location.reload();
});

$("#header").on("click", function refreshPage() {
    window.location.reload();
});