'use strict';
const mainController = require('../controllers/mainpageController.js');
module.exports = function(app) {
    app.get('/', (req, res) => {
        if (req.user) {
            if (req.user.role === 'admin') {
                res.render('admin');
            } else if (req.user.role === 'vendor') {
                res.render('vendor')
            } else if (req.user.role === 'user') {
                mainController.user(req, res);
            }
        } else {
            res.redirect('/login');
        }
    });
    app.get('/login', (req, res) => {
        if (req.user) {
            res.redirect('/');
        } else {
            res.render('login');
        }
    });
    app.get('/register',(req, res) => {
        if (req.user) {
            res.redirect('/');
        } else {
            res.render('register');
        }
    });
    app.get('/register_checkMail', (req, res) => {
        console.log(req.query['mail'])
        res.render('register_checkMail', {
            mail: req.query['mail']
        })
    });

}