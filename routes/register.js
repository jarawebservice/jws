const express = require('express'),
    router = express.Router(),
    flash = require('express-flash'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    session = require('express-session');



let User = require('../models/user');


passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.getUserById(id, (err, user) => {
        done(err, user);
    });
});
// file:app/authentication/middleware.js
function authenticationMiddleware() {
    return function(req, res, next) {
        if (req.isAuthenticated()) {
            return next()
        }
        res.redirect('/')
    }
}

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('register', { title: 'You can register here for domain management', content: 'Registration has a lot of benefits' });
});

router.get('/admin', function(req, res, next) {
    res.render('admin', { title: 'Admin Area', content: 'Do admin related activity here' });
});
router.get('/profile', function(req, res, next) {
    res.render('/profile', { title: 'Pr ofile', content: 'Here is your profile' });
});



// Process Register
router.post('/', (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const password2 = req.body.password2;
    const phone = req.body.phone;

    req.checkBody('name', 'Name field is required').notEmpty();
    req.checkBody('email', 'Email field is required').notEmpty();
    req.checkBody('email', 'Email must be a valid email address').isEmail();
    req.checkBody('password', 'Password field is required').notEmpty();
    req.checkBody('phone', 'Phone Number is required').notEmpty();
    req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

    let errors = req.validationErrors();

    if (errors) {
        res.render('register', {
            errors: errors
        });
    } else {
        const newUser = new User({
            name: name,
            email: email,
            password: password,
            phone: phone,
        });

        User.registerUser(newUser, (err, user) => {
            if (err) throw err;
            req.flash('success_msg', 'You are registered and can log in');
            res.redirect('/login');
        });
    }
});

//local strategy
passport.use(new LocalStrategy((username, password, done) => {
    User.getUserByUsername(username, (err, user) => {
        if (err) {
            throw err;
        }
        if (!user) {
            return done(null, false, { message: 'No user found' });
        }
        User.comparePassword(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                return done(null, user);
            } else {
                return done(null, false, { message: 'Wrong Password' });
            }

        });

    });

}));


//logout
router.get('/logout', ensureAuthenticated, (req, res, next) => {
    req.logout();
    req.flash('success_msg', 'You are now logged out');
    res.redirect('/login');
})

//login
router.post('/login', (req, res, next) => {
    if (User.checkIfUserIsAdmin() === true) {
        res.redirect('/admin');
    }
    passport.authenticate('local', {
        successRedirect: '/profile',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next);


});




function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/login');
    }
}

module.exports = router;