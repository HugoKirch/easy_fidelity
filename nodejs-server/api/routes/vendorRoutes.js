'use strict';

module.exports = function(app) {
    let auth = require('../middleware/authentication.js');
    let vendorController = require('../controllers/vendorController.js');
    app.route('/api/vendor/getUser/:type/:selector').get(auth.vendorRequired, vendorController.getUser);
    app.route('/api/vendor/removePoints').put(auth.vendorRequired, vendorController.removePoints);
    app.route('/api/vendor/addPoints').put(auth.vendorRequired, vendorController.addPoints);
};