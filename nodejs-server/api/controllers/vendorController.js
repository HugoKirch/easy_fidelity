'use strict';
let mongoose = require('mongoose'),
    User = mongoose.model('User');

exports.getUser = function(req, res) {
    if (req.params.type === 'id') {
        User.findById(req.params.selector, function (err, user) {
            if (err) {
                return res.status(400).send({message: err});
            } else {
                console.log(user);
                return res.status(200).json(user);
            }
        });
    } else if (req.params.type === 'email') {
        User.findOne({email: req.params.selector}, function (err, user) {
            if (err) {
                return res.status(400).send({message: err});
            } else {
                console.log(user);
                return res.status(200).json(user);
            }
        });
    }
}

exports.addPoints = function(req, res) {
    console.log(typeof parseInt(req.body.points))
    if (req.body.points > 0) {
        User.findOneAndUpdate(
            { _id: req.body._id },
            { $inc: { 'points': parseInt(req.body.points) } },
            { new: true },
            function(err, user) {
            if (err) {
                return res.status(400).send({ message: err });
            } else {
                return res.status(200).send({ message: 'Points ajoutés'});
            }
        });
    } else {
        return res.status(400).send({ message: 'Points must be greater than 0' });
    }
}

exports.removePoints = function(req, res) {
    if (req.body.points > 0) {
        User.findOneAndUpdate(
            { _id: req.body._id },
            { $inc: { 'points': parseInt("-" + req.body.points) } },
            { new: true },
            function(err, user) {
            if (err) {
                return res.status(400).send({ message: err });
            } else {
                return res.status(200).send({ message: 'Points retirés'})
            }
        });
    } else {
        return res.status(400).send({ message: 'Points must be greater than 0' });
    }
}