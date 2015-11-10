var http = require('http');
var dispatch = require('dispatch');


var server = http.createServer(
							 dispatch({
							 	'/' : function(request, response){
							 					console.log('Visiting %s', request.url);
							 					response.end('This is the root');
										 	},
							 	'/movies' : function(request, response){
							 					console.log('Visiting %s', request.url);
							 					response.end('This is the movies path');
										 	},
							 	'/actors' : function(request, response){
							 					console.log('Visiting %s', request.url);
							 					response.end('This is the actors path');
										 	}											 								 
								})
						 );

server.listen(8081, function(){
	console.log('Server running on 127.0.0.1:8081');
});
