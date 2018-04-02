// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var ResponseItemSchema = new Schema({
  Question: [{
    type: Schema.Types.ObjectId,
    ref: 'Question'
  }],
  Response: [{
    type: Schema.Types.ObjectId,
    ref: 'Response'
  }],
  Survey: [{
    type: Schema.Types.ObjectId,
    ref: 'Survey'
  }],
  QuestionText: String,
  Value: Number,
  DateAdded: Date
});

// the schema is useless so far
// we need to create a model using it
var ResponseItem = mongoose.model('ResponseItem', ResponseItemSchema);

// make this available to our ResponseItems in our Node applications
module.exports = ResponseItem;