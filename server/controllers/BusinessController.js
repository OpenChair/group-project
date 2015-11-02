var Business = require('../models/BusinessModel');

module.exports = {
    register: function(req, res){
        console.log("hit");
        
        Business.create(req.body, function(err, business){
            if(err){
                return res.status(500).json(err);
            } else {
                business.password = null;
                return res.json(business);
            }
        });
    },

    me: function(req, res){
        if(!req.business){
            return res.send("current user not defined");
        } else {
            req.business.password = null;
            return res.json(req.business);
        }
    },

    update: function(req, res, done){
        Business.findByIdandUpdate(req.business._id, req.body, function(err, result){
            if(err){
                return res.status(500).json(err);
            } else {
                res.status(200).json(result);
            }
        });
    }
};
