var Business = require('../models/BusinessModel');

module.exports = {
  register: function(req, res) {
    console.log("hit");
    //var newUser = new User(req.body);
    Business.create(req.body, function(err, Business) {
      if (err) {
        return res.status(500).json(err);
      } else {
        Business.password = null;
        return res.json(Business);
      }
    });
  },

  me: function(req, res) {
    if (!req.business) {
      return res.send("current user not defined");
    } else {
      req.business.password = null;
      return res.json(req.business);
    }
  },

  update: function(req, res, done) {
    Business.findByIdandUpdate(req.business._id, req.body, function(err, result) {
      if (err) {
        return res.status(500).json(err);
      } else {
        res.status(200).json(result);
      }
    });
  },

  read: function(req, res) {
    Business.find().exec(function(err, result) {
      if (err) {
        return res.status(500).json(err);
      } else {
        res.status(200).json(result);
      }
    });
  },

  readByID: function(req, res) {
    Business.findById(req.params.id, function(err, result) {
      if (err) {
        return res.send(err);
      } else {
        res.json(result);
      }
    });
  },

  create: function(req, res) {
    Business.create(req.body, function(err, result) {
      if (err) {
        res.send(err);
      } else {
        res.json(result);
      }
    });
  },

  edit: function(req, res) {
    Business.findByIdAndUpdate((req.params.id), req.body, {
      new: true
    }, function(err, result) {
      if (err) {
        res.send(err);
      } else {
        res.json(result);
      }
    });
  },
  delete: function(req, res) {
    Business.findByIdAndRemove(req.params.id, function(err, result) {
      if (err) {
        res.send(err);
      } else {
        res.json(result);
      }
    });
  }
};
