var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../models/UserModel');
var configAuth = require('./config');
var Business = require('../models/BusinessModel');

passport.serializeUser(function(user, done) {
  console.log('serialized')
  done(null, user._id);
});
passport.deserializeUser(function(_id, done) {
  User.findById(_id, function(err, user) {
    done(err, user);
  });
});

passport.use('poople', new LocalStrategy({
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


passport.use( 'biz', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, function(email, password, done) {
  Business.findOne({ email: email })
  .exec(function(err, business) {
    if(err) {
      console.log(12121212, err);
      done(err);
    }
    if(!business) return done(null, false);
    if(business.verifyPassword(password)) return done(null, business);
    return done(null, false);
  });
}));

passport.use(new FacebookStrategy({
  clientID     : configAuth.facebookAuth.clientID,
  clientSecret : configAuth.facebookAuth.clientSecret,
  callbackUrl  : configAuth.facebookAuth.callbackURL
},

function(token, refreshToken, profile, done){
  process.nextTick(function(){
    User.findOne({'facebook.id' : profile.id}, function(err, user) {
      if (err){return done(err);}
      if(user){return done(null, user);}
      else{
        var newUser = new User();

        newUser.facbook.id     = profile.id;
        newUser.facebook.token = token;
        newUser.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName;
        newUser.facebook.email =profile.emails[0].value;
        newUser.save(function(err){
          if(err){throw err;}
          return done(null, newUser);
        });
      }
    });
  });
}));

module.exports = passport;
