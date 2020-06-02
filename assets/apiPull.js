var APIkey = "afb9f1f5";

//Takes in a movie title and returns an object with various data pertaining to it. All all numbers, except for posterRef, which is an SRC
//title: Movie's title. rating: IMDB rating (decimal). runtime: runtime in minutes. year: year of release. boxOffice: box office in USD
//posterRef: SRC code for the film's poster
function GetMovieData(name) {
  return new Promise(function (resolve, reject) {
    $.ajax({
      url: "https://www.omdbapi.com/?apikey=" + APIkey + "&t=" + name,
      method: "GET",
    }).then(function (data) {
      var movieObject = {
        title: data.Title,
        rating: data.imdbRating,
        runtime: data.Runtime,
        year: data.Released,
        boxOffice: data.BoxOffice,
        posterRef: null,
        review: null,
      };

      if (movieObject.runetime) {
        movieObject.runtime = movieObject.runtime.replace("min", "");
        movieObject.runtime = movieObject.runtime.trim();
      }

      if (movieObject.releaseYear) {
        var releaseYear = movieObject.year;
        movieObject.year = releaseYear.slice(
          releaseYear.length - 4,
          releaseYear.length
        );
      }

      if (movieObject.boxOffice) {
        movieObject.boxOffice = movieObject.boxOffice.replace("$", "");
        movieObject.boxOffice = movieObject.boxOffice.replace(/,/g, "");
      }

      if (data.imdbID) {
        var movieID = data.imdbID;
        movieObject.posterRef =
          "https://img.omdbapi.com/?apikey=" + APIkey + "&i=" + movieID;
      }

      resolve(movieObject);
    });
  });
}
