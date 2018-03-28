// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var SurveyCategorySchema = new Schema({
    Name :{type: String, unique:true}
});

// the schema is useless so far
// we need to create a model using it
var SurveyCategory = mongoose.model('SurveyCategory', SurveyCategorySchema);

module.exports = SurveyCategory;