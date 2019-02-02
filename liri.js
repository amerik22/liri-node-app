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
    if(song === ""){
        song = "The Sign"
    };
    spotify.search({ type: 'track', query: song })
    .then(function(response) {
        var response = response.tracks.items[0];
      console.log("Artist: " + response.album.artists[0].name);
      console.log("Song: " + response.name);
      console.log("Preview URL: " + response.preview_url);
      console.log("Album: " + response.album.name);
    })
    .catch(function(err) {
      console.log(err);
    });
}

function movieThis(movieTitle){
    var movieTitle = term;
    if(movieTitle === ""){
        movieTitle = "Mr. Nobody"
    };
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

        
        if (error) {
          return console.log(error);
        }
      
        
        console.log(data);
      
        
        var dataArr = data.split(",");
      
       
        console.log(dataArr);
      
      });
}

