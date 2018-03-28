// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var UserSchema = new Schema({
  FirstName: String,
  OtherName: String,
  LastName: String,
  DisplayName: String,
  Password: String, 
  IsAdmin: Boolean,
  Location: String,
  Age : Number,
  EmailAddress : String,//{type:String,unique:true},
  Created_at: Date,
  Updated_at: Date,
  SchoolID :Number
});

// the schema is useless so far
// we need to create a model using it
var User = mongoose.model('User', UserSchema);

// make this available to our users in our Node applications
module.exports = User;