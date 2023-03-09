'use strict';

module.exports = function(app) {
    let auth = require('../middleware/authentication.js');
    let adminController = require('../controllers/adminController.js');
    app.route('/api/admin/changeRole/').put(auth.adminRequired, adminController.changeRole);
    app.route('/api/admin/deleteUser/').delete(auth.adminRequired, adminController.deleteUser);

};