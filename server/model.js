var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var User = new Schema({
    email:      { type: String },
    firstName:  { type: String },
    lastName:   { type: String },
    address:    { type: String }
});

module.exports = {
    User: mongoose.model('User', User)
};