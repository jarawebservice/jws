var express = require('express');
var router = express.Router();

let User = require('../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
    if (!req.isAuthenticated()) {
        res.render('login', { title: 'login | jws', content: 'login' });
    } else {
        res.redirect('/profile');
    }

});

// //login
// router.post('/login', (req, res, next) => {
//     if (User.checkIfUserIsAdmin() === true) {
//         res.redirect('/admin');
//     }

//     passport.authenticate('local', {
//         successRedirect: '/profile',
//         failureRedirect: '/login',
//         failureFlash: true
//     })(req, res, next);


// });

module.exports = router;