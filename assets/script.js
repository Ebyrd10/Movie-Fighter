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
//The two variables below are how they wil actaully look in the code at the end of the day
// var currentMovieA;
// var currentMovieB;
//A past movie array that is pushed to after every round to make sure that the same two movies dont appear twice
var pastMovies = [
    { movieA: "", movieB: "" }
]
//This function stores pastMovies for the duration of the session so that the same 2 movies are not repeated twice in 1 game
var storepastMovies = function (){
    var newEntry = {};
    newEntry.movieA = currentMovieA.title;
    newEntry.movieB = currentMovieB.title;
    pastMovies.push(newEntry);
};
var checkRepeats = function () {
    repeatObj = {
        movieA: currentMovieA.title,
        movieB: currentMovieB.title

    };
    repeatObjInverse = {
        movieB: currentMovieB.title,
        movieA: currentMovieA.title
    };
    //If the current movie, or a variation of the current movies placement is already in the pastMovies array, then checkRepeats is true
    if ((pastMovies.includes(repeatObj)) || (pastMovies.includes(repeatObj))) { //im not sure if this code is going to work
        return true;
    }
    else {
        return false;
    }
};
//A score keeping variable
var score = 0;

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
    //If the user correctly choses the winner, the game goes on
    if ( (userChoice === winner) || (isDraw) ) {
        score++;
        storepastMovies();
        "Pick 2 new movies"
        // check for repeats, if false then pick 2 new movies, if true, then return early
        if (checkRepeats){
            return;
        }
        else {
        "render cards for the next round, - (This should still be handled by the img click eventlistner below) wait for userChoice then winOrLose again"
        }
    }
    else {
        "give feedback that yells GAME OVER"
        "save score to the list of highscores"
        "go to the highscore Screen"
    }

};

//On clicking an image, that image becomes  userChoice and it calls the winOrlose function to see if the userChoice was correct
$("img").on("click", function(){
    userChoice = "$(this).image"; //pseudocode, not real code
    winOrLose();
});