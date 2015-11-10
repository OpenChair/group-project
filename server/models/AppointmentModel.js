var Mongoose = require('mongoose');
var schema = new Mongoose.Schema({
	user:{type:Mongoose.Schema.Types.ObjectId, ref:'User'},
	business: {type: Mongoose.Schema.Types.ObjectId, ref:'Business'},
	price: {type: Number},
	promotion:{type:String},
	startTime:{type:Date},
	timePeriod:{type:Date},
	service:{type:String},
	note:{type:String}
});
module.exports = Mongoose.model('Appointment', schema);
