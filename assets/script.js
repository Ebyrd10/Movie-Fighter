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
var currentMovieA;
var currentMovieB;
//A past movie array that is pushed to after every round to make sure that the same two movies dont appear twice
var pastMovies = [
    { titleA: "", titleB: "" }
]
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
        "Pick 2 new movies, render cards, wait for userChoice then winOrLose again"
    }
    else {
        "GAME OVER"
    }

};

//On clicking an image, that image becomes  userChoice and it calls the winOrlose function to see if the userChoice was correct
$("img").on("click", function(){
    userChoice = "$(this).image"; //pseudocode, not real code
    winOrLose();
});