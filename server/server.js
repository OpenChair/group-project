'usestrict';

var express = require('express');
var bodyParser = require('body-parser');
// var cors = require('cors');
var mongoose = require('mongoose');
var session = require('express-session');
var passport = require('./services/passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var AppointmentController = require('./controllers/AppointmentController');
var BusinessController = require('./controllers/BusinessController');
var UserController = require('./controllers/UserController');
var config = require("./services/config");
var app = express();
var FacebookStrategy = require('passport-facebook').Strategy;
var config=require('./services/config');


app.use(express.static(__dirname + '/../public'));
app.use(bodyParser.json());
// app.use(cors());
app.use(session({
  secret:'myNameIsTravis',
  saveUninitialized:true,
  resave:true
}));
app.use(passport.initialize());
app.use(passport.session());


var isAuthed = function(req, res, next){
  console.log('jijdijd');
  if(!req.isAuthenticated()) {return res.sendStatus(401);}
  return next();
};

app.get('/auth/facebook', passport.authenticate('facebook', {scope:'email'}));
app.get('/auth/facebook/callback',
  passport.authenticate('facebook',{
    successRedirect:'/user',
    failureRedirect:'/'
  })
);

app.post('/user', UserController.register);
app.get('/user', UserController.me);
// app.put('/user', isAuthed, UserController.update);
app.post('/login', passport.authenticate('poople'), function(req, res) {
  req.session.user = req.user;
  res.redirect('/user');
});
app.get('/logout', function(req, res){
  req.logout();
  req.session.destroy(function(err){
    res.redirect('/');
  });
});



app.get('/user/:id', UserController.find);
app.put('/user/:id', UserController.update);

app.post('/appointment', AppointmentController.create);
app.get('/appointments', AppointmentController.read);
app.put('/appointment/:id', AppointmentController.update);
app.delete('/appointment/:id', AppointmentController.remove);
app.get('/appointment/:id', AppointmentController.find);
app.get('/appointments/user/:id', AppointmentController.userFind);
app.get('/appointments/business/:id', AppointmentController.businessFind);

app.get('/businesses', BusinessController.read);
app.get('/businesses/:id', BusinessController.readByID);
app.get('/businesses/:radius/:lat/:lon', BusinessController.findByLocation);
app.post('/businesses', BusinessController.create);
app.put('/businesses/:id', BusinessController.edit);
// app.put('/businesses/:id', BusinessController.update);
// app.put('/businesses/:id', BusinessController.update);
app.delete('/businesses/:id', BusinessController.delete);

app.post('/business', BusinessController.register);
app.get('/business', BusinessController.me);
app.put('/business', isAuthed, BusinessController.update);
app.post('/loginBusiness', passport.authenticate('biz'), function(req, res) {
  req.session.user = req.user;
  res.redirect('/user');
});

var mongoURI = config.MONGO_URI;

mongoose.set('debug', true);
mongoose.connect(mongoURI);
mongoose.connection.once('open', function() {
  console.log("connected to mongoDB at: ", mongoURI);
});

var port = config.PORT;

app.listen(port, function() {
  console.log('listening on port ', port);
});
