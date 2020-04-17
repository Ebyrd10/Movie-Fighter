// Two variables to hold the movieObject data from the API functions
//These are dummy variables to help coding things without data
var currentMovieA = {
    title: "",
    rating: "",
    runtime: "",
    year: "",
    boxOffice: "",
    posterRef: ""
};
var currentMovieB = {
    title: "",
    rating: "",
    runtime: "",
    year: "",
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

//A score keeping variable
var score = 0;

//The user makes a choice between movie A and movie B
var userChoice = "";
//The winner between A and B is a result of comparing their winningCreteria
var winner = "";
// the winningCreteria must match one of the properites of the currentMovie objects, the default is the year of release
var winningCreteria = "year";
var determineWinner = function(){
    if (currentMovieA.winningCreteria > currentMovieB.winningCreteria){
        winner = currentMovieA;
    }
    else if (currentMovieA.winningCreteria < currentMovieB.winningCreteria){
        winner = currentMovieB;
    }
    else {
        console.log("from line 43, no winner was successfully declared")
    }
}
    
//Comparing userChoice to the actual winner
var winOrLose = function () {
    //Calling the determineWinner function since it should always be called before the winOrLose function anyway
    determineWinner();
    //If the user correctly choses the winner, the game goes on
    if (userChoice === winner) {
        score++;
        storepastMovies();
        "Pick 2 new movies"
        "check for repeats, if yes then pick 2 new movies, if no, then return early"
        "render cards, - (This should still be handled by the img click eventlistner below) wait for userChoice then winOrLose again"
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