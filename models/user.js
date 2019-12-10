var mongoose = require('mongoose');

var schema = mongoose.Schema;

var userSchema = new schema({
	name : String,
	college: String,
	mobile: String,
	email: String
})

module.exports = mongoose.model("user",userSchema);