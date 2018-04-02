// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var surveySchema = new Schema({
  Name: 'string',
});
var ResponseSchema = new Schema({
  ResponseDate: Date,
  User: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  Surveys: 
  [
    {
    Name: String,
    RefId: String
   }
  ],
  Items: [{
    Question: [{
      type: Schema.Types.ObjectId,
      ref: 'Question'
    }],
    Survey: [{
      type: Schema.Types.ObjectId,
      ref: 'Survey'
    }],
    QuestionText: String,
    Value: Number
  }]
});

// the schema is useless so far
// we need to create a model using it
var Response = mongoose.model('Response', ResponseSchema);

// make this available to our Responses in our Node applications
module.exports = Response;