
var mongoose = require('mongoose');
var Q = require('q');
var User = mongoose.model('User', require('../models/User.js'));
module.exports = {
   findOrCreate: function(profile){
   var def = Q.defer();
   var query = [];
   var update = {};
   if (profile.provider === 'facebook') {
     query.push({'facebookId': profile.id});
     update.facebookId = profile.id;
     query.push({'displayName': profile.displayName});
     update.displayName = profile.displayName;
     query.push({'photo': profile.photos[0].value});
     update.photo = profile.photos[0].value;
     query.push({'email': profile.email});
     update.email = profile.email;
   }
  }
};
