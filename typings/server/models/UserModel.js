var Mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var User = new Mongoose.Schema({
  name: {
    first:  {type:String},
    last: {type:String}
    },
  facebookId:{type:Number},
  photo:{type:String},
  displayName:{type:String},
  email: { type: String, unique: true, required:true },
  password: { type: String, required:true},
  phone:  {type:Number},
  address:  {
    street:{type:String},
    aptSuite:{type:String},
    city: {type:String},
    state:  {type:String},
    zip:  {type:String},
  },
  favorites: [{type: Mongoose.Schema.Types.ObjectId, ref:'Business'}]
});

User.pre('save', function(next) {
	var user = this;
	if (!user.isModified('password'))	return next();
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(user.password, salt);
  user.password = hash;
  return next(null, user);
});

User.methods.verifyPassword = function(reqBodyPassword) {
  var user = this;
  return bcrypt.compareSync(reqBodyPassword, user.password);
};

module.exports = Mongoose.model('User', User);
