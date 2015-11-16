var Mongoose = require('mongoose');
var schema = new Mongoose.Schema({
	user:{type:Mongoose.Schema.Types.ObjectId, ref:'User'},
	business: {type: Mongoose.Schema.Types.ObjectId, ref:'Business'},
	customerName:{type:String},
	customerNumber:{type:Number},
	price: {type: Number},
	promotion:{type:String},
	start:{type:Date},
	end:{type:Date},
	title:{type:String},
	note:{type:String}
});
module.exports = Mongoose.model('Appointment', schema);
