var path = require('path');

// express
var express = require('express');
var cons = require('consolidate');  
var app = express();

// passport
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


// express middleware
var bodyParser = require('body-parser');

// include mongoose
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/project-aardvark'); 

// express settings
app.engine('html', cons.liquid);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

// express middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(expressSession({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());


// include routes
var moviesRoutes = require('./routes/movies');
var usersRoutes = require('./routes/users');
var indexRoute = require('./routes/index');
app.use(moviesRoutes);
app.use(usersRoutes);
app.use(indexRoute);

// passport config
var User = require('./models/user');
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.listen(8081, function(){
	console.log('Server running on http://127.0.0.1:8081');
});
