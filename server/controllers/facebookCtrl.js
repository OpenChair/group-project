var passport = require('passport-facebook')
var FacebookStrategy = require('passport-facebook')
var mongoose = require('mongoose');
var Q = require('q');
var User = mongoose.model('User', require('../models/UserModel.js'));


passport.use(new FacebookStrategy({
 clientID: gitignore.clientID,
 clientSecret: gitignore.clientSecret,
 callbackURL: '/auth/facebook/callback',
 profileFields : ['id', 'displayName', 'emails', 'photos']
},function(request, accessToken, refreshToken, profile, done) {
   console.log('***** fb profile: ', profile);
   User.findOne({facebookId: profile.id}, function(findErr, foundUser){
       if (findErr) {
           console.log('cannot find user in db: ', findErr)
           return done(findErr, false);
       }
       if (!foundUser) {
           console.log('going to create new user');
           var newUser = {
               displayName: profile.displayName, //or whatever facebook/google/twitter/etc calls it on the profile object
               // email: profile.emails[0].value, //or wherever facebook puts in on prifle
               facebookId: profile.id, //or wherever on facebook profile
               contests: [],
               photo: profile.photos[0].value
           }
           User.create(newUser, function(createErr, createdUser){
               console.log('newUser: ' + createdUser);
               if (createErr) return done(createErr, null);
               return done(null, createdUser);
           })
       } else {
              return done(null, foundUser);
              console.log(foundUser);
       }
   })

 }
));
app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback', passport.authenticate('facebook', {
 successRedirect: '/#/dash',
 failureRedirect: '/#/landing'
}), function(req, res) {
 console.log(req.session);
});
app.get('/auth/logout', function(req, res){
 req.logout();
 res.redirect('/');
});


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
