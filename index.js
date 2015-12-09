// express
var express = require('express');
var cons = require('consolidate');  
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
	rating: {type: Number, default: 0, min: 0, max: 10},
	director: String
})

// compile our model
var Movie = mongoose.model('Movie', movieSchema);

// express settings
app.engine('html', cons.liquid);

app.set('views', './views');
app.set('view engine', 'html');

// express middleware
app.use(bodyParser.urlencoded({extended: true}));

app.get('/movies', function(req, res){
	Movie.find()
			 .select('title year_of_release rating director')
			 .exec(function(err, movies){
								if (err) {
									console.log(err);
								}else{
									res.render('index', {"movies": movies});
									// res.json(movies);
								}
							}
				);
});

app.get('/movies/new', function(req, res){
	res.render('new');
});


app.post('/movies', function(req, res) {
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
		res.render('detail', {"movie": movie});
  	// res.json(movie);
  });
});

app.get('/movies/:id/edit', function(req, res){
  movieId = req.params.id;

  // retrieve the movie from Mongodb
  Movie.findById(movieId, function (err, movie) {
  	if (err) return console.log(err);
		res.render('edit', {"movie": movie});
  	// res.json(movie);
  });	
});



function updateMovie(method, req, res){
  movieId = req.params.id;

  userRating = req.body.rating;
  userTitle =  req.body.title;
  userYearOfRelease =  req.body.year_of_release;
  userDirector =  req.body.director;

  // retrieve the movie from Mongodb
  Movie.findById(movieId, function (err, movie) {
  	if (err) return console.log(err);

  	movie.rating = userRating;
  	movie.title = userTitle;
  	movie.year_of_release = userYearOfRelease;
  	movie.director = userDirector;
  	
  	movie.save(function(err, movie){
	  	if (err) return console.log(err);

  		if (method === 'PUT') {
  			res.json(movie);
  		} else{
	  		res.redirect('/movies/' + movie._id);
  		};
  	});
  });
}

app.post('/movies/:id/edit', function(req, res){
	updateMovie('POST', req, res);
});

app.put('/movies/:id', function(req, res) {
	updateMovie('PUT', req, res);
});

function deleteMovie(method, req, res){
  movieId = req.params.id;

  // retrieve the movie from Mongodb
  Movie.remove({_id: movieId}, function(err){
  	if (err) return console.log(err);
  	
  	if (method === 'GET') {
  		res.redirect('/movies');
  	} else{
	  	res.send('Movie was deleted');
  	};
  });	
}

app.get('/movies/:id/delete', function(req, res){
	deleteMovie('GET', req, res);
});

app.delete('/movies/:id', function(req, res) {
	deleteMovie('DELETE', req, res);
});

app.listen(8081, function(){
	console.log('Server running on http://127.0.0.1:8081');
});
