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
    {titleA: "", titleB: ""}
]
//A score keeping variable
var currentScore = 0;