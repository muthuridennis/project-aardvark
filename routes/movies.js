var express = require('express');
var router = express.Router();

var Movie = require('../models/movie');

router.route('/movies')
      .get(function(req, res){
      	Movie.find()
      			 .select('title year_of_release rating director')
      			 .exec(function(err, movies){
      								if (err) {
      									console.log(err);
      								}else{
      									res.render('movies/index', {"movies": movies, 'user': req.user});
      									// res.json(movies);
      								}
      							}
      				);
      })
      .post(function(req, res) {
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

router.route('/movies/new')
      .get(function(req, res){
        res.render('movies/new');
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

router.route('/movies/:id')
      .get(function(req, res) {
        movieId = req.params.id;

        // retrieve the movie from Mongodb
        Movie.findById(movieId, function (err, movie) {
          if (err) return console.log(err);
          res.render('movies/detail', {"movie": movie});
          // res.json(movie);
        });
      })
      .put(function(req, res) {
        updateMovie('PUT', req, res);
      })
      .delete(function(req, res) {
        deleteMovie('DELETE', req, res);
      });
      
router.route('/movies/:id/edit')
      .get(function(req, res){
        movieId = req.params.id;

        // retrieve the movie from Mongodb
        Movie.findById(movieId, function (err, movie) {
          if (err) return console.log(err);
          res.render('movies/edit', {"movie": movie});
          // res.json(movie);
        }); 
      })
      .post(function(req, res){
        updateMovie('POST', req, res);
      });

router.route('/movies/:id/delete')
      .get(function(req, res){
        deleteMovie('GET', req, res);
      });


module.exports = router;