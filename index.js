var http = require('http');
var dispatch = require('dispatch');
// include mongoose	
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/terrific-tuesday'); 

// create a schema 
var pizzaSchema = mongoose.Schema({
	name: String,
	price: Number,
	created_at: {type: Date, default: Date.now()}
});


// compile our model
var Pizza = mongoose.model('Pizza', pizzaSchema);


// using the model
var pizza = new Pizza({name: 'Vegetarian', price: 1000});

// create the document
pizza.save(function(err, pizza){
	if(err){
		return console.error('Your pizza was not saved: ', pizza);
	}
	console.log('Your pizza was successfully saved :)');
});


var server = http.createServer(
							 dispatch({
							 	'/' : function(request, response){
							 					message = {
							 						type: 'customer',
							 						text: 'Hi, how are you'
							 					};

							 					response.writeHead(200, {
							 						'Content-type': 'application/json',
							 						'Access-Control-Allow-Origin': 'http://127.0.0.1:9000'
							 					});

							 					response.end(JSON.stringify(message));
										 	}									 								 
								})
						 );

server.listen(8081, function(){
	console.log('Server running on 127.0.0.1:8081');
});
