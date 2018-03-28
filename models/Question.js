// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var QuestionSchema = new Schema({
    QuestionText : String,
    Type:String,
    Survey :[
        {type: Schema.Types.ObjectId, ref: 'Survey'}
    ]
});

// the schema is useless so far
// we need to create a model using it
var Question = mongoose.model('Question', QuestionSchema);

// make this available to our Questions in our Node applications
module.exports = Question;