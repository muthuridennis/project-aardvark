// express
var express = require('express');
var app = express();

// express middleware
var bodyParser = require('body-parser');


// include mongoose	
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/project-aardvark'); 

// define our schema
var movieSchema = mongoose.Schema({
	title: String,
	year_of_release: Number,
	rating: {type: Number, default: 0, min: 0, max: 10}
})

// compile our model
var Movie = mongoose.model('Movie', movieSchema);


app.use(bodyParser.urlencoded({extended: true}));

app.get('/movies', function(req, res){
	Movie.find(function(err, movies){
		if (err) {
			console.log(err);
		}else{
			res.json(movies);
		}
	});
});


app.post('/movies/new', function(req, res) {
	console.log(req.body);
	formData = req.body;

	var movie = new Movie(formData);
	movie.save(function(err, movie) {
		if (err) {
			console.log(err);
		} else { 
			console.log('Successfully saved the movie');
			res.redirect('/movies');
		}
	});
});


app.get('/movies/:id', function(req, res) {
  movieId = req.params.id;

  // retrieve the movie from Mongodb
  Movie.findById(movieId, function (err, movie) {
  	if (err) return console.log(err);

  	res.json(movie);
  });
});


app.put('/movies/:id', function(req, res) {
  movieId = req.params.id;
  userRating = req.body.rating; 

  // retrieve the movie from Mongodb
  Movie.findById(movieId, function (err, movie) {
  	if (err) return console.log(err);

  	movie.rating = userRating;
  	movie.save(function(err, movie){
	  	if (err) return console.log(err);

  		res.json(movie);
  	});
  });
});

app.delete('/movies/:id', function(req, res) {
  movieId = req.params.id;

  // retrieve the movie from Mongodb
  Movie.remove({_id: movieId}, function(err){
  	if (err) return console.log(err);
  	
  	res.send('Movie was deleted');
  });
});

app.listen(8081, function(){
	console.log('Server running on http://127.0.0.1:8081');
});
