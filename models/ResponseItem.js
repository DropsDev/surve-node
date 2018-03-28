// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var ResponseItemSchema = new Schema({
    Response:[
        {type: Schema.Types.ObjectId, ref: 'User'}
      ],
    Question:[
        {type: Schema.Types.ObjectId, ref: 'Question'}
      ],
    ResponseItemText : String
});

// the schema is useless so far
// we need to create a model using it
var ResponseItem = mongoose.model('ResponseItem', ResponseItemSchema);

// make this available to our ResponseItems in our Node applications
module.exports = ResponseItem;