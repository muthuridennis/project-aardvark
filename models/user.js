// include mongoose 
var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');


// define our schema
var userSchema = mongoose.Schema({
  username: String,
  password: String,
  email: String
})

// set plugin
userSchema.plugin(passportLocalMongoose)

// compile our model
module.exports = mongoose.model('User', userSchema);

