var APIkey = "33d9d97b";
var APInyt = "OnEXdchBuVPylzn2CiDtaSQLK1ih5pMU";

//Takes in a movie title and returns an object with various data pertaining to it. All all numbers, except for posterRef, which is an SRC
//title: Movie's title. rating: IMDB rating (decimal). runtime: runtime in minutes. year: year of release. boxOffice: box office in USD
//posterRef: SRC code for the film's poster
function GetMovieData(name)
{
    return new Promise(function(resolve, reject) {
        $.ajax({
            url: "http://www.omdbapi.com/?apikey=" + APIkey + "&t=" + name,
            method: "GET"
        }).then(function(data)
        {
            console.log("this is the data:");
            console.log(data);
            var movieObject ={
                title: data.Title,
                rating: data.imdbRating,
                runtime: data.Runtime,
                year: data.Released,
                boxOffice: data.BoxOffice,
                posterRef: null,
                review: null
            };
            
            if (movieObject.runetime){
            movieObject.runtime = movieObject.runtime.replace("min","");
            movieObject.runtime = movieObject.runtime.trim();
            }
            
            if (movieObject.releaseYear){
            var releaseYear = movieObject.year;
            movieObject.year = releaseYear.slice(releaseYear.length-4,releaseYear.length);
            }
    
            if (movieObject.boxOffice){
            movieObject.boxOffice = movieObject.boxOffice.replace("$","");
            movieObject.boxOffice = movieObject.boxOffice.replace(/,/g,"");
            }


            if (data.imdbID){
            var movieID = data.imdbID;
            movieObject.posterRef = "http://img.omdbapi.com/?apikey=" + APIkey + "&i=" + movieID;
            }
    
            // var reviewOutput = GetReview(name);
            // if(reviewOutput !== -1)
            // {
            //     movieObject.review = reviewOutput;
            // }
    
            console.log("This is the movieObject");
            console.log(movieObject);
            resolve(movieObject);
        }); 
    })
    
    }
    
    // Takes in a movie name and returns a short summary of the NYT review of it. 
    // If it cannot find it, or NYT doesn't have a review summary, it returns -1
    // function GetReview(name)
    // {
    //     return new Promise(function(resolve, reject) {
    
    //     name = name.toLowerCase();
    //     name = name.replace("_"," ");
    //     name = name.replace(" ","+");
    //     var targetName;
    //     $.ajax({
    //         url: "https://api.nytimes.com/svc/movies/v2/reviews/search.json?query="+ name + "&api-key=" + APInyt,
    //         method: "GET"
    //     }).then(function (data) {
    //         console.log("this is the review data")
    //         console.log(data)
    //        var reviewArray = data.results;
    //        var targetMovieReview;
    //        for(var i = 0; i < reviewArray.length; i++)
    //        {
    //            targetName = reviewArray[i].display_title;
    //            targetName = targetName.toLowerCase();
    //            targetName = targetName.replace(" ","+");
    //            targetName = name.replace("_"," ");
    //            if(name === targetName)
    //            {
    //                targetMovieReview = reviewArray[i];
    //            }
    //        }
    //        if(targetMovieReview === null || name.summary_short==="")
    //        {
    //            return -1;
    //        }
    //        else
    //        {
    //            console.log(name.summary_short)
    //            resolve (name.summary_short);
    //        }
    //     });
    //     })
    // }

    function GetReview(name)
    {
    //     return new Promise(function(resolve, reject) {

    //     $.ajax({
    //         url: "https://api.nytimes.com/svc/movies/v2/reviews/search.json?query="+ name + "&api-key=" + APInyt,
    //         method: "GET"
    //     }).then(function (data) {
    //         console.log("this is the review data")
    //         console.log(data)
    //        var reviewArray = data.results;
    //         var movieReview = reviewArray[i].headline;
    //            console.log(movieReview)
    //            resolve (movieReview);
    //     });
    //     })
    }
