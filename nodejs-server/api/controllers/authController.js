'use strict';
require('dotenv').config()
let mongoose = require('mongoose'),
    jwt = require('jsonwebtoken'),
    bcrypt = require('bcryptjs'),
    validator = require('validator'),
    User = mongoose.model('User'),
    Token = mongoose.model('Token'),
    crypto = require('crypto'),
    sendEmail = require('../utils/emailVerification');


exports.register = function(req, res) {
    let newUser = new User(req.body);
    console.log(req.body)
    newUser.hash_password = bcrypt.hashSync(req.body.password.toString());
    newUser.save(async function(err, user) {
        if (err) {
            if (err.code === 11000) {
                return res.status(409).send({
                    message: 'L\'utilisateur existe déjà.'
                });
            } else {
                return res.status(400).send({
                    message: err
                });
            }
        } else {
            console.log(user);
            user.hash_password = undefined;
            let token = await new Token({
                userId: user._id,
                token: crypto.randomBytes(32).toString("hex"),
            }).save();

            const message = `${process.env.BASE_URL}/user/verify/${user.id}/${token.token}`;
            await sendEmail(user.email, "Verify Email", message);
            return res.json(user);
        }
    });
};

exports.sign_in = function(req, res) {
    if (!validator.isEmail(req.body.email.toString())) {
        return res.status(400).send({message: 'Email invalide.'})
    }
    User.findOne({
        email: req.body.email.toString()
    }, function (err, user) {
        if (err) throw err;
        if (!user || !user.comparePassword(req.body.password.toString())) {
            return res.status(401).send({message: 'Connexion échouée, mot de passe ou email incorrect.'});
        }
        let token = jwt.sign(
            {
                role: user.role,
                _id: user._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: 60 * 60 * 24 * 14
            })
        return res
            .cookie('access_token', token, {httpOnly: true})
            .status(200)
            .json({message: 'success'});
    });
}
exports.logout = function (req, res) {
    return res
        .clearCookie('access_token')
        .status(200)
        .json({message: 'success'});
};

exports.verify = async function (req, res) {
    try {
        const user = await User.findOne({ _id: req.params.id });
        if (!user) return res.status(400).send("Invalid link");

        const token = await Token.findOne({
            userId: user._id,
            token: req.params.token,
        });
        if (!token) return res.status(400).send("Invalid link");

        await User.updateOne({ _id: user._id, verified: true });
        await Token.findByIdAndRemove(token._id);

        res.send("email verified sucessfully");
    } catch (error) {
        res.status(400).send("An error occured");
    }
}
