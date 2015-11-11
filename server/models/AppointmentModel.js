var Mongoose = require('mongoose');
var schema = new Mongoose.Schema({
	user:{type:Mongoose.Schema.Types.ObjectId, ref:'User'},
	business: {type: Mongoose.Schema.Types.ObjectId, ref:'Business'},
	price: {type: Number},
	promotion:{type:String},
	start:{type:String},
	end:{type:String},
	title:{type:String},
	note:{type:String}
});
module.exports = Mongoose.model('Appointment', schema);
