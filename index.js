// express
var express = require('express');
var cons = require('consolidate');  
var app = express();

// express middleware
var bodyParser = require('body-parser');

// express settings
app.engine('html', cons.liquid);

app.set('views', './views');
app.set('view engine', 'html');

// express middleware
app.use(bodyParser.urlencoded({extended: true}));

// include routes
var routes = require('./routes/movies');
app.use(routes);


app.listen(8081, function(){
	console.log('Server running on http://127.0.0.1:8081');
});
