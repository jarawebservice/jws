const express = require('express'),
    router = express.Router(),
    flash = require('express-flash'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    FacebookStrategy = require('passport-facebook').Strategy,
    session = require('express-session');


function requireAuthentication(req, res, next) {
    if (req.isAuthenticated) {
        next();
    } else {
        req.flash('success_msg', 'You are not allowed to view that page');
        res.redirect('/login');
    }
}

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.getUserById(id, (err, user) => {
        done(err, user);
    });
});


let User = require('../models/user');


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
// router.get('/profile', function(req, res, next) {
//     res.render('/profile', { title: 'Profile', content: 'Here is your profile' });
// });



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
            res.redirect('/check-mail');
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

//facebookStrategy
passport.use(new FacebookStrategy({
        clientID: '127911371324381',
        clientSecret: '92f5501a9414af4fd4d67f587a716501',
        callbackURL: 'http://localhost:3000/auth/facebook/callback'
    },
    function(accessToken, refreshToken, profile, done) {
        User.findOrCreate({ facebookId: profile.id }, profile, function(err, user) {
            if (err) { return done(err); }
            done(null, user);
        });
    }
));


//logout
router.get('/logout', requireAuthentication, (req, res, next) => {
    req.logout();
    req.flash('success_msg', 'You are now logged out');
    res.redirect('/login');
})

//login
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/profile',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next);
});


//profile
router.get('/profile', [requireAuthentication, (req, res, next) => {
    console.log(req);
    res.render('profile', {
        title: 'User Profile | JWS',
        content: 'Manage your domain here',
        profile: res.profile
    });
}]);


function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/login');
    }
}

module.exports = router;