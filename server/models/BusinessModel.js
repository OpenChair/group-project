var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var Business = new mongoose.Schema({
  businessName: {type:String, required:true},
  category: {type:String, require:true},
  address:{
    street:{type:String, required:true},
    suite:{type:String},
    city:{type:String, required:true},
    state:{type:String, required:true},
    zip:{type:Number, required:true}
  },
  location: [{type: Number}],
  phone:{type:Number, required:true},
  mainEmail: { type: String, unique: true, required:true },
  mainPassword: {type: String, required:true },
  logo:{type:String},
  yelpReviews:{type:String},
  services:[
	  {serviceType:{
		  name:{type:String},
		  time:{type:Number},
		  price:{type:Number}
	  }}
  ],
  scheduleParams:{
    sunday:{
      open:{type:Date},
      closed:{type:Date}
    },
    monday:{
      open:{type:Date},
      closed:{type:Date}
    },
    tuesday:{
      open:{type:Date},
      closed:{type:Date}
    },
    wednsday:{
      open:{type:Date},
      closed:{type:Date}
    },
    thursday:{
      open:{type:Date},
      closed:{type:Date}
    },
    friday:{
      open:{type:Date},
      closed:{type:Date}
    },
    saturday:{
      open:{type:Date},
      closed:{type:Date}
    },
  },
  user:[{
    email:{type:String},
    name:{
        first:{type:String},
        last:{type:String},
    },
    password:{type:String},
    highLevelPrivilages:{type:Boolean},

  }],



});

Business.pre('save', function(next) {
	var business = this;
	if (!business.isModified('password'))	return next();
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(business.password, salt);
  business.password = hash;
  return next(null, business);
});

Business.methods.verifyPassword = function(reqBodyPassword) {
  var business = this;
  return bcrypt.compareSync(reqBodyPassword, business.password);
};

module.exports = mongoose.model('Business', Business);
