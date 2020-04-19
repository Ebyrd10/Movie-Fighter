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


// the winningCreteria must match one of the properites of the currentMovie objects
var winningCreteria;

//The two variables below are how they wil actaully look in the code at the end of the day
// var currentMovieA;
// var currentMovieB;


//This variable is the movie array in use. It should be set equal to a pre-made array at the beginning of the game.
var currentMovieArray = [];

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
var init = function(){
//Creates the movie menu
var movieMenu = $(".movieSetMenu"); //TODO: Make this sync up with the HTML
for(var i = 0; i < MovieNames.allMovieSets.length; i++)
{
    var newOption = $("<option>");
    newOption.val(i);
    newOption.text(movieNames.allMovieSets[i].name);
    movieMenu.append(newOption);
}

//Creates an option selection for each parameter
var paraMenu = $(".parameterMenu"); //TODO: Make this sync up with the HTML
for(var i = 0; i < allParameters.length; i++)
{
    var newOption = $("<option>");
    newOption.val(i);
    newOption.text(allParameters[i].menuDesc);
    paraMenu.append(newOption);
}

//Loads the highscore list from local storage if it exists
if(localStorage.getItem("highScoreList") !== null)
{
    highScoreList = JSON.parse(localStorage.getItem("highScoreList"));
}

};//End of initialzing function 
//Calls the initializing function
init();

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

    //TODO: Code for changing the screen. Get the approach Jennel is using

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
var winOrLose = function () {
    //Calling the determineWinner function since it should always be called before the winOrLose function anyway
    determineWinner();
    //If the user correctly choses the winner, OR a draw is encountered, the game goes on

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
        //Gets two movie names at random from the currentMovieArray
        var movieAIndex = Math.floor(Math.random()*currentMovieArray.length);
        currentMovieA = currentMovieArray[movieAIndex];
        var movieBIndex = Math.floor(Math.random()*currentMovieArray.length);
        currentMovieB = currentMovieArray[movieBIndex];

        //Populates the current movies with their API data, transforming just a string into an object with different properties
        currentMovieA = GetMovieData(currentMovieA);  //May not be needed if william populated the movies somewhere else in the code
        currentMovieB = GetMovieData(currentMovieB);

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
     //Display the Highscores onto the page
     "go to the highscore Screen"
  
}


//This function displays the current high scores list
displayHighScores = function(){
    //This deals with the positioning of the list
    //Clears the movie cards to make way for a highscore list
    $("#movieCardA").html="";
    $("#movieCardB").html="";
    //Clears the highscore list if it exists to make way for new highscores
    if ($("#DisplayHighScores")){
    $("#DisplayHighScores").textContent="";
    };

    //This deals with the creation of the actual highscore display section
    displayHighScoresDiv = $("<div");
    displayHighScoresDiv.attr("id", "DisplayHighScores")
    $("container").append(displayHighScoresDiv)

    //This deal with the creation of the list
    //loops through the HighScores array and create a new listitem for every entry
    for (i= 0; i < highScoreList.length; i++){
        var listitem = $("<li>");
        listitem.textContent = highScoreList[i].name + " : " + highScoreList[i].score;
        $("#DisplayHighScores").append(listitem);
    }
    };

    //This function sets the HTML elements to display summaries and images for the movies
//TODO: HTML call
function displayMovies()
{
    $(".movieATitle").text(currentMovieA.title);
    $(".movieBTitle").text(currentMovieB.title);

    $(".movieAReview").text(currentMovieA.review);
    $(".movieBReview").text(currentMovieB.review);

    var movieAImage = $(".movieAImg");
    var movieBImage = $(".movieBImg");
    movieAImage.attr("src",currentMovieA.posterRef);
    movieBImage.attr("src",currentMovieB.posterRef);
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