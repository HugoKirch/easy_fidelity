'use strict';
module.exports = function(app) {
    let authHandlers = require('../controllers/authController.js');
    app.route('/api/auth/register')
        .post(authHandlers.register);
    app.route('/api/auth/sign_in')
        .post(authHandlers.sign_in);
    app.route('/api/auth/logout')
        .post(authHandlers.logout);
    app.route('/api/auth/verify/:id/:token')
        .get(authHandlers.verify);
};