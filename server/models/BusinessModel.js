var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var Business = new mongoose.Schema({
  businessName: {type:String},
  category: {type:String},
  address:{
    street:{type:String},
    suite:{type:String},
    city:{type:String},
    state:{type:String},
    zip:{type:Number}
  },
  location: [{type: Number}],
  phone:{type:Number},
  email: { type: String, unique: true},
  password: {type: String},
  logo:{type:String},
  yelpReviews:{type:String},
  services:[
	  {
		  name:{type:String},
		  duration:{type:Number},
		  price:{type:Number}
	  }
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
  // user:[{
  //   email:{type:String},
  //   name:{
  //       first:{type:String},
  //       last:{type:String},
  //   },
  //   password:{type:String},
  //   highLevelPrivilages:{type:Boolean},

  // }],



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
