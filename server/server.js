'usestrict';

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var AppointmentController = require('./controllers/AppointmentController');
var BusinessController = require('./controllers/BusinessController');
var UserController = require('./controllers/UserController');
var app = express();
var FacebookStrategy = require('passport-facebook').Strategy;






app.use(express.static('../public'));
app.use(bodyParser.json());
app.use(cors());
app.use(session({
  secret:'myNameIsTravis',
  saveUninitialized:true,
  resave:true
}));
app.use(passport.initialize());
app.use(passport.session());


var isAuthed = function(req, res, next){
  if(!req.isAuthenticated()) {return res.sendStatus(401);}
  return next();
};

// passport.use(new FacebookStrategy({
//  clientID: gitignore.clientID,
//  clientSecret: gitignore.clientSecret,
//  callbackURL: '/auth/facebook/callback',
//  profileFields : ['id', 'displayName', 'emails', 'photos']
// },function(request, accessToken, refreshToken, profile, done) {
//    console.log('***** fb profile: ', profile);
//    User.findOne({facebookId: profile.id}, function(findErr, foundUser){
//        if (findErr) {
//            console.log('cannot find user in db: ', findErr)
//            return done(findErr, false);
//        }
//        if (!foundUser) {
//            console.log('going to create new user');
//            var newUser = {
//                displayName: profile.displayName, //or whatever facebook/google/twitter/etc calls it on the profile object
//                // email: profile.emails[0].value, //or wherever facebook puts in on prifle
//                facebookId: profile.id, //or wherever on facebook profile
//                contests: [],
//                photo: profile.photos[0].value
//            }
//            User.create(newUser, function(createErr, createdUser){
//                console.log('newUser: ' + createdUser);
//                if (createErr) return done(createErr, null);
//                return done(null, createdUser);
//            })
//        } else {
//               return done(null, foundUser);
//               console.log(foundUser);
//        }
//    })

//  }
// ));
// app.get('/auth/facebook', passport.authenticate('facebook'));
// app.get('/auth/facebook/callback', passport.authenticate('facebook', {
//  successRedirect: '/#/dash',
//  failureRedirect: '/#/landing'
// }), function(req, res) {
//  console.log(req.session);
// });
// app.get('/auth/logout', function(req, res){
//  req.logout();
//  res.redirect('/');
// });

// passport.serializeUser(function(user, done) {
//  done(null, user);
// });

// passport.deserializeUser(function(obj, done) {
//  done(null, obj);
// });

app.post('/user', UserController.register);
app.get('/user', UserController.me);
app.put('/user', isAuthed, UserController.update);
app.post('/login', passport.authenticate('local', {
  successRedirect:'/home'
}));
app.get('/logout', function(req, res){
  req.logout();
  req.session.destroy(function(err){
    res.redirect('/');
  });
});

app.post('/appointment', AppointmentController.create);
app.get('/appointments', AppointmentController.read);
app.put('/appointment/:id', AppointmentController.update);
app.delete('appointment/:id', AppointmentController.delete);
app.get('/appointment/:id', AppointmentController.find);
app.get('/appointments/user/:id', AppointmentController.userFind);
app.get('/appointments/business/:id', AppointmentController.businessFind);

app.get('/businesses', BusinessController.read);
app.get('/businesses/:id', BusinessController.readByID);
app.post('/businesses', BusinessController.create);
app.put('/businesses/:id', BusinessController.edit);
// app.put('/businesses/:id', BusinessController.update);
// app.put('/businesses/:id', BusinessController.update);
app.delete('/businesses/:id', BusinessController.delete);

app.post('/business', BusinessController.register);
app.get('/business', BusinessController.me);
app.put('/business', isAuthed, BusinessController.update);
app.post('/loginBusiness', passport.authenticate('local', {
  successRedirect:'/businessScheduleTmpl'
}));
app.get('/logout', function(req, res){
  req.logout();
  req.session.destroy(function(err){
    res.redirect('/');
  });
});

var mongoURI = 'mongodb://localhost:27017/openChair';

mongoose.set('debug', true);
mongoose.connect(mongoURI);
mongoose.connection.once('open', function() {
  console.log("connected to mongoDB at: ", mongoURI);
});

var port = 7200;

app.listen(port, function() {
  console.log('listening on port ', port);
});
