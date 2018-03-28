// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var SurveySchema = new Schema({
  Name: {type:String,unique:true},
  Description: String,
  Instructions :String,
  Questions: [{ type: Schema.Types.ObjectId, ref: 'Question' }],
  Group :[{type: Schema.Types.ObjectId, ref: 'Group'} ],
});

// the schema is useless so far
// we need to create a model using it
var Survey = mongoose.model('Survey', SurveySchema);

// make this available to our Surveys in our Node applications
module.exports = Survey;

/*
 
Question on a scale of 1 - 10 How much infrastruture do you have;

On scale of one to 10 rate the following infrastructure, rememebr hefra checklist item

*/

