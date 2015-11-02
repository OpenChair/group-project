var Appointment = require('../models/AppointmentModel')
var User = require('../models/UserModel');
var Business = require('../models/BusinessModel');
module.exports={
	create:function(req, res){
		var newAppointment = {
			appointments:req.body,
			user:req.user._id,
			business:req.business._id
		}
		Appointment.create(newAppointment, function(err, result){
			if(err){res.status(500).send(err)}
			else{res.json(result)}
		})
	}, 
	read:function(req,res){
		Appointment.find().exec(function(err,result){
			if(err){res.send(err)}
			else{res.json(result)}
		})
	},
	update:function(req,res){
		Appointment.findByIdAndUpdate(req.body.id, req.body.updatedProd, {new:true}, function(err,result){
			if(err){res.send(err);}
			else{res.json(result);}
		})
	},
	delete:function(req,res){
		Appointment.findByIdAndRemove(req.params.id, function(err,result){
			if(err){res.send(err)}
			else{res.json(result)}
		})
	}
}