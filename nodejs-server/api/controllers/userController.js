'use strict';
require('dotenv').config()
let mongoose = require('mongoose'),
    jwt = require('jsonwebtoken'),
    bcrypt = require('bcryptjs'),
    User = mongoose.model('User');

exports.selfDelete = function(req, res) {
    User.remove({
        _id: req.user._id
    }, function(err, user) {
        if (err) {
            return res.status(400).send({
                message: err
            });
        } else {
            return res.status(200).send({ message: 'User deleted' });
        }
    });
}