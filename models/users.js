
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	ip:String,
	vote: String,
	image: String
});

module.exports = mongoose.model('users', userSchema);