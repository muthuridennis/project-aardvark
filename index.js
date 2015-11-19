var http = require('http');
var dispatch = require('dispatch');
var querystring = require('querystring');

// include mongoose	
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/project-aardvark'); 

// define our schema
var movieSchema = mongoose.Schema({
	name: String,
	year_of_release: Number
})

// compile our model
var Movie = mongoose.model('Movie', movieSchema);

var server = http.createServer(
							 dispatch({
							 	'/movies' : {
							 			'GET /' : function(request, response, next){
							 									movies = [
								 									{
								 										title: 'Constant Gardener',
								 										category: ['Drama', 'Mystery', 'Romance'],
								 										main_actors: [
								 													{
											 											first_name: 'Ralph',
											 											last_name: 'Fiennes' 
											 										},
											 										{
											 											first_name: 'Rachel',
											 											last_name: 'Weisz' 
											 										}
								 										]
								 									},
								 									{
								 										title: 'Last King of Scotland',
								 										category: ['Biography', 'Drama', 'History'],
								 										main_actors: [
								 													{
											 											first_name: 'James',
											 											last_name: 'McAvoy' 
											 										},
											 										{
											 											first_name: 'Forest',
											 											last_name: 'Whitaker' 
											 										}
								 										]
								 									},
								 									{
								 										title: 'Ray',
								 										category: ['Biography', 'Drama', 'Music'],
								 										main_actors: [
								 													{
											 											first_name: 'Jamie',
											 											last_name: 'Foxx' 
											 										},
											 										{
											 											first_name: 'Regina',
											 											last_name: 'King' 
											 										}
								 										]
								 									}
							 									]; 
							 									response.end(JSON.stringify(movies));
								 			},
								 			'POST /': function(request, response, next){
								 				// Get parameters from the form
								 				var formData;
								 				request.on('data', function(chunk){
								 					formData = querystring.parse(chunk.toString());
								 				});

								 				request.on('end', function(){
								 					console.log(formData);
									 				// Create an instance of a movie
									 				var movie = new Movie(
									 					{
									 						title: formData.title,
									 						year_of_release: formData.year_of_release
									 					}
									 				);
									 				
									 				// Save the movie instance
										 				// If successfull respond with the saved movie instance
								 					response.end();
								 				});


								 			}
								 	}						 								 
								})
						 );

server.listen(8081, function(){
	console.log('Server running on 127.0.0.1:8081');
});
