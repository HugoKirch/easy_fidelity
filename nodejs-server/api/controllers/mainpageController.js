'use strict';
let mongoose = require('mongoose'),
    User = mongoose.model('User');

exports.user = function(req, res) {
    User.findOne({_id: req.user._id}, function(err, user) {
        if (err) {
            return res.status(400).send({
                message: err
            });
        } else {
            console.log('user: ' + user)
            res.render('user', {
                user: user
            });
        }
    });
}