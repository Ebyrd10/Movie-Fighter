// Two objects containing all the info needed currently
var currentMovieA = 
     {
        title: "",
        imgURL: "",
        year: 0,
        ratting: 0, 
        runtime: 0 
    };
var currentMovieB = 
    {
       title: "",
       imgURL: "",
       year: 0,
       ratting: 0, 
       runtime: 0 
   };
//A past movie array that is pushed to after every round to make sure that the same two movies dont appear twice
var pastMovies = [
    {titleA: "", titleB: ""}
]
//A score keeping variable
var currentScore = 0;