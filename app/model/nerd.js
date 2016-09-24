var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var availableType = 'yes no'.split(' ');
var bluebird = require('bluebird');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/contact');

// define our nerd model
// module.exports allows us to pass this to other files when it is called
var minumanSchema = new Schema({
	brand : String, 
	size : {
		type : Number,
		default : 0,
		required : true
	},
	available: {
		type : String,
		enum: availableType, // 
		required : true
	},
	company : {
		type : Schema.ObjectId,
		ref : 'company'
	}
})

var companySchema = new Schema({
	name : String,
	address : String
})

var friendSchema = new Schema({
	name 	: String,
	birthday: {
		type : Date,
		format : "%Y-%m-%d"
	},
	address : String,
	email	: String,
	phone	: Number,
	created_at: {
		type: Date, default: Date.now
	},
    updated_at: {
    	type: Date, default: Date.now
    }
})

var userSchema = new Schema({
	email : String,
	password : String,
	created_at: {
		type: Date, 
		default: Date.now
	},
    updated_at: {
    	type: Date, 
    	default: Date.now
    }
})


exports.Minuman = mongoose.model('Minuman', minumanSchema)
exports.Company = mongoose.model('Company', companySchema)
exports.Friend = mongoose.model('Friend', friendSchema)
exports.User = mongoose.model('User', userSchema)


