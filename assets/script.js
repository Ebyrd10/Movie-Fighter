// Two variables to hold the movieObject data from the API functions
//These are dummy variables to help coding things without data
// var currentMovieA = {
//     title: "Ethan's Story",
//     rating: "",
//     runtime: "",
//     year: "2011",
//     boxOffice: "",
//     posterRef: ""
// };
// var currentMovieB = {
//     title: "Ethan's Story 2: The Retelling",
//     rating: "",
//     runtime: "",
//     year: "2019",
//     boxOffice: "",
//     posterRef: ""
// };

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
    rating = { name: "rating", menuDesc: "Higher Rating", description: "Choose the higher rated movie." },
    runtime = { name: "runtime", menuDesc: "Longer Runtime", description: "Choose the longer movie." },
    year = { name: "year", menuDesc: "Newer Movie", description: "Choose the newer movie." },
    boxOffice = { name: "boxOffice", menuDesc: "Highest Box Office", description: "Choose the movie with the higher box office." }
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

//This function begins the game when the player pushes the start button TODO: HTML call
$("#start-button").on("click", startGame);
function startGame() {
    //This sets the currentMovieArray to the player's choice
    var movieChoice = $("#movieSetMenu option:selected").val();
    var movieChoiceObject = allMovieSets[movieChoice];
    currentMovieArray = movieChoiceObject;
    if (!currentMovieArray) {
        currentMovieArray = movieNames
        console.log("set movie array to default movieNames array in MovieNames.js")
    };
    currentMovieArray = movieNames;
    console.log("Current move array is: ")
    console.log(currentMovieArray)

    //This sets the parameter to the player's choice
    var paraChoice = $("#parameterMenu option:selected").val();
    console.log("paraChoice: " + paraChoice);
    winningCreteria = allParameters[paraChoice];
    //This promise waits for selectMovies to finish, or maybe it does nothing
    return new Promise(function(resolve, reject) {
    selectMovies();
    //This deletes the start button once it has been pressed
    $("#start-button").remove();

    $("#startScreenContainer").attr("style", "display: none");
    $("#game-container").attr("style", "display: inline");

    // selectMovies();
    // displayMovies();
    resolve()
    })
}

//This function pushes the current movies as an object into the past movies array
function storepastMovies() {
    var newEntry = {
        movieA: currentMovieA.title,
        movieB: currentMovieB.title
    };
    pastMovies.push(newEntry);
};

//Returns true for a repeat, false for a new set
function checkRepeats() {
//     if ((!currentMovieA) || (!currentMovieB)){
//     console.log("one or more movies in not defined for check repeats function") 
//     return;
// }
//     repeatObj = {
//         movieA: currentMovieA.title,
//         movieB: currentMovieB.title

//     };
//     repeatObjInverse = {
//         movieA: currentMovieB.title,
//         movieB: currentMovieA.title
//     };
//     //If the current movie, or a variation of the current movies placement is already in the pastMovies array, then checkRepeats is true
//     if ((pastMovies.includes(repeatObj)) || (pastMovies.includes(repeatObjInverse))) { //im not sure if this code is going to work
//         return true;
//     }
//     else {
//         return false;
//     }
};

// A function that adds the current score as a high score
var addHighScore = function () {
    currentNameValue = $("#highscore-form").val();
    var newScore = {
        name: "",
        playerScore: score
    };
    //do not allow scores of 0 to be entered into the highscore list, instead alert out that they lost
    if (playerScore > 0) {
        newScore.name = currentNameValue;
        //if there is no name, set the name to anonymous
        if ((newScore.name = "") || !newScore.name) {
            highScoreList.push(newScore)
        };
    }
}
//A function to save our highscore list to local storage
function saveToLocalStorage() {
    var highScoreListStr = JSON.stringify(highScoreList);
    localStorage.setItem("movieFighterHighScoreList", highScoreListStr);
};

//A variable to determine whether or not a special scenerio of ties/draws is encountered
var isDraw = false;

//The user makes a choice between movie A and movie B
var userChoice;
//The winner between A and B is a result of comparing their winningCreteria
var winner;

function determineWinner() {
    var winningCreteriaName = winningCreteria.name;
    if (currentMovieA[winningCreteriaName] > currentMovieB[winningCreteriaName]) {
        console.log("log: movieA wins")
        winner = currentMovieA;
    }
    else if (currentMovieA[winningCreteriaName] < currentMovieB[winningCreteriaName]) {
        console.log("log: movieA losses")
        winner = currentMovieB;
    }
    else if (currentMovieA[winningCreteriaName] === currentMovieB[winningCreteriaName]) {
        console.log("log: movies are tied")
        isDraw = true;
    }
    else {
        console.log("log: no winner was successfully declared")
    }
}

//Comparing userChoice to the actual winner
var winOrLose = function () {
    //Calling the determineWinner function since it should always be called before the winOrLose function anyway
    determineWinner();
    //If the user correctly choses the winner, OR a draw is encountered, the game goes on

    if ((userChoice === winner) || (isDraw)) {
        score++;
        //Stores the past movies to avoid repeats
        storepastMovies();
        //Pick 2 new movies
        selectMovies();
        //Render the new movies onto the screen after a brief delay
        // setTimeout(displayMovies(), 250)
    }
    else {
        endGame(false); //Player loses the game for an incorrect answer
    }

};

