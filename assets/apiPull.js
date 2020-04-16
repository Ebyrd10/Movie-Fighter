var APIkey = "33d9d97b";

function GetMovieData(name)
{
    $.ajax({
        url: "http://www.omdbapi.com/?apikey=" + APIkey + "&t=" + name,
        method: "GET"
    }).then(function(data)
    {
        console.log(data);
        var movieObject ={
            title: data.Title,
            rating: data.imdbRating,
            runtime: data.Runtime,
            year: data.Released,
            boxOffice: data.BoxOffice,
            posterRef: null
        };

        movieObject.runtime = movieObject.runtime.replace("min","");
        movieObject.runtime = movieObject.runtime.trim();

        var releaseYear = movieObject.year;
        movieObject.year = releaseYear.slice(releaseYear.length-4,releaseYear.length);

        movieObject.boxOffice = movieObject.boxOffice.replace("$","");
        movieObject.boxOffice = movieObject.boxOffice.replace(/,/g,"");

        var movieID = data.imdbID;
        movieObject.posterRef = "http://img.omdbapi.com/?apikey=" + APIkey + "&i=" + movieID;

        console.log(movieObject);
        return(movieObject);
    });
}
