// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var SchoolSchema = new Schema({
  Name: String,
  LGA: String, 
  IsAdmin: Boolean,
  Location: String,
  Created_at: Date,
  Updated_at: Date,
});

// the schema is useless so far
// we need to create a model using it
var School = mongoose.model('School', SchoolSchema);

// make this available to our users in our Node applications
module.exports = School;