var APIkey = "33d9d97b";
var APInyt = "OnEXdchBuVPylzn2CiDtaSQLK1ih5pMU";
var name;

//Takes in a movie title and returns an object with various data pertaining to it. All all numbers, except for posterRef, which is an SRC
//title: Movie's title. rating: IMDB rating (decimal). runtime: runtime in minutes. year: year of release. boxOffice: box office in USD
//posterRef: SRC code for the film's poster
function GetMoviePull(callback){
    $.ajax({
        url: "http://www.omdbapi.com/?apikey=" + APIkey + "&t=" + name,
        method: "GET",
        success: function(data){
            var movieObject ={
                title: data.Title,
                rating: data.imdbRating,
                runtime: data.Runtime,
                year: data.Released,
                boxOffice: data.BoxOffice,
                posterRef: null,
                review: null
            };
    
            movieObject.runtime = movieObject.runtime.replace("min","");
            movieObject.runtime = movieObject.runtime.trim();
    
            var releaseYear = movieObject.year;
            movieObject.year = releaseYear.slice(releaseYear.length-4,releaseYear.length);
    
            movieObject.boxOffice = movieObject.boxOffice.replace("$","");
            movieObject.boxOffice = movieObject.boxOffice.replace(/,/g,"");
    
            var movieID = data.imdbID;
            movieObject.posterRef = "http://img.omdbapi.com/?apikey=" + APIkey + "&i=" + movieID;
    
            var reviewOutput = GetReview(name);
            if(reviewOutput !== -1)
            {
                movieObject.review = reviewOutput;
            }
            else
            {
                movieObject.review = "";
            }
            callback(movieObject);
        }
    })
};


function GetMovieData(inputName)
{
    name = inputName;
    var movieObject;
    GetMoviePull(function(data) {
        movieObject = data;
    });
    return movieObject;
}

//Takes in a movie name and returns a short summary of the NYT review of it. 
//If it cannot find it, or NYT doesn't have a review summary, it returns -1
function GetReview(name)
{
    name = name.toLowerCase();
    name = name.replace("_"," ");
    name = name.replace(" ","+");

    $.ajax({
        url: "https://api.nytimes.com/svc/movies/v2/reviews/search.json?query="+ name + "&api-key=" + APInyt,
        method: "GET"
    }).then(function (data) {
       var reviewArray = data.results;
       var targetMovieReview;
       for(var i = 0; i < reviewArray.length; i++)
       {
           var targetName = reviewArray[i].display_title;
           targetName = targetName.toLowerCase();
           targetName = targetName.replace(" ","+");
           if(name === targetName)
           {
               targetMovieReview = reviewArray[i];
           }
       }
       if(targetMovieReview === null || targetMovieReview.summary_short==="")
       {
           return -1;
       }
       else
       {
           return targetMovieReview.summary_short;
       }
    });
}
