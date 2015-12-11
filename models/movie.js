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
module.exports = mongoose.model('Movie', movieSchema);

