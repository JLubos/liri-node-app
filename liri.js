
//Packages

var keys = require('./keys.js');
var Twitter = require('twitter');
var spotify = require('spotify');
var request = require('request');
var fs = require('fs');



// Get Tweets function
var getMyTweets =function(){

	var client = new Twitter(keys.twitterKeys);//<--

	var params = {screen_name: 'jay_solemn'};
	client.get('statuses/user_timeline', params, function(error, tweets, response){
		if(!error){ //Loop through tweets
			for(var i=0; i<tweets.length; i++){
			console.log(tweets[i].created_at);
			console.log(' ');
			console.log(tweets[i].text);

			}
		}
	});

}


var getArtistNames = function(artist){
	return artist.name;


}

var getMeSpotify = function(songName){

 
	spotify.search({ type: 'track', query: songName }, function(err, data) {
    	if ( err ) {
        	console.log('Error occurred: ' + err);
        	return;
    	}
 
    var songs = data.tracks.items;
    for (var i =0; i<songs.length; i++){ //Get song informatoin
    	console.log(i);
    	console.log("artist(s) " + songs[i].artists.map(getArtistNames));
    	console.log("song name: " + songs[i].name);
    	console.log("preview song: " + songs[i].preview.url);
    	console.log("album: " + songs[i].album.name);
    	console.log("---------------------------");


    	}

	});

}


//Get movie function

var getMeMovie = function(movieName){

	request('http://www.omdbapi.com/?t=' + movieName + '&y=&plot=short&r=json', function (error, response, body) {
  	if(!error && response.statusCode == 200){
  		var jsonData = JSON.parse(body);//<--
  		console.log('Title: ' + jsonData.Title);
  		console.log('Year: ' + jsonData.Year);
  		console.log('Rated: ' + jsonData.Rated);
  		console.log('IMDB Rating: ' + jsonData.imdbRating);
  		console.log('Country: ' + jsonData.Country);
  		console.log('Language: ' + jsonData.Language);
  		console.log('Plot: ' + jsonData.Plot);
  		console.log('Actors: ' + jsonData.Actors);
  		console.log('Rotten tomatoes rating: ' + jsonData.tomatoRating);
  		console.log('Rotten tomatoes URL: ' + jsonData.tomatoURL);

  		}
	});

}


//Read in our random text file
var doWhatItSays = function(){
	fs.readFile('random.txt', 'utf8', function(err,data){
		if(err) throw err;

		var dataArr = data.split(',');

		if(dataArr.length == 2){

			pick(dataArr[0], dataArr[1])
		} else if (dataArr.length ==1){
			pick(dataArr[0]);
		}


	});

}

//Get users Choice

var pick = function(caseData, functionData){
	switch(caseData){
		case 'my-tweets' :
			getMyTweets();
			break;
		case 'spotify-this-song':
			getMeSpotify(functionData);
			break;
		case 'movie-this':
			getMeMovie(functionData);
			break;
		case 'do-what-it-says':
			doWhatItSays();
		default:
		console.log("Liri doesnt care");
	}


}

//Take user argurments
var runThis = function(argOne, argTwo){
	pick(argOne, argTwo);
};

//"Run this" function
runThis(process.argv[2], process.argv[3]);