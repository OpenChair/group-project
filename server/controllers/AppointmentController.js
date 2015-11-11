var Appointment = require('../models/AppointmentModel');
var User = require('../models/UserModel');
var Business = require('../models/BusinessModel');
module.exports={
	create:function(req, res){
		var newAppointment = {
			appointment:req.body,
			// user:req.user._id,
			// business:req.business._id
		};
		Appointment.create(newAppointment.appointment, function(err, result){
			if(err){res.status(500).send(err);}
			else{res.json(result);}
		});
	},
	read:function(req,res){
		Appointment.find().exec(function(err,result){
			if(err){res.send(err);}
			else{res.json(result);}
		});
	},
	update:function(req,res){
		console.log('hi', req.body)
		Appointment.findByIdAndUpdate(req.params.id, req.body, {new:true}, function(err,result){
			if(err){res.send(err);}
			else{res.json(result);}
		});
	},
	remove:function(req,res){
		Appointment.findByIdAndRemove(req.params.id, function(err,result){
			if(err){res.send(err);}
			else{res.json(result);}
		});
	},
	find:function(req,res){
		Appointment.findByID(req.params.id).exec(function(err,result){
			if(err){res.send(err);}
			else{res.json(result);}
		});
	},
	userFind:function(req,res){
		Appointment.find({user:req.params.id}).populate('business').exec(function(err,result){
			if(err){res.send(err);}
			else{res.json(result);}
		});
	},
	businessFind:function(req,res){
		Appointment.find({business:req.params.id}).exec(function(err,result){
			if(err){res.send(err);}
			else{res.json(result);}
		});
	}
};
