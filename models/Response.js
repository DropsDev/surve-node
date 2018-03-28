// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var ResponseSchema = new Schema({
    User:[
      {type: Schema.Types.ObjectId, ref: 'User'}
    ],
    Question:[
      {type: Schema.Types.ObjectId, ref: 'Question'}
    ], 
    Survey:[
      {type: Schema.Types.ObjectId, ref: 'Survey'}
    ],
    QuestionText:String,
    Value:Number,
    DateAdded :Date
});

// the schema is useless so far
// we need to create a model using it
var Response = mongoose.model('Response', ResponseSchema);

// make this available to our Responses in our Node applications
module.exports = Response;