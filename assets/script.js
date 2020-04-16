// Two variables to hold the movieObject data from the API functions
var currentMovieA;
var currentMovieB;
//A past movie array that is pushed to after every round to make sure that the same two movies dont appear twice
var pastMovies = [
    {titleA: "", titleB: ""}
]
//A score keeping variable
var currentScore = 0;