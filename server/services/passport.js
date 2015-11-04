var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy
var User = require('../models/UserModel');
var configAuth = require('config')

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, function(email, password, done) {
  User.findOne({ email: email })
  .exec(function(err, user) {
    if(err) done(err);
    if(!user) return done(null, false);
    if(user.verifyPassword(password)) return done(null, user);
    return done(null, false);
  });
}));

passport.use(new FacebookStrategy({
  clientID     : configAuth.facebookAuth.clientID,
  clientSecret : configAuth.facebookAuth.clientSecret,
  callbackUrl  : configAuth.facebook.Auth.callbackURL
},

function(token, refreshToken, profile, done){
  process.nextTick(function(){
    User.findOne({'facebook.id' : profile.id, function(err, user) {
      if (err){return done(err);}
      if(user){return done(null, user);}
      else{ 
        var newUser = new User()
        
        newUser.facbook.id     = profile.id;
        newUser.facebook.token = token;
        newUser.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName;
        newUser.facebook.email =profile.emails[0].value;
        newUser.save(function(err){
          if(err){throw err;}
          return done(null, newUser);
        })
        };
    }})
  })
}))


module.exports = function(passport){
  passport.serializeUser(function(user, done) {
    done(null, user._id);
  });
  passport.deserializeUser(function(_id, done) {
    User.findById(_id, function(err, user) {
      done(err, user);
    });
  });
}