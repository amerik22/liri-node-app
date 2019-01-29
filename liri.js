require("dotenv").config();
var keys = require("./keys");
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

var search = process.argv[2];
var term = process.argv.slice(3).join(" ");

function liriSearch(search, term){
    if (search === "concert-this"){
        concertThis(term);
    }
    else if(search === "spotify-this-song"){
        spotifyThis(term);
    }
    else if(search === "movie-this"){
        movieThis(term);
    }
    else if(search === "do-what-it-says"){
        doThis();
    }

    else{"Please use available search term"};
}

liriSearch(search, term);

function concertThis(artist){
    var artist = term;
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
    axios.get(queryURL)
    .then(function(response){
        var response = response.data[0].venue;
        console.log("Artist: " + artist);
        console.log("Venue: " + response.name);
        console.log("Location: " + response.city + "," + response.region);
        console.log("Event Date: " + moment(response.datetime).format("MM/DD/YYYY"));
    });
}

function spotifyThis(song){
    var song = term;
    spotify
    .search({ type: 'track', query: song })
    .then(function(response) {
      console.log(response);
    })
    .catch(function(err) {
      console.log(err);
    });
}

function movieThis(movieTitle){
    var movieTitle = term;
    if(movieTitle === ""){
        movieTitle = "Mr. Nobody"
    }
    var queryURL = "http://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=short&apikey=trilogy"
    axios.get(queryURL)
    .then(function(response){
        var response = response.data;
        console.log("Title: " + response.Title);
        console.log("Release Year: " + response.Year);
        console.log("IMDB Rating: " + response.imdbRating);
        console.log("Rotten Tomatoes Rating: " + response.Ratings[1].Value);
        console.log("Produced in: " + response.Country);
        console.log("Language: " + response.Language);
        console.log("Plot: " + response.Plot);
        console.log("Starring: " + response.Actors);
    });
};

function doThis(){
    fs.readFile("random.txt", "utf8", function(error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
          return console.log(error);
        }
      
        // We will then print the contents of data
        console.log(data);
      
        // Then split it by commas (to make it more readable)
        var dataArr = data.split(",");
      
        // We will then re-display the content as an array for later use.
        console.log(dataArr);
      
      });
}

