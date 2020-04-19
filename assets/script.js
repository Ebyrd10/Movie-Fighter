// Two variables to hold the movieObject data from the API functions
//These are dummy variables to help coding things without data
var currentMovieA = {
    title: "Ethan's Story",
    rating: "",
    runtime: "",
    year: "2011",
    boxOffice: "",
    posterRef: ""
};
var currentMovieB = {
    title: "Ethan's Story 2: The Retelling",
    rating: "",
    runtime: "",
    year: "2019",
    boxOffice: "",
    posterRef: ""
};

//This variable is the movie array in use. It should be set equal to a pre-made array at the beginning of the game.
var currentMovieArray = [];

// the winningCreteria must match one of the properites of the currentMovie objects
var winningCreteria;

//The two variables below are how they wil actaully look in the code at the end of the day
// var currentMovieA;
// var currentMovieB;

//A past movie array that is pushed to after every round to make sure that the same two movies dont appear twice
var pastMovies = [];

//This array stores the avilable parameters
var allParameters = [
    rating = {name: "rating", menuDesc: "Higher Rating", description: "Choose the higher rated movie."},
    runtime = {name: "runtime", menuDesc: "Longer runtime", description: "Choose the longer movie."},
    year = {name: "year", menuDesc: "Newer movie", description: "Choose the newer movie."},
    boxOffice = {name: "boxOffice", menuDesc: "Highest Box Office", description: "Choose the movie with the higher box office."}
];

//A score keeping variable
var score = 0;
//An array of the numbers that keeps track of high scores
var highScoreList = [];

//Inital behavior
var movieMenu = $(".movieSetMenu"); //TODO: Make this sync up with the HTML
for(var i = 0; i < MovieNames.allMovieSets.length; i++)
{
    var newOption = $("<option>");
    newOption.val(i);
    newOption.text(movieNames.allMovieSets[i].name);
    movieMenu.append(newOption);
}

var paraMenu = $(".parameterMenu"); //TODO: Make this sync up with the HTML
for(var i = 0; i < allParameters.length; i++)
{
    var newOption = $("<option>");
    newOption.val(i);
    newOption.text(allParameters[i].menuDesc);
    paraMenu.append(newOption);
}

//This function begins the game when the player pushes the start button TODO: HTML call
$(".startButton").on("click",startGame);
function startGame()
{
    //This sets the currentMovieArray to the player's choice
    var movieChoice = $(".movieSetMenu").val();
    var movieChoiceObject = MovieNames.allMovieSets[movieChoice];
    currentMovieArray = movieChoiceObject.array;

    //This sets the parameter to the player's choice
    var paraChoice = $(".parameterMenu").val();
    winningCreteria = allParameters[paraChoice];

    //TODO: Code for changing the screen

    selectMovies();
    displayMovies();
}

//This function pushes the current movies as an object into the past movies array
function storepastMovies(){
    var newEntry = {
        movieA = currentMovieA.title,
        movieB = currentMovieB.title
    };
    pastMovies.push(newEntry);
};

//Returns true for a repeat, false for a new set
function checkRepeats() {
    repeatObj = {
        movieA: currentMovieA.title,
        movieB: currentMovieB.title

    };
    repeatObjInverse = {
        movieA: currentMovieB.title,
        movieB: currentMovieA.title
    };
    //If the current movie, or a variation of the current movies placement is already in the pastMovies array, then checkRepeats is true
    if ((pastMovies.includes(repeatObj)) || (pastMovies.includes(repeatObjInverse))) { //im not sure if this code is going to work
        return true;
    }
    else {
        return false;
    }
};

// A function that adds the current score as a high score
function addHighScore(){
    highScoreList.push(score);
}
//A function to save our highscore list to local storage
function saveToLocalStorage() {
    var highScoreListStr = JSON.stringify(highScoreList);
    localStorage.setItem("storedHighScoreList", highScoreListStr); 
  };

//A variable to determine whether or not a special scenerio of ties/draws is encountered
var isDraw = false;

//The user makes a choice between movie A and movie B
var userChoice;
//The winner between A and B is a result of comparing their winningCreteria
var winner;

function determineWinner(){
    var winningCreteriaName = winningCreteria.name;
    if (currentMovieA[winningCreteriaName] > currentMovieB[winningCreteriaName]){
        console.log("log: movieA wins")
        winner = currentMovieA;
    }
    else if (currentMovieA[winningCreteriaName] < currentMovieB[winningCreteriaName]){
        console.log("log: movieA losses")
        winner = currentMovieB;
    }
    else if (currentMovieA[winningCreteriaName] === currentMovieB[winningCreteriaName]){
        console.log("log: movies are tied")
        isDraw = true;
    }
    else {
        console.log("log: no winner was successfully declared")
    }
}
    
//Comparing userChoice to the actual winner
function winOrLose() {
    //If the user correctly choses the winner, the game goes on
    if ( (userChoice === winner) || (isDraw) ) {
        score++;
        storepastMovies();
        //Pick 2 new movies
        selectMovies();
    }
    else {
        endGame(false); //Player loses the game for an incorrect answer
    }

};

//This function sets currentMovieA and currentMovieB to two new valid choices from the array
function selectMovies() 
{
    var validPair = false;
    while(!validPair)
    {
        var movieAIndex = Math.floor(Math.random()*currentMovieArray.length);
        currentMovieA = currentMovieArray[movieAIndex];
        var movieBIndex = Math.floor(Math.random()*currentMovieArray.length);
        currentMovieB = currentMovieArray[movieBIndex];
        if(currentMovieA === currentMovieB || checkRepeats())
        {
            validPair = false;
            if(checkForEnd())
            {
                endGame(true);
                return;
            }
        }
        else
        {
            validPair = true;
        }
    }
}

//This function sets the HTML elements to display summaries and images for the movies
function displayMovies()
{

}

//This function will return true if there are no remaining combinations
function checkForEnd() 
{
    if(pastMovies.length >= (currenMovieArray.length*currentMovieArray.length-1))
    {
        return true;
    }
    else
    {
        return false;
    }
}

//This function ends the game: The parameter determines if they got a wrong answer (false), or completed all pairs (true)
function endGame(victory) 
{
    "give feedback that yells GAME OVER"
     //Add the final score to the highscore list
     addHighScore();
     //Save the highscore list to local storage
     saveToLocalStorage();
     "go to the highscore Screen"
  
}

//On clicking an image, that image becomes  userChoice and it calls the winOrlose function to see if the userChoice was correct
//TODO: HTML call to a tag on both the images
$(".movieImage").on("click", function(){
    var userChoiceLetter = $(this).val(); //pseudocode, not real code TODO: Get a reference to the object's value: A or B
    if(userChoiceLetter === "A")
    {
        userChoice = currentMovieA;
    }
    else
    {
        userChoice = currentMovieB;
    }
    determineWinner();
    winOrLose();
});