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

//The two variables below are how they wil actaully look in the code at the end of the day
// var currentMovieA;
// var currentMovieB;
//A past movie array that is pushed to after every round to make sure that the same two movies dont appear twice
var pastMovies = [];
//This function stores pastMovies for the duration of the session so that the same 2 movies are not repeated twice in 1 game
var storepastMovies = function (){
    var newEntry = {
        movieA = currentMovieA.title,
        movieB = currentMovieB.title
    };
    pastMovies.push(newEntry);
};

//Returns true for a repeat, false for a new set
var checkRepeats = function () {
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
//A score keeping variable
var score = 0;
//An array of the numbers that keeps track of high scores
var highScoreList = [];
// A function that adds the current score as a high score
var addHighScore = function (){
    var newScore = {
        name :"",
        playerscore: score
    };
    //do not allow scores of 0 to be entered into the highscore list, instead alert out that they lost
    if (playerscore > 0){
        // newScore.name = prompt("Please enter your name"); //cant use alerts or prompts
        //if there is no name, set the name to anonymous
        if ((newScore.name = "") || !newScore.name){
        highScoreList.push(newScore)
        };
    }
}
//A function to save our highscore list to local storage
var saveToLocalStorage = function() {
    var highScoreListStr = JSON.stringify(highScoreList);
    localStorage.setItem("storedHighScoreList", highScoreListStr); 
  };

//A variable to determine whether or not a special scenerio of ties/draws is encountered
var isDraw = false;

//The user makes a choice between movie A and movie B
var userChoice = "";
//The winner between A and B is a result of comparing their winningCreteria
var winner = "";
// the winningCreteria must match one of the properites of the currentMovie objects, the default is the year of release
var winningCreteria = "year";
var determineWinner = function(){
    if (currentMovieA.winningCreteria > currentMovieB.winningCreteria){
        console.log("log: movieA wins")
        winner = currentMovieA;
    }
    else if (currentMovieA.winningCreteria < currentMovieB.winningCreteria){
        console.log("log: movieA losses")
        winner = currentMovieB;
    }
    else if (currentMovieA.winningCreteria === currentMovieB.winningCreteria){
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
    if ( (userChoice === winner) || (isDraw) ) {
        score++;
        storepastMovies();
        "Pick 2 new movies"
        // check for repeats, if false then pick 2 new movies, if true, then return early
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

//This function will return true if there are no remaining combinations
function checkForEnd() 
{
    if(pastMovies.length >= currentMovieArray.length-1)
    {
        return true;
    }
    else
    {
        return false;
    }
}

//This function ends the game: The parameter determines if they got a wrong answer (false), or completed all pairs(true)
function endGame(victory) 
{
    "give feedback that yells GAME OVER"
     //Add the final score to the highscore list
     addHighScore();
     //Save the highscore list to local storage
     saveToLocalStorage();
     //Display the Highscores onto the page
     "go to the highscore Screen"
  
}
//This function displays the current high scores list
displayHighScores = function(){
    //This deals with the positioning of the list
    //Clears the movie cards to make way for a highscore list
    document.getElementById("movieCardA").html="";
    document.getElementById("movieCardB").html="";
    //Clears the highscore list if it exists to make way for new highscores
    document.getElementById("DisplayHighScores").textContent="";

    //This deal with the creation of the list
    //loops through the HighScores array and create a new listitem for every entry
    for (i= 0; i < highScoreList.length; i++){
        var listitem = document.createElement("li");
        listitem.textContent = highScoreList[i].name + " : " + highScoreList[i].score;
        document.getElementById("DisplayHighScores").appendChild(listitem);
    }
    };




//On clicking an image, that image becomes  userChoice and it calls the winOrlose function to see if the userChoice was correct
$("img").on("click", function(){
    userChoice = "$(this).image"; //pseudocode, not real code
    winOrLose();
});