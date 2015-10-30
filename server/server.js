var express = require('express');
var session = require('express-session');
var passport = require('./services/passport');
var bodyParser = require('body-parser');
var cors = require('cors');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook')
var mongoose = require('mongoose');
var app = express();
var UserCtrl=require('./controller/UserCtrl');
var config=require('.config');

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname));
app.use(session({
	secret:'blah',
	saveUninitialized:true,
	resave:true
}))
app.use(passport.initialize());
app.use(passport.session());

var isAuthed =  function(req, res, next){
	if(!req.isAuthenticated()) return res.sendStatus(401)
	return next();
};

app.post('/user', UserCtrl.register);
app.get('/user', UserCtrl.me);
app.put('/user', isAuthed, UserCtrl.update);
app.post('/login', passport.authenticate('local',{
	successRedirect:'/user'
}))
app.get('/logout', function(req,res){
	req.logout();
	req.session.destroy(function(req,res){
		res.redirect('/');
	});
});

var port = 7200
var mongoURI = 'mongod://localhost:27017/dataBase';

mongoose.connect(mongoURI);
mongoose.set('debug, true');
app.listen(port, function(){
	console.log('we are working on ' + port)
})

