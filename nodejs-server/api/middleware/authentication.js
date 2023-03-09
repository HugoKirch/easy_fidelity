'use strict';

exports.loginRequired = function(req, res, next) {
    if (req.user) {
        next();
    } else {

        return res.status(401).json({ message: 'login required' });
    }
};

exports.vendorRequired = function(req, res, next) {
    if (req.user.role === 'vendor' || req.user.role === 'admin') {
        next();
    } else {
        return res.status(403).json({ message: 'Unauthorized user' });
    }
}

exports.adminRequired = function(req, res, next) {
    if (req.user.role === 'admin') {
        next();
    } else {
        return res.status(403).json({ message: 'Unauthorized user' });
    }
};