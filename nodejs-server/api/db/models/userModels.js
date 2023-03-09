'use strict';

let mongoose = require('mongoose'),
    bcrypt = require('bcryptjs'),
    Schema = mongoose.Schema;

/**
 * User Schema
 */
let UserSchema = new Schema({
    firstname: {
        type: String,
        trim: true,
        required: true
    },
    lastname: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: true
    },
    hash_password: {
        type: String
    },
    phone: {
        type: String,
        length: 10,
        required: false,
        unique: true
    },
    points: {
        type: Number,
        default: 0
    },
    created: {
        type: Date,
        default: Date.now
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'vendor'],
        default: 'user'
    },
    verified: {
        type: Boolean,
        default: false
    }
});

UserSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.hash_password);
};

mongoose.model('User', UserSchema);