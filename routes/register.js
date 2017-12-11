var express = require('express');
var router = express.Router();
var flash = require('connect-flash');
var session = require('express-session')

let User = require('../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('register', { title: 'You can register here for domain management', content: 'Registration has a lot of benefits' });
});



// Process Register
router.post('/', (req, res, next) => {
    const name = req.body.name;
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const password2 = req.body.password2;

    req.checkBody('name', 'Name field is required').notEmpty();
    req.checkBody('email', 'Email field is required').notEmpty();
    req.checkBody('email', 'Email must be a valid email address').isEmail();
    req.checkBody('username', 'Username field is required').notEmpty();
    req.checkBody('password', 'Password field is required').notEmpty();
    req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

    let errors = req.validationErrors();

    if (errors) {
        res.render('register', {
            errors: errors
        });
    } else {
        const newUser = new User({
            name: name,
            username: username,
            email: email,
            password: password
        });

        User.registerUser(newUser, (err, user) => {
            if (err) throw err;
            req.flash('success_msg', 'You are registered and can log in');
            res.redirect('/login');
        });
    }
});

module.exports = router;