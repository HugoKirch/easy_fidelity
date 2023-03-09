'use strict';
let mongoose = require('mongoose'),
    User = mongoose.model('User');

exports.changeRole = function(req, res) {
    console.log(req.body.role);
    User.findOneAndUpdate(
        { _id: req.body._id },
        { 'role': req.body.role.toString() },
        { new: true },
        function(err, user) {
        if (err) {
            return res.status(400).send({ message: err });
        } else {
            return res.status(200).json({ message: 'Role modifié' });
        }
    })
}

exports.deleteUser = function(req, res) {
    User.deleteOne(
        { _id: req.body._id },
        function(err, user) {
        if (err) {
            return res.status(400).send({ message: err });
        } else {
            return res.status(200).json({ message: 'Utilisateur supprimé' });
        }
    })

}