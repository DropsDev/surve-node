// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var UserSchema = new Schema({
  OtherNames: String,
  LastName: String,
  UserName: String,
  DOB : String,

  Email :  {type:String,unique:true},
  Password: String, 

  LGA:String,
  State:String,
  School :String,
  Class :String,
  Created_at: Date,
  Updated_at: Date,
  IsAdmin: Boolean
});

// the schema is useless so far
// we need to create a model using it
var User = mongoose.model('User', UserSchema);

// make this available to our users in our Node applications
module.exports = User;