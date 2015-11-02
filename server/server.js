'usestrict';

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var AppointmentController = require('./controllers/AppointmentController');
var BusinessController = require('./controllers/BusinessController');
var UserController = require('./controllers/UserController');
var app = express();

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
app.get('/appointment', AppointmentController.read);
app.put('/appointment', AppointmentController.update);
app.delete('appointment/:id', AppointmentController.delete);

app.post('/business', BusinessController.register);
app.get('/business', BusinessController.me);
app.put('/business', isAuthed, BusinessController.update);
app.post('/business', passport.authenticate('local', {
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
