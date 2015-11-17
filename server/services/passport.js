var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../models/UserModel');
var configAuth = require('./config');
var Business = require('../models/BusinessModel');

passport.serializeUser(function(user, done) {
  console.log('serialized');
  done(null, user._id);
});
passport.deserializeUser(function(_id, done) {
  User.findById(_id, function(err, user) {
    console.log('deserialize');
    done(err, user);
  });
});

passport.use('poople', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, function(email, password, done) {
  User.findOne({ email: email })
  .exec(function(err, user) {
    console.log('USER:', user);
    if(err) {
      console.log("Theres an error?");
      done(err);
    }
    if(!user) {
      console.log("No User");
      return done(null, false);
    }
    if(!user.verifyPassword(password)) {
      console.log("Wrong Password");
      return done(null, false);
    }
    else {
      console.log("I WORK!!!");
      return done(null, user);
    }
  });
}));


passport.use('biz', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, function(email, password, done) {
  Business.findOne({ email: email })
  .exec(function(err, business) {
    if(err) {
      console.log("Theres an error?");
      done(err);
    }
    if(!business) {
      console.log("No Business");
      return done(null, false);
    }
    if(business.verifyPassword(password)) {
      console.log("I WORK!!!");
      return done(null, business);
    }
    else {
      console.log("Im not sure?");
      return done(null, false);
    }
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