//This function sets currentMovieA and currentMovieB to two new valid choices from the array
function selectMovies() {
    console.log('select movies')
    // var validPair = false;
    // while (!validPair) {
        //Gets two movie names at random from the currentMovieArray
        console.log(currentMovieArray)
        var movieAIndex = Math.floor(Math.random() * currentMovieArray.length);
        currentMovieA = currentMovieArray[movieAIndex];
        var movieBIndex = Math.floor(Math.random() * currentMovieArray.length);
        currentMovieB = currentMovieArray[movieBIndex];
        
        // //Populates the current movies with their API data, transforming just a string into an object with different properties
        var promiseA = GetMovieData(currentMovieA) //a promise {ajax} function that returns a movie object
        var promiseB = GetMovieData(currentMovieB) //same function as before, but a different name
        var promiseAr = GetReview(currentMovieA)
        var promiseBr = GetReview(currentMovieB)
        Promise.all([promiseA, promiseB, promiseAr, promiseBr]).then(function(PromiseVortexArray) { //Waits for both promises to complete before returning an array of return values
            console.log(PromiseVortexArray)
            currentMovieAObj = PromiseVortexArray[0]; //assigns the first return value to an object
            currentMovieBObj = PromiseVortexArray[1]; //assigns the second return value to a different object
            currentMovieAObj.review = PromiseVortexArray[2];
            currentMovieBObj.review = PromiseVortexArray[3];
            // if (currentMovieAObj === currentMovieBObj || checkRepeats()) {
            //     validPair = false;
            //     if (checkForEnd()) {
            //         endGame(true);
            //         return;
            //     }
            // }
            // else {
            //     validPair = true;
            // }
            console.log("Movie A: ")
            console.log(currentMovieAObj)
            console.log("Movie B: ")
            console.log(currentMovieBObj)
            displayMovies();
        })


    // }  

    
}

//This function sets the HTML elements to display summaries and images for the movies
//TODO: HTML call
function displayMovies() {
    console.log("start of display movies function")
    console.log(currentMovieAObj)
    if ((!currentMovieAObj.title) || (!currentMovieBObj.title)){
        console.log("display movies returned early")
        return;}
    $("#button-A").text(currentMovieAObj.title);
    $("#button-B").text(currentMovieBObj.title);

    $(".movieAReview").text(currentMovieAObj.review);
    $(".movieBReview").text(currentMovieBObj.review);
    //TODO: Code for pop up - if needed

    var movieAImage = $("#movAImg");
    var movieBImage = $("#movBImg");
    movieAImage.attr("src", currentMovieAObj.posterRef);
    movieBImage.attr("src", currentMovieBObj.posterRef);
    movieAImage.attr("alt", currentMovieAObj.title);
    movieBImage.attr("alt", currentMovieBObj.title);
    console.log("end of display movies function")
    $("#movASnip").text(currentMovieAObj.review)
    $("#movBSnip").text(currentMovieBObj.review)
}

//This function will return true if there are no remaining combinations
function checkForEnd() {
    //This if statement may casue infinite loading screen hang
    if (pastMovies.length >= (currentMovieArray.length * currentMovieArray.length - 1)) {
        return true;
    }
    else {
        return false;
     }
}

//This function ends the game: The parameter determines if they got a wrong answer (false), or completed all pairs (true)
function endGame(victory) {
    $("#game-container").attr("style", "display: hidden")
    $("#endPage").attr("style", "display: inline")
    "give feedback that yells GAME OVER"
    //Add the final score to the highscore list
    addHighScore();
    //Save the highscore list to local storage
    saveToLocalStorage();
    //Display the Highscores onto the page
    $("#game-container").attr("style","display: none");
    $("#end-container").attr("style","display: in-line");

}

//A function that clear the main image/moive section if ever needed
var clearInfo = function () {
    $("#movie-images").html = "";
    $("#movie-info").html = "";
};

//A function that clears the highscores display div
var clearHighScoresDisplay = function () {
    if ($("#DisplayHighScores")) {
        $("#DisplayHighScores").textContent = "";
    };
};

//This function displays the current high scores list
displayHighScores = function () {
    //This deals with the positioning of the list
    //Clears the movie cards to make way for a highscore list
    clearInfo();
    //Clears the highscore list if it exists to make way for new highscores
    clearHighScoresDisplay();

    //This deals with the creation of the actual highscore display section
    displayHighScoresEl = $("<div>");
    displayHighScoresEl.attr("id", "DisplayHighScores")
    $("#highscore-form").append(displayHighScoresEl)

    //This deal with the creation of the list
    //loops through the HighScores array and create a new listitem for every entry
    for (i = 0; i < highScoreList.length; i++) {
        var listitem = $("<li>");
        listitem.text(highScoreList[i].name + " : " + highScoreList[i].playerScore + " points");
        $("#DisplayHighScores").append(listitem);
    }
};

//If the highscores button is clicked then then it triggers the display Highscores function
$("#highscore-button").on("click", displayHighScores());

//On clicking an image, that image becomes  userChoice and it calls the winOrlose function to see if the userChoice was correct
//TODO: HTML call to a tag on both the images
$("#button-A").on("click", function () {
    determinePlayerChoice(true);
});

$("#button-B").on("click", function ()
{
    determinePlayerChoice(false);
});

$("#movAImg").on("click",function()
{
    determinePlayerChoice(true);
});

$("#movBImg").on("click",function()
{
    determinePlayerChoice(true);
});

function determinePlayerChoice(choiceA)
{
    if(choiceA)
    {
        userChoice = currentMovieAObj;
    }
    else
    {
        userChoice = currentMovieBObj;
    }
    winOrLose();
}


// //Animates the start button to move every half second in a random direction
var movingStartMenu = function () {
    var startSection = $("#start-button");
    startSection.attr("style", "position:absolute")
    startSection.animate({ left: "-=100px" }, "fast");
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

$("#go-home").on("click", function refreshPage(){
    window.location.reload();
} ); 

//Below is for testing
highScoreList = [
    {
        name: "Ethan",
        playerScore: 91
    },
    {
        name: "Jane",
        playerScore: 3
    },
    {
        name: "Mozambique",
        playerScore: 15
    }
];
