// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var GroupSchema = new Schema({
    Name:String
});

// the schema is useless so far
// we need to create a model using it
var Group = mongoose.model('Group', GroupSchema);

// make this available to our Groups in our Node applications
module.exports = Group;